
const networkconfig = {
    11155111:{
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    5:{
        name:"goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    }
}
const developmentNetwork = ["localhost","hardhat"]

const DECIMAL = 8
const PRICE = 201900000000

module.exports = {networkconfig,developmentNetwork,DECIMAL,PRICE}