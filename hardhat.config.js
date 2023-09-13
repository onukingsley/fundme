require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()


const SEPOLIA_RPCHTTP = process.env.SEPOLIA_RPCHTTP
const PRIVATE_KEY = process.env.PRIVATE_KEY
const GOERLI_RPCHTTP = process.env.GOERLI_RPCHTTP
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[{
      version: "0.8.8"
    },
    {
      version: "0.8.0"
    },
    {
      version: "0.7.0"
    },
    {
      version: "0.6.0"
    },]
  },
  networks:{
    sepolia: {
      url: SEPOLIA_RPCHTTP,
      chainId: 11155111,
      accounts:[PRIVATE_KEY]
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  etherscan:{
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts:{
    deployer:{
      default:0
    }
  }
  

};
