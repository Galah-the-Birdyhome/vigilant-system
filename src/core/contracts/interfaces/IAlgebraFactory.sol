// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

/**
 * @title The interface for the Algebra Factory
 */
interface IAlgebraFactory {
    /**
     *  @notice Emitted when the owner of the factory is changed
     *  @param oldOwner The owner before the owner was changed
     *  @param newOwner The owner after the owner was changed
     */
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    /**
     *  @notice Emitted when a pool is created
     *  @param token0 The first token of the pool by address sort order
     *  @param token1 The second token of the pool by address sort order
     *  @param pool The address of the created pool
     */
    event PoolCreated(address indexed token0, address indexed token1, address pool);

    /**
     *  @notice Returns the current owner of the factory
     *  @dev Can be changed by the current owner via setOwner
     *  @return The address of the factory owner
     */
    function owner() external view returns (address);

    /**
     *  @notice Returns the current poolDeployerAddress
     *  @return The address of the poolDeployer
     */
    function poolDeployer() external view returns (address);

    /**
     * @dev Is retrieved from the pools to restrict calling
     * certain functions not by a staker contract
     * @return The staker contract address
     */
    function stakerAddress() external view returns (address);

    // TODO: documentation
    function vaultAddress() external view returns (address);

    /**
     *  @notice Returns the pool address for a given pair of tokens and a fee, or address 0 if it does not exist
     *  @dev tokenA and tokenB may be passed in either token0/token1 or token1/token0 order
     *  @param tokenA The contract address of either token0 or token1
     *  @param tokenB The contract address of the other token
     *  @return pool The pool address
     */
    function poolByPair(address tokenA, address tokenB) external view returns (address pool);

    /**
     *  @notice Creates a pool for the given two tokens and fee
     *  @param tokenA One of the two tokens in the desired pool
     *  @param tokenB The other of the two tokens in the desired pool
     *  @dev tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
     *  from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
     *  are invalid.
     *  @return pool The address of the newly created pool
     */
    function createPool(address tokenA, address tokenB) external returns (address pool);

    /**
     *  @notice Updates the owner of the factory
     *  @dev Must be called by the current owner
     *  @param _owner The new owner of the factory
     */
    function setOwner(address _owner) external;

    /**
     * @dev updates staker address on the factory
     * @param _stakerAddress The new staker contract address
     */
    function setStakerAddress(address _stakerAddress) external;

    // TODO: doc
    function setVaultAddress(address _vaultAddress) external;
}