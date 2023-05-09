module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer, dev, communityWallet, treasureWallet } =
    await getNamedAccounts();

  const weth = await deploy("WETH", {
    from: deployer,
    log: true,
  });

  await deploy("WrapBitcoin", {
    from: deployer,
    log: true,
  });

  await deploy("TetherStable", {
    from: deployer,
    log: true,
  });

  await deploy("OrbitrumStable", {
    from: deployer,
    log: true,
  });

  await deploy("CircleStable", {
    from: deployer,
    log: true,
  });

  const factory = await deploy("ArbistarFactory", {
    from: deployer,
    args: [dev],
    log: true,
    deterministicDeployment: false,
  });

  const wethAddress = weth.address;
  const factoryAddress = factory.address;

  await hre.run("verify:verify", {
    address: factoryAddress,
    constructorArguments: [dev],
  });

  const router = await deploy("ArbistarRouter", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
  await hre.run("verify:verify", {
    address: router.address,
    constructorArguments: [factoryAddress, wethAddress],
  });
};

module.exports.tags = [
  "WrappedTokens",
  "AMM",
  "ArbistarFactory",
  "ArbistarRouter",
  "FeeSplitter",
];
module.exports.dependencies = [];
