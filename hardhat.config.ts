import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable, defineConfig } from "hardhat/config";
import { configDotenv } from 'dotenv';
configDotenv();
const { SEPOLIA_RPC_URL, ALCHEMY_PRIVATE_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
console.log('SEPOLIA_RPC_URL, ALCHEMY_PRIVATE_KEY, SEPOLIA_PRIVATE_KEY: ', SEPOLIA_RPC_URL, ALCHEMY_PRIVATE_KEY, SEPOLIA_PRIVATE_KEY);

export default defineConfig({
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: `${SEPOLIA_RPC_URL ?? ""}${ALCHEMY_PRIVATE_KEY ?? ""}`,
      accounts: SEPOLIA_PRIVATE_KEY ? [SEPOLIA_PRIVATE_KEY] : [],
    },
  },
});
