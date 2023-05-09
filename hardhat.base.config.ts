const path = require("path");
const config = require('dotenv').config({path: path.resolve(__dirname, '.env')});
const {
    ETHERSCAN_API_KEY,
    BSCSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    MNEMONIC,
    DEPLOY_GAS_LIMIT_MAX,
    DEPLOY_GAS_PRICE,
    INFURA_ID_PROJECT
} = config.parsed || {};

export default {
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
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    arbitrumRinkeby: {
      url: process.env.ARBITRUM_TESTNET_URL || "",
      chainId: 421611,
      timeout: 120000,
      live: true,
      saveDeployments: true,
      accounts: devAccounts,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/0TXdb87nl9jHZVWAmYZKcVJilSNYDlp7`,
      accounts: {
        mnemonic: process.env.SEPOLIA,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
    arbitrum: {
      url: "https://rinkeby.arbitrum.io/rpc",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
      live: true,
      saveDeployments: true,
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 421613,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "BE1VQDDS5RAKP9SQIZU94DBAWN876Y7G87",
    },
    customChains: [
      {
        network: "arbitrumGoerli",
        chainId: 421613,
        urls: {
          apiURL:
            "https://goerli-rollup-explorer.arbitrum.io/api?module=contract&action=verifysourcecode",
          browserURL: "https://goerli-rollup-explorer.arbitrum.io",
        },
      },
    ],
  },
  verify: {
    etherscan: {
      apiKey: "BE1VQDDS5RAKP9SQIZU94DBAWN876Y7G87",
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
}