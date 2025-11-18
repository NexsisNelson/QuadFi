import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useStaking, useStakingActions, useTokenApproval } from '../hooks/useContracts';
import { CONTRACT_ADDRESSES } from '../config/contracts';
import { formatEther } from 'viem';

export function StakingComponent() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { address } = useAccount();
  const { stakedBalance, earned } = useStaking(address);
  const { stake, withdraw, claimRewards, isLoading } = useStakingActions();
  const { approve: approveStake, isLoading: isApprovingStake } = useTokenApproval(
    CONTRACT_ADDRESSES.STAKING,
    stakeAmount
  );

  const handleStake = async () => {
    if (!stakeAmount) return;
    await approveStake();
    stake(stakeAmount);
    setStakeAmount('');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount) return;
    withdraw(withdrawAmount);
    setWithdrawAmount('');
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-white">Staking</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Staked Balance</p>
          <p className="text-white text-xl font-bold">
            {stakedBalance ? formatEther(stakedBalance as bigint) : '0.0'} DFT
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Rewards Earned</p>
          <p className="text-green-400 text-xl font-bold">
            {earned ? formatEther(earned as bigint) : '0.0'} DFT
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">Stake Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-white text-xl outline-none w-full"
            />
            <button
              onClick={handleStake}
              disabled={isLoading || isApprovingStake || !stakeAmount}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              {isLoading || isApprovingStake ? 'Processing...' : 'Stake'}
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">Withdraw Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-white text-xl outline-none w-full"
            />
            <button
              onClick={handleWithdraw}
              disabled={isLoading || !withdrawAmount}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              {isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </div>

        <button
          onClick={() => claimRewards()}
          disabled={isLoading || !earned || earned === 0n}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {isLoading ? 'Processing...' : 'Claim Rewards'}
        </button>
      </div>
    </div>
  );
}
