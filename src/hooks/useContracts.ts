import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES, TOKEN_ABI, POOL_ABI, STAKING_ABI } from '../config/contracts';

export function useTokenBalance(address: string | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.TOKEN as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });
}

export function useTokenApproval(spender: string, amount: string) {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.TOKEN as `0x${string}`,
      abi: TOKEN_ABI,
      functionName: 'approve',
      args: [spender, parseEther(amount)],
    });
  };

  return { approve, isLoading, isSuccess };
}

export function usePoolPrice() {
  return useReadContract({
    address: CONTRACT_ADDRESSES.POOL as `0x${string}`,
    abi: POOL_ABI,
    functionName: 'getPrice',
  });
}

export function useUserLiquidity(address: string | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.POOL as `0x${string}`,
    abi: POOL_ABI,
    functionName: 'liquidity',
    args: address ? [address] : undefined,
  });
}

export function useAddLiquidity() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const addLiquidity = (tokenAmount: string, ethAmount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.POOL as `0x${string}`,
      abi: POOL_ABI,
      functionName: 'addLiquidity',
      args: [parseEther(tokenAmount)],
      value: parseEther(ethAmount),
    });
  };

  return { addLiquidity, isLoading, isSuccess };
}

export function useSwap() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const swapEthForTokens = (ethAmount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.POOL as `0x${string}`,
      abi: POOL_ABI,
      functionName: 'swapEthForTokens',
      value: parseEther(ethAmount),
    });
  };

  const swapTokensForEth = (tokenAmount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.POOL as `0x${string}`,
      abi: POOL_ABI,
      functionName: 'swapTokensForEth',
      args: [parseEther(tokenAmount)],
    });
  };

  return { swapEthForTokens, swapTokensForEth, isLoading, isSuccess };
}

export function useStaking(address: string | undefined) {
  const stakedBalance = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const earned = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
  });

  return { stakedBalance: stakedBalance.data, earned: earned.data };
}

export function useStakingActions() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const stake = (amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'stake',
      args: [parseEther(amount)],
    });
  };

  const withdraw = (amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'withdraw',
      args: [parseEther(amount)],
    });
  };

  const claimRewards = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'getReward',
    });
  };

  return { stake, withdraw, claimRewards, isLoading, isSuccess };
}
