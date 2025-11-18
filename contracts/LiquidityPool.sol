// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidityPool is ReentrancyGuard {
    IERC20 public token;
    uint256 public totalLiquidity;
    mapping(address => uint256) public liquidity;

    event LiquidityAdded(address indexed provider, uint256 amount);
    event LiquidityRemoved(address indexed provider, uint256 amount);
    event TokensSwapped(address indexed user, uint256 ethAmount, uint256 tokenAmount);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function addLiquidity(uint256 tokenAmount) external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        require(tokenAmount > 0, "Must send tokens");

        token.transferFrom(msg.sender, address(this), tokenAmount);

        uint256 liquidityMinted = msg.value;
        if (totalLiquidity > 0) {
            liquidityMinted = (msg.value * totalLiquidity) / address(this).balance;
        }

        liquidity[msg.sender] += liquidityMinted;
        totalLiquidity += liquidityMinted;

        emit LiquidityAdded(msg.sender, liquidityMinted);
    }

    function removeLiquidity(uint256 liquidityAmount) external nonReentrant {
        require(liquidity[msg.sender] >= liquidityAmount, "Insufficient liquidity");

        uint256 ethAmount = (liquidityAmount * address(this).balance) / totalLiquidity;
        uint256 tokenAmount = (liquidityAmount * token.balanceOf(address(this))) / totalLiquidity;

        liquidity[msg.sender] -= liquidityAmount;
        totalLiquidity -= liquidityAmount;

        payable(msg.sender).transfer(ethAmount);
        token.transfer(msg.sender, tokenAmount);

        emit LiquidityRemoved(msg.sender, liquidityAmount);
    }

    function swapEthForTokens() external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");

        uint256 tokenReserve = token.balanceOf(address(this));
        uint256 ethReserve = address(this).balance - msg.value;

        uint256 tokenAmount = getAmountOut(msg.value, ethReserve, tokenReserve);

        token.transfer(msg.sender, tokenAmount);

        emit TokensSwapped(msg.sender, msg.value, tokenAmount);
    }

    function swapTokensForEth(uint256 tokenAmount) external nonReentrant {
        require(tokenAmount > 0, "Must send tokens");

        uint256 tokenReserve = token.balanceOf(address(this));
        uint256 ethReserve = address(this).balance;

        token.transferFrom(msg.sender, address(this), tokenAmount);

        uint256 ethAmount = getAmountOut(tokenAmount, tokenReserve, ethReserve);

        payable(msg.sender).transfer(ethAmount);

        emit TokensSwapped(msg.sender, ethAmount, tokenAmount);
    }

    function getAmountOut(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "Invalid reserves");

        uint256 inputAmountWithFee = inputAmount * 997;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;

        return numerator / denominator;
    }

    function getPrice() external view returns (uint256) {
        uint256 tokenReserve = token.balanceOf(address(this));
        uint256 ethReserve = address(this).balance;

        if (tokenReserve == 0) return 0;
        return (ethReserve * 1e18) / tokenReserve;
    }
}
