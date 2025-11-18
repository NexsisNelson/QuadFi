import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useSwap, useTokenApproval } from '../hooks/useContracts';
import { CONTRACT_ADDRESSES } from '../config/contracts';

export function Swap() {
  const [fromAmount, setFromAmount] = useState('');
  const [isEthToToken, setIsEthToToken] = useState(true);
  const { swapEthForTokens, swapTokensForEth, isLoading } = useSwap();
  const { approve, isLoading: isApproving } = useTokenApproval(
    CONTRACT_ADDRESSES.POOL,
    fromAmount
  );

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    if (isEthToToken) {
      swapEthForTokens(fromAmount);
    } else {
      await approve();
      swapTokensForEth(fromAmount);
    }
  };

  const toggleDirection = () => {
    setIsEthToToken(!isEthToToken);
    setFromAmount('');
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Swap Tokens</h2>

      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">From</label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-white text-2xl outline-none w-full"
            />
            <span className="text-white font-semibold bg-slate-700 px-4 py-2 rounded-lg">
              {isEthToToken ? 'ETH' : 'DFT'}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleDirection}
            className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors"
          >
            <ArrowDownUp className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">To</label>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value="~"
              disabled
              className="bg-transparent text-slate-500 text-2xl outline-none w-full"
            />
            <span className="text-white font-semibold bg-slate-700 px-4 py-2 rounded-lg">
              {isEthToToken ? 'DFT' : 'ETH'}
            </span>
          </div>
        </div>

        <button
          onClick={handleSwap}
          disabled={isLoading || isApproving || !fromAmount}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {isLoading || isApproving ? 'Processing...' : 'Swap'}
        </button>
      </div>
    </div>
  );
}
