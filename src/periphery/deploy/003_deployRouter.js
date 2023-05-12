const fs = require('fs')
const path = require('path')
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments
  const { deployer, dev } = await getNamedAccounts()
  const networkName = hre.network.name
  const resolvePath = ['../../../../deploys/', networkName, '/deploys.json'].join('')
  const deployDataPath = path.resolve(__dirname, resolvePath)
  let deploysData = JSON.parse(fs.readFileSync(deployDataPath, 'utf8'))
}

module.exports.tags = ['NFTPositionManager', 'SwapRouter', 'V3Migrator']
module.exports.dependencies = []
