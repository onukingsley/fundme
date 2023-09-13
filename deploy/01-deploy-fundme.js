const { network } = require("hardhat")
const { networkconfig, developmentNetwork } = require("../helper-hardhat-config")
const { verify } = require("../util/verify")



module.exports = async function({deployments,getNamedAccounts}){
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()
    const networkId = network.config.chainId


    let ethUsdPriceFeed
    if(developmentNetwork.includes(network.name)){
        const contract  = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeed  = contract.address
    }
    else{
        ethUsdPriceFeed = networkconfig[networkId]["ethUsdPriceFeed"]
    }

    const contract = await deploy("FundMe",{
        from: deployer,
        args:[ethUsdPriceFeed],
        log: true,
        

    })
    if(!developmentNetwork.includes(network.name)){
        verify(contract.address,[ethUsdPriceFeed])
    }



}
module.exports.tags = ["all", "fundme"]