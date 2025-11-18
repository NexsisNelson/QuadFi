import { ethers } from "hardhat";

async function main() {
  console.log("Deploying DeFi contracts...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DeFiToken = await ethers.getContractFactory("DeFiToken");
  const token = await DeFiToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DeFiToken deployed to:", tokenAddress);

  const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
  const pool = await LiquidityPool.deploy(tokenAddress);
  await pool.waitForDeployment();
  const poolAddress = await pool.getAddress();
  console.log("LiquidityPool deployed to:", poolAddress);

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(tokenAddress, tokenAddress);
  await staking.waitForDeployment();
  const stakingAddress = await staking.getAddress();
  console.log("Staking deployed to:", stakingAddress);

  console.log("\nDeployment complete!");
  console.log("Save these addresses:");
  console.log("TOKEN_ADDRESS=", tokenAddress);
  console.log("POOL_ADDRESS=", poolAddress);
  console.log("STAKING_ADDRESS=", stakingAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
