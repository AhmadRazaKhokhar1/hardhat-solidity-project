// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 100000;

    address public owner;

    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    function transfer(address to, uint amount) external {
        console.log(
            "Transferring %s amount to address: %s from sender address: %s",
            amount,
            to,
            balances[msg.sender]
        );
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function checkMyBalance() external view returns (uint) {
        return balances[msg.sender];
    }
    function balanceOf(address addr) external view returns (uint) {
        return balances[addr];
    }
}
