import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Token contract", () => {
    it("Deployment should assign total supply to the owner", async () => {
        const [owner] = await ethers.getSigners();
        console.log('Signers object: ', owner);

        const Token = await ethers.getContractFactory("Token");// Contract Instance
        console.log("Token from contract factory: ", Token)

        const hardhatToken = await Token.deploy();// Deployment of contract
        const ownerBalance = await hardhatToken.checkMyBalance();

        console.log("Owner Address: ", owner.address);
        console.log("Owner Balance: ", ownerBalance);

        // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Deployment should assign total supply to the owner", async () => {
        const [owner, address1, address2] = await ethers.getSigners();
        console.log('Signers array: ', [owner, address1, address2]);
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        // Transfer 100 tokens from owner to address1
        await hardhatToken.transfer(address1.address, 100);
        console.log('Balance of address1: ', await hardhatToken.balanceOf(address1.address));
        expect(await hardhatToken.balanceOf(address1.address)).to.equal(100);

        // Transfer 10 tokens from address1 to address2
        const TokenWithAddress1 = await hardhatToken.connect(address1); // Switching to address1 as msg.sender

        await TokenWithAddress1.transfer(address2.address, 10);
        console.log('Balance of address2: ', await TokenWithAddress1.balanceOf(address2.address));
        console.log('Balance of address1: ', await TokenWithAddress1.balanceOf(address1.address));
        console.log('Balance of owner: ', await TokenWithAddress1.balanceOf(owner.address));
        expect(await TokenWithAddress1.balanceOf(address2.address)).to.equal(10);
    })
})