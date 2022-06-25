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
  let Level_Address = '0xA87D10E7f71958506C9e3947cE9D102CfAD3E566'

  // let CoinFlip = await hre.ethers.getContractFactory('CoinFlip')
  // coinflip = await CoinFlip.deploy()
  // await coinflip.deployed()
  // Level_Address = await coinflip.address

  let tx;
  const payer = accounts[0]
  console.log('accounts', await payer.getAddress(), 'level', Level_Address)


// A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use
  const abi = [
    // Read-Only Functions
    "function flip(bool) public returns (bool)",
    "function consecutiveWins() public view returns (uint256)",
    "function flipguess(uint) public view returns (uint256, bool)",
  ];

  const flip = new hre.ethers.Contract(Level_Address, abi, payer);

  let wins = await flip.consecutiveWins()
  console.log('begin', 'wins', wins.toNumber())

  while(true) {
    // 计算hash块， 等待新块，提交交易块 
    let lastblockid = await hre.ethers.provider.getBlockNumber()
    while(true) {
      // 等一个新块，等完整周期进行操作
      let newlastblockid = await hre.ethers.provider.getBlockNumber()
      if(newlastblockid != lastblockid) {
        lastblockid = newlastblockid
        break
      }
    }

    let lastblock = await hre.ethers.provider.getBlock(lastblockid)

    const FACTOR = new BigNumber('57896044618658097711785492504343953926634992332820282019728792003956564819968', 10);
    const blockhash = new BigNumber(lastblock.hash);

    const guess = blockhash.dividedBy(FACTOR)

    let myguess = guess >= 1
    console.log('lastblock', lastblockid, lastblock.hash, guess.toNumber(), myguess)
  
    tx = await flip.flip(myguess, {gasLimit: 500000})
    let txinfo = await tx.wait()  
    console.log('flip txhash', txinfo.blockNumber, txinfo.transactionHash)

    // let trueres = await flip.flipguess(txinfo.blockNumber)
    // assert(myguess == trueres[1])
    // console.log('guess', guess.toNumber(), guess.toFixed(0), 'real', trueres[0].toNumber(), myguess, 'vs', trueres[1])


    wins = await flip.consecutiveWins()
    console.log('now', 'wins', wins.toNumber())
    if(wins.toNumber() >= 10) break

  }

  wins = await flip.consecutiveWins()
  console.log('finial', 'wins', wins.toNumber())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 3.CoinFlip/run.js