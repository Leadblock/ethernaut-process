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
  let Level_Address = '0x90662EcbFC8522B74C12bD343C5Bb9B4aee9C851'
  const payer = accounts[0]

  // let Token = await hre.ethers.getContractFactory('Token')
  // token = await Token.deploy(20)
  // await token.deployed()
  // Level_Address = token.address

  const abi = [
    // Read-Only Functions
    "function balanceOf(address _owner) public view returns (uint balance)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address _to, uint _value) public returns (bool)",
  ];

  const tokenit = new hre.ethers.Contract(Level_Address, abi, payer);
  let balance = (await tokenit.balanceOf(payer.address)).toNumber()
  console.log('begin balances', balance)

  let tx = await tokenit.transfer(Level_Address, balance + 40)
  let txinfo = await tx.wait()
  console.log('transfer txhash', txinfo.blockNumber, txinfo.transactionHash)

  balance = await tokenit.balanceOf(payer.address)
  console.log('final balances', balance) // NUMERIC_FAULT-overflow
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 5.Token/Token.sol