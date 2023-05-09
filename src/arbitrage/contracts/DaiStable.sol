// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import './libraries/L2Gateway.sol';
import './libraries/ERC20.sol';

contract DaiStable is ERC20, L2Gateway {
  // solhint-disable-next-line
  constructor() ERC20('DAI Stable', 'DAI') {
    _mint(msg.sender, 718e24);
  }

  function decimals() public pure override returns (uint8) {
    return 18;
  }

  function mint(address to, uint256 amount) public onlyGateway {
    _mint(to, amount);
  }
}
