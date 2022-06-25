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
  let Level_Address = '0x062bBFeA5970FD950aBDAC14e37c64426b78b540'
  const payer = accounts[0]

  // let Shop = await hre.ethers.getContractFactory('Shop')
  // let shop = await Shop.deploy()
  // await shop.deployed()
  // Level_Address = shop.address

  let Attack = await hre.ethers.getContractFactory('Attack')
  let attack = await Attack.deploy()
  await attack.deployed()

  const abi = [
    // Read-Only Functions
    "function price() view returns (uint)",
    "function buy() public",
  ];

  const shopit = new hre.ethers.Contract(Level_Address, abi, payer);

  console.log('begin price', await shopit.price())

  let tx = await attack.buyit(Level_Address, {gasLimit: 500000})  // 这里再次， hardhat 预测 gas 出错， out of gas
  let txinfo = await tx.wait()
  console.log('buyit txhash', txinfo.blockNumber, txinfo.transactionHash)

  console.log('final owner',  await shopit.price())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 21.Shop/run.js