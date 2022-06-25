// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const accounts = await hre.ethers.getSigners()
  let Level_Address = '0x29045cF928B3870E9C79E74606358572191eCBd1'

  let tx;
  const payer = accounts[0]
  console.log('accounts', await payer.getAddress(), 'level', Level_Address)

// A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use
  const abi = [
    // Read-Only Functions
    "function owner() view returns (address)",
    "function contribute() public payable",
    "function getContribution() public view returns (uint256)",
    "function withdraw() public",
  ];

  const fall = new hre.ethers.Contract(Level_Address, abi, payer);

  async function show_status(step, fall) {
    const owner = await fall.owner()
    const value = await fall.getContribution()
    
    const balance = await fall.provider.getBalance(fall.address);
    console.log(step, 'owner', owner, 'value', value.toString(), 'balance', balance.toString())
  }

  await show_status('begin', fall)

  tx = await fall.contribute({ value: 2 , gasLimit: 500000})
  await tx.wait()

  await show_status('after contribute', fall)

  tx = await accounts[0].sendTransaction({
    to: fall.address,
    value: 1// hre.ethers.utils.parseEther("1") // 1 ether
  })
  await tx.wait()
  await show_status('after sendeth', fall)

  tx = await fall.withdraw({gasLimit: 500000})
  await tx.wait()
  await show_status('after withdraw', fall)

  await show_status('finial', fall)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  // npx hardhat run 1.Fallback/scripts/run.js