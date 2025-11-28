import * as dotenv from "dotenv";
import { network } from "hardhat";
const { ethers } = await network.connect();
dotenv.config();

const { SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY, ALCHEMY_PRIVATE_KEY } = process.env;

async function main() {
    const provider = new ethers.JsonRpcProvider(`${SEPOLIA_RPC_URL ?? ""}${ALCHEMY_PRIVATE_KEY ?? ""}`);

    // If you need to send transactions, create a signer
    const signer = new ethers.Wallet(SEPOLIA_PRIVATE_KEY ?? "", provider);

    // Contract ABI (from your compiled artifact)
    const abi = [
        "function owner() view returns (address)",
        "function balanceOf(address) view returns (uint256)",
        "function transfer(address to, uint256 amount) returns (bool)",
    ];

    const contractAddress = "0x46df2E860272257229BcE10B8382C0c00DC04cF6";

    // Connect to contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Example: read owner
    const owner = await contract.owner();
    console.log("Owner address:", owner);

    // Example: read balance of signer
    const balance = await contract.balanceOf(signer.address);
    console.log("My balance:", balance.toString());

    // Example: transfer tokens to another account
    const amount = 100
    const tx = await contract.transfer("0x4b882D8177796AD9798830085197C5C69b35a6b5", amount);
    console.log("Transfer tx hash:", tx.hash);

    await tx.wait(); // wait for confirmation
    console.log("Transfer confirmed!");
}

main().catch(console.error);
