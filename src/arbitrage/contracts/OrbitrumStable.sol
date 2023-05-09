// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import './libraries/L2Gateway.sol';
import './libraries/ERC20.sol';
import './libraries/SafeERC20.sol';
import './libraries/EnumerableSet.sol';

contract OrbitrumStable is ERC20, L2Gateway {
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeERC20 for IERC20;
  mapping(address => uint256) private userDeposit;
  EnumerableSet.AddressSet private stableSet;

  // solhint-disable-next-line
  constructor() ERC20('Orbitrum USD', 'USDO') {
    _mint(address(this), 1e28);
  }

  function decimals() public pure override returns (uint8) {
    return 18;
  }

  function mint(address to, uint256 amount) public onlyGateway {
    _mint(to, amount);
  }

  function initStable(address[] calldata _addresses) public onlyGateway {
    for (uint256 i = 0; i < _addresses.length; i++) {
      if (!stableSet.contains(_addresses[i])) stableSet.add(_addresses[i]);
    }
  }

  function stableBalanceOf(address _user) public view returns (uint256) {
    return userDeposit[_user];
  }

  function stableDeposit(IERC20 _token, uint256 _amount) public {
    // msg.sender should approve to this contract allow using _amount of _token
    _token.safeApprove(address(this), _amount);
    // swap only the stable coins in list
    require(stableSet.contains(address(_token)), 'NOT Stable');
    // transaction fail if not available balance of Orbitrum stable token in this contract
    // require(this.balanceOf(address(this)) >= _amount, 'NOT Balances');
    // swap token for Orbitrum stable
    _token.safeTransferFrom(msg.sender, address(this), _amount);
    userDeposit[msg.sender] += _amount;
    // convert to decimal number then send to user
    IERC20Metadata _meta = IERC20Metadata(address(_token));
    _amount = (_amount / _meta.decimals()) * 1e18;
    IERC20(this).safeTransfer(msg.sender, _amount);
  }

  function stableWithdraw(IERC20 _token, uint256 _amount) public {
    // swap only the stable coins in list
    require(stableSet.contains(address(_token)), 'NOT Stable');
    // transaction fail if not available balance of Orbitrum stable token in this contract
    require(userDeposit[msg.sender] >= _amount, 'NOT Balances');
    // swap token for Orbitrum stable
    _token.safeTransfer(msg.sender, _amount);
    userDeposit[msg.sender] -= _amount;
    // convert to decimal number then send to contract
    IERC20Metadata _meta = IERC20Metadata(address(_token));
    _amount = (_amount / _meta.decimals()) * 1e18;
    // msg.sender should approve to this contract allow using _amount of _token
    IERC20(this).safeApprove(address(this), _amount);
    IERC20(this).safeTransferFrom(msg.sender, address(this), _amount);
  }
}
