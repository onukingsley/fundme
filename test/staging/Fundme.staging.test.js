const {getNamedAccounts, ethers, network} = require('hardhat');
const { developmentNetwork } = require('../../helper-hardhat-config');
const { assert } = require('chai');

developmentNetwork.includes(network.name)? describe.skip:
describe("Fundme",async ()=>{
   let deployer;
   let fundme;
   let vals = ethers.utils.parseEther("0.1")
    beforeEach(async ()=>{
        deployer =  (await getNamedAccounts()).deployer
        fundme = await ethers.getContract("FundMe",deployer)

    })
   it("allow funding and withdrawing",async ()=>{
      await fundme.fund({value: vals})
        await fundme.withdraw()
        const endingbalance = await ethers.provider.getBalance(fundme.address)
        assert.equal(endingbalance.toString(),"0")
 
   })
      
    }

)