const path = require('path')
const config = require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { ETHERSCAN_API_KEY, BSCSCAN_API_KEY, POLYGONSCAN_API_KEY, MNEMONIC, DEPLOY_GAS_LIMIT_MAX, DEPLOY_GAS_PRICE, INFURA_ID_PROJECT } =
  config.parsed || {}

const accounts = {
  mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk',
}

const fundAccount = process.env.FUND_KEY
const devAccount = process.env.DEV_KEY
const devAccounts = [fundAccount!, devAccount!]

export default {
  abiExporter: {
    path: './abi',
    clear: false,
    flat: true,
  },
  defaultNetwork: 'hardhat',
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'true',
    excludeContracts: ['contracts/mocks/', 'contracts/libraries/'],
  },
  mocha: {
    timeout: 20000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 1,
    },
    fund: {
      default: 2,
    },
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/0TXdb87nl9jHZVWAmYZKcVJilSNYDlp7`,
      accounts: {
        mnemonic: process.env.SEPOLIA,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: '',
      },
    },
    arbitrum: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      live: true,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: 'BE1VQDDS5RAKP9SQIZU94DBAWN876Y7G87',
    },
    customChains: [
      {
        network: 'arbitrumGoerli',
        chainId: 421613,
        urls: {
          apiURL: 'https://goerli-rollup-explorer.arbitrum.io/api?module=contract&action=verifysourcecode',
          browserURL: 'https://goerli-rollup-explorer.arbitrum.io',
        },
      },
    ],
  },
  verify: {
    etherscan: {
      apiKey: { sepolia: 'BE1VQDDS5RAKP9SQIZU94DBAWN876Y7G87' },
    },
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
}
