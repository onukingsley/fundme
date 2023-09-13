const {getNamedAccounts, ethers} = require("hardhat")

async function main(){
    const {deployer} = await getNamedAccounts();
    fundme = await ethers.getContract("FundMe",deployer)
    const transactionrecipt = await fundme.withdraw();
    await transactionrecipt.wait(1)

}

main().then(
    process.exit(0)
).catch((e)=>{
    console.log(e)
    process.exit(1)
})
