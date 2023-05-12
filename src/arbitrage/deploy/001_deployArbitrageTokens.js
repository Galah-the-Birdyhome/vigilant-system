module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments
  const { deployer, dev } = await getNamedAccounts()
  const networkName = hre.network.name
  const fs = require('fs')
  const path = require('path')
  const resolvePath = ['../../../deploys/', networkName, '.deploy.json'].join('')
  const deployDataPath = path.resolve(__dirname, resolvePath)
  let deploysData = JSON.parse(fs.readFileSync(deployDataPath, 'utf8'))

  const weth = await deploy('WETH', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: weth.address,
    constructorArguments: [],
  })
  deploysData.weth = weth.address

  const wbtc = await deploy('WrapBitcoin', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: wbtc.address,
    constructorArguments: [],
  })
  deploysData.wbtc = wbtc.address

  const usdt = await deploy('TetherStable', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: usdt.address,
    constructorArguments: [],
  })
  deploysData.usdt = usdt.address

  const usdo = await deploy('OrbitrumStable', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: usdo.address,
    constructorArguments: [],
  })
  deploysData.usdo = usdo.address

  const usdc = await deploy('CircleStable', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: usdc.address,
    constructorArguments: [],
  })
  deploysData.usdc = usdc.address

  const dai = await deploy('DaiStable', {
    from: deployer,
    log: true,
  })
  await hre.run('verify:verify', {
    address: dai.address,
    constructorArguments: [],
  })
  deploysData.dai = dai.address

  const factory = await deploy('ArbistarFactory', {
    from: deployer,
    args: [dev],
    log: true,
    deterministicDeployment: false,
  })
  await hre.run('verify:verify', {
    address: factory.address,
    constructorArguments: [dev],
  })
  deploysData.factory = factory.address

  const router = await deploy('ArbistarRouter', {
    from: deployer,
    args: [factory.address, weth.address],
    log: true,
    deterministicDeployment: false,
  })
  await hre.run('verify:verify', {
    address: router.address,
    constructorArguments: [factory.address, weth.address],
  })
  deploysData.router = router.address

  fs.writeFileSync(deployDataPath, JSON.stringify(deploysData), 'utf-8')
}

module.exports.tags = ['WrappedTokens', 'AMM', 'ArbistarFactory', 'ArbistarRouter', 'FeeSplitter']
module.exports.dependencies = []
