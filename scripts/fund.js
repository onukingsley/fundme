const {getNamedAccounts, ethers} = require("hardhat")
const vals = ethers.utils.parseEther('0.1')
async function main (){
    const {deployer} = await getNamedAccounts();
    fundme =await ethers.getContract("FundMe",deployer)
    const response = await fundme.fund({value  : vals})
    await response.wait(1)
    console.log("You have sucessfully funded the project")
}

main().then(
    process.exit(0)
).catch((e)=>{
    console.log(e)
    process.exit(1)
})