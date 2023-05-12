module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments
  const { deployer, dev } = await getNamedAccounts()

  const poolDeployer = await deploy('AlgebraPoolDeployer', {
    from: deployer,
    args: [],
    log: true,
  })
  await hre.run('verify:verify', {
    address: poolDeployer.address,
    constructorArguments: [],
  })

  const algebraFactory = await deploy('AlgebraFactory', {
    from: deployer,
    args: [poolDeployer.address, dev],
    log: true,
  })
  await hre.run('verify:verify', {
    address: algebraFactory.address,
    constructorArguments: [poolDeployer.address, dev],
  })
  await poolDeployer.setFactory(algebraFactory.address)
}

module.exports.tags = ['DataStorage', 'PoolDeployer', 'AlgebraFactory']
module.exports.dependencies = []
