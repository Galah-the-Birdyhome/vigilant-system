// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.16;

import "./interfaces/IArbistarFactory.sol";
import "./ArbistarPair.sol";

contract ArbistarFactory is IArbistarFactory {
    bytes32 public constant PAIR_HASH =
        keccak256(type(ArbistarPair).creationCode);

    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint256) {
        return allPairs.length;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external override returns (address pair) {
        require(tokenA != tokenB, "Arbistar: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), "Arbistar: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "Arbistar: PAIR_EXISTS"); // single check is sufficient

        pair = address(
            new ArbistarPair{
                salt: keccak256(abi.encodePacked(token0, token1))
            }()
        );
        IArbistarPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "Arbistar: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "Arbistar: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setPairFee(
        address _pair,
        uint _fee,
        bool _onFee
    ) external override returns (uint) {
        require(msg.sender == feeToSetter, "Arbistar: FORBIDEN");
        return ArbistarPair(_pair).setFeeOn(_onFee, _fee);
    }
}
