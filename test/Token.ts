import { expect } from "chai";
import { network } from "hardhat";
import { Token, Token__factory } from "../types/ethers-contracts/index.js";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";

const { ethers } = await network.connect();
const INITIAL_SUPPLY = 100000;
describe("Token Contract", () => {
    let owner: HardhatEthersSigner, addr1: HardhatEthersSigner, addr2: HardhatEthersSigner, addresses: HardhatEthersSigner[], deployedContract: Token, Token: Token__factory;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
        deployedContract = await ethers.deployContract("Token");
    });

    describe("Deployment", () => {
        it("Should set the current user as owner", async () => {
            expect(await deployedContract.owner()).to.equal(owner.address);
        });

        it("The total supply should be assigned to the owner", async () => {
            expect(await deployedContract.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
        });
    });

    describe("Transferring of amounts to different accounts", () => {
        it("Should transfer 15000 tokens from owner to addr1 account", async () => {
            await deployedContract.transfer(addr1.address, 15000);
            expect(await deployedContract.checkMyBalance()).to.equal(INITIAL_SUPPLY - 15000, "owner's account balance should be equal to total supply - 15000");
            expect(await deployedContract.connect(addr1).checkMyBalance()).to.equal(15000, "addr1 should have 15000 in his account");
            const addr1Instance = deployedContract.connect(addr1);
            await addr1Instance.transfer(addr2.address, 5000);
            expect(await addr1Instance.checkMyBalance()).to.equal(10000, "After transferring 5000 tokens to addr2, addr1 should have 10000 remaining balance");
            expect(await deployedContract.balanceOf(addr2.address)).to.equal(5000, "After receiving 5000 tokens from addr1, addr2 should have 5000 in his account");
        });
    });
    describe("Transfer failure from account with 0 balance", () => {
        it("Should not transfer amount from addr1", async () => {
            const balanceOfAddr1 = await deployedContract.balanceOf(addr1.address);
            console.log('balanceOfAddr1', balanceOfAddr1)
            expect(balanceOfAddr1).to.equal(0, "The initial balance of addr1 should be zero");
            const addr1ContractInstance = deployedContract.connect(addr1);
            await expect(addr1ContractInstance.transfer(addr2.address, 1), "Failed to verify null transfer revert").to.be.revertedWith("Not enough tokens");
        })
    })
})