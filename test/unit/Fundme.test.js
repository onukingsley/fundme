const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { developmentNetwork } = require("../../helper-hardhat-config")

!developmentNetwork.includes(network.name)? describe.skip:
describe("Fundme",function(){
    let fundme
    let deployer
    let mockV3Aggregator
    let vals = ethers.utils.parseEther("1")

    beforeEach(async function(){
        deployer = (await getNamedAccounts()).deployer
        console.log("Deploying Contract -------------------------------------------------------")
        await deployments.fixture(["all"])
        
        //get the fundme contract using ethers

        fundme = await ethers.getContract("FundMe",deployer)

        //get the mockv3aggregator contract using ethers
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator",deployer)


    })
    describe("consturctor", async function(){
        it("should be same address used for mockv3agreggator as to the one used for fundme constructor",async function(){
          const response =await fundme.priceFeed()
          assert.equal(response, mockV3Aggregator.address)  
        })
    })
    describe("fund", function(){
        it("Should fail if the fund is below 50 USD", async function(){
           await expect(fundme.fund()).to.be.revertedWith("You need to send more ETH")

        })
        it("should update the amounttoaddress list ", async ()=>{
            await fundme.fund({value: vals });
            const response =await fundme.funder(deployer);
            assert.equal(response.toString(), vals.toString());
        })
        it("Should add funders to funder", async()=>{
            await fundme.fund({value:vals});
            const response = await fundme.funds(0);
            assert.equal(deployer,response.user)
          
        })
    })
    describe("withdraw", function () {
        beforeEach(async ()=>{
           await fundme.fund({value:vals});
        })
        it("can withdraw funds", async function(){
            initialdeployerbalance = await ethers.provider.getBalance(deployer)
            initialfundmebalance = await ethers.provider.getBalance(fundme.address)

            const transactionrecipt = await fundme.withdraw()
            const {gasUsed,effectiveGasPrice} = await transactionrecipt.wait(1)
            const gascost = gasUsed.mul(effectiveGasPrice)

            finaldeployerbalance = await ethers.provider.getBalance(deployer)
            finalfundmebalance = await ethers.provider.getBalance(fundme.address)

            assert.equal(finalfundmebalance.toString(), "0")
            assert.equal(initialdeployerbalance.add(initialfundmebalance).toString(), finaldeployerbalance.add(gascost).toString())
            
        })
        it("can withdraw from multiple account",async ()=>{
            const signer = await ethers.getSigners()
            for (i=1; i<6; i++){
                const fundmeconnectedcontracts = await fundme.connect(signer[i])
                await fundmeconnectedcontracts.fund({value:vals});
                
            }
            // signer.forEach(async signer => {
            //     const fundmeconnectedcontracts = await fundme.connect(signer)
            //     await fundmeconnectedcontracts.fund({value:vals});
                
            // });
            initialdeployerbalance = await ethers.provider.getBalance(deployer)
            initialfundmebalance = await ethers.provider.getBalance(fundme.address)

            const transactionrecipt = await fundme.withdraw()
            const {gasUsed,effectiveGasPrice} = await transactionrecipt.wait(1)
            const gascost = gasUsed.mul(effectiveGasPrice)

            finaldeployerbalance = await ethers.provider.getBalance(deployer)
            finalfundmebalance = await ethers.provider.getBalance(fundme.address)

            assert.equal(finalfundmebalance.toString(), "0")
            assert.equal(initialdeployerbalance.add(initialfundmebalance).toString(), finaldeployerbalance.add(gascost).toString())
            
            await expect(fundme.funds(0)).to.be.reverted
            
        })
        it("only user can withdraw",async ()=>{
           const signer = await ethers.getSigners();
           const attacker  = signer[1];
           const attackerconnected = await fundme.connect(attacker);
            await expect(attackerconnected.withdraw()).to.be.reverted
        })
    })
})