const { network, run } = require("hardhat")
const { developmentNetwork } = require("../helper-hardhat-config")
require("dotenv").config()

const verify = async (address,constructorArguments)=>{
    if(!developmentNetwork.includes(network.name)&& process.env.ETHERSCAN_API_KEY ){
        
        try {
            await run("verify:verify",{
            address : address,
            constructorArguments: constructorArguments
        }) 
        } catch (error) {
               console.error(error) 
        }
       
    }
}

module.exports = {verify}