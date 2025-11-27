// SPX-License-Identifier: MIT
pragma solidity ^0.8.28;
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
