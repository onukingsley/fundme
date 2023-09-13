const { network } = require("hardhat")
const { developmentNetwork, DECIMAL, PRICE } = require("../helper-hardhat-config")



module.exports = async function({deployments, getNamedAccounts}){
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainname = network.name

    if (developmentNetwork.includes(chainname)){
        log("Local network detected...")
        log("Deploying MockV3Aggregator")
        const contract = await deploy("MockV3Aggregator",{
            contract: "MockV3Aggregator",
            from: deployer,
            log : true,
            args: [DECIMAL,PRICE]
        })
        log("MockV3Aggregator deployed Successfully!!")
        log("----------------------------------------------------------------------------------")
    }
}

module.exports.tags = ["all","mockV3Aggregator"]