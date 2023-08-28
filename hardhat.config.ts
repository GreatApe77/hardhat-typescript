import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan:{
    apiKey:process.env.ETHERSCAN_API_KEY
  },
  networks:{
    ganacheCLI:{
      url:"http://127.0.0.1:8545"
    }
  }
};

export default config;
