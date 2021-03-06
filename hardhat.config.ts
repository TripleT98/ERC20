import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

require ("./tasks/tasksRoot.ts");

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    rinkeby:{
       url:process.env.INFURA_URL,
       accounts:[`${process.env.PRIVATE_KEY}`]
     }
  },
  etherscan:{
    apiKey:{
      rinkeby: process.env.ETHERSCAN_API_KEY,
    }
  }
};

export default config;
