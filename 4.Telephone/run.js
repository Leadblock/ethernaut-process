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
  let Level_Address = '0xfc218a2A0ccCbE258f25fDD441CEBaD5410BE669'
  const payer = accounts[0]

  // let Telephone = await hre.ethers.getContractFactory('Telephone')
  // telephone = await Telephone.deploy()
  // await telephone.deployed()
  // Level_Address = telephone.address

  // let Attack = await hre.ethers.getContractFactory('Attack')
  // attack = await Attack.deploy()
  // await attack.deployed()

  // let tx = await attack.attack(Level_Address)
  // let txinfo = await tx.wait()  
  // console.log('txinfo txhash', txinfo.blockNumber, txinfo.transactionHash)

  const abi = [
    // Read-Only Functions
    "function owner() view returns (address)",
  ];

  const telephoneview = new hre.ethers.Contract(Level_Address, abi, payer);

  console.log('final owner', await telephoneview.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 4.Telephone/run.js