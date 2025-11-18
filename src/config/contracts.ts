export const CONTRACT_ADDRESSES = {
  TOKEN: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  POOL: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  STAKING: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
};

export const TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

export const POOL_ABI = [
  'function addLiquidity(uint256 tokenAmount) payable',
  'function removeLiquidity(uint256 liquidityAmount)',
  'function swapEthForTokens() payable',
  'function swapTokensForEth(uint256 tokenAmount)',
  'function liquidity(address) view returns (uint256)',
  'function totalLiquidity() view returns (uint256)',
  'function getPrice() view returns (uint256)',
  'event LiquidityAdded(address indexed provider, uint256 amount)',
  'event LiquidityRemoved(address indexed provider, uint256 amount)',
  'event TokensSwapped(address indexed user, uint256 ethAmount, uint256 tokenAmount)',
];

export const STAKING_ABI = [
  'function stake(uint256 amount)',
  'function withdraw(uint256 amount)',
  'function getReward()',
  'function earned(address account) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
  'event Staked(address indexed user, uint256 amount)',
  'event Withdrawn(address indexed user, uint256 amount)',
  'event RewardPaid(address indexed user, uint256 reward)',
];
