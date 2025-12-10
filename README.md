# QuadFi

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://quad-fi.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An all-around DeFi (Decentralized Finance) application with full functionality for EVM-compatible blockchains.

🔗 **Live Demo**: [quad-fi.vercel.app](https://quad-fi.vercel.app)

## 📋 Overview

QuadFi is a comprehensive decentralized finance platform built for the Ethereum Virtual Machine (EVM) ecosystem. This project provides a full-featured DeFi application that enables users to interact with blockchain-based financial services directly through a modern, user-friendly interface.

## ✨ Features

- 🔐 **Smart Contract Integration** - Built with Solidity smart contracts for secure on-chain operations
- 💼 **Wallet Connectivity** - Seamless integration with Web3 wallets
- ⚡ **Fast Transactions** - Optimized for efficient blockchain interactions
- 🎨 **Modern UI** - Built with React and TypeScript for a responsive user experience
- 🌐 **EVM Compatible** - Works with any EVM-compatible blockchain network
- 🔧 **Developer Tools** - Includes Hardhat development environment and deployment scripts

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

### Blockchain
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **ethers.js** - Ethereum library for blockchain interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NexsisNelson/QuadFi.git
   cd QuadFi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_INFURA_KEY=your_infura_key
   VITE_PRIVATE_KEY=your_private_key
   # Add other necessary environment variables
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

2. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

3. **Run tests**
   ```bash
   npx hardhat test
   ```

4. **Deploy contracts**
   ```bash
   npx hardhat run scripts/deploy.ts --network <network-name>
   ```

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## 📁 Project Structure

```
QuadFi/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment and utility scripts
├── src/               # Frontend source code
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── ...
├── hardhat.config.ts  # Hardhat configuration
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # TailwindCSS configuration
└── package.json       # Project dependencies
```

## 🔒 Smart Contracts

The smart contracts are located in the `contracts/` directory. To interact with them:

1. Compile contracts: `npx hardhat compile`
2. Deploy to a network: `npx hardhat run scripts/deploy.ts --network <network>`
3. Verify on Etherscan: `npx hardhat verify --network <network> <contract-address>`

## 🧪 Testing

Run the test suite:

```bash
npx hardhat test
```

For test coverage:

```bash
npx hardhat coverage
```

## 🌐 Deployment

The application is automatically deployed to Vercel on commits to the main branch. For manual deployment:

1. **Deploy Frontend**
   ```bash
   vercel deploy
   ```

2. **Deploy Smart Contracts**
   ```bash
   npx hardhat run scripts/deploy.ts --network mainnet
   ```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contributors

- [@NexsisNelson](https://github.com/NexsisNelson) - Nexsis Nelson
- [@Daniudog](https://github.com/Daniudog) - Dot
- [@Iwetan77](https://github.com/Iwetan77) - Wetan

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Application**: [quad-fi.vercel.app](https://quad-fi.vercel.app)
- **GitHub Repository**: [github.com/NexsisNelson/QuadFi](https://github.com/NexsisNelson/QuadFi)

## ⚠️ Disclaimer

This software is provided "as is", without warranty of any kind. Always conduct thorough testing and auditing before deploying smart contracts to mainnet. Use at your own risk.

## 📧 Support

If you have any questions or need help, please open an issue on GitHub or reach out to the maintainers.

---

**Built with ❤️ by the QuadFi team**
