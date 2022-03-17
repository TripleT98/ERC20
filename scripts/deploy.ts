// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main():Promise<void> {
  // We get the contract to deploy
  const MyERC20  = await ethers.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.deploy();

  await myERC20.deployed();

  console.log("Contract address:", myERC20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then((data) => {
  process.exitCode = 0;
}, (error)=>{
  process.exitCode = 1;
});
