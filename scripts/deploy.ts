import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
    const Contract = await ethers.getContractFactory("Token");
    const deployedContract = await Contract.deploy();
    console.info(`Contract address: ${(await deployedContract.getAddress()).toString()}`);
};

main()
    .then(() => process.exit(0))
    .catch((error) => console.error(`The deployment process has failed due to: ${error}`))
