import { ConnectWallet } from './components/ConnectWallet';
import { Dashboard } from './components/Dashboard';
import { Swap } from './components/Swap';
import { Liquidity } from './components/Liquidity';
import { StakingComponent } from './components/Staking';
import { Coins } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">DeFi Protocol</h1>
                <p className="text-slate-400">Decentralized Finance Platform</p>
              </div>
            </div>
            <ConnectWallet />
          </div>
        </header>

        <main className="space-y-8">
          <Dashboard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Swap />
            <Liquidity />
          </div>

          <StakingComponent />
        </main>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Built with Solidity, Hardhat, React & Wagmi</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
