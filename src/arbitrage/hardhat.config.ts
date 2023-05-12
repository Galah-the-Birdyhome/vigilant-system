import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-contract-sizer'
import 'algebra-solidity-docgen'
import 'hardhat-abi-exporter'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'hardhat-spdx-license-identifier'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-solhint'
import 'hardhat-watcher'
import 'solidity-coverage'

import { SolcUserConfig } from 'hardhat/types'
import baseConfig from '../../hardhat.base.config'

const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.8.16',
  settings: {
    optimizer: {
      enabled: true,
      runs: 8080,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

if (process.env.RUN_COVERAGE == '1') {
  /**
   * Updates the default compiler settings when running coverage.
   *
   * See https://github.com/sc-forks/solidity-coverage/issues/417#issuecomment-730526466
   */
  console.info('Using coverage compiler settings')
  DEFAULT_COMPILER_SETTINGS.settings.details = {
    yul: true,
    yulDetails: {
      stackAllocation: true,
    },
  }
}

export default {
  networks: baseConfig.networks,
  etherscan: baseConfig.etherscan,
  typechain: {
    outDir: 'typechain',
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    sources: 'contracts',
    tests: 'test',
  },
  docgen: {
    output: '../../docs/Contracts/Core',
    pages: (x: any) => x.name.toString() + '.md',
    templates: '../../docs/doc_templates/public',
  },
}
