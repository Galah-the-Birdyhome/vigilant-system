// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.16;

interface IArbistarFactory {
    event PairCreated(address indexed, address indexed, address, uint256);

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address, address) external view returns (address);

    function allPairs(uint256) external view returns (address);

    function allPairsLength() external view returns (uint256);

    function createPair(address, address) external returns (address);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;

    function setPairFee(address, uint, bool) external returns (uint);
}
