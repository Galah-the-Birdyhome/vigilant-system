// SPDX-License-Identifier: MIT
// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.16;

abstract contract L2Gateway {
  address public _l2Gateway;

  constructor() {
    _l2Gateway = msg.sender;
  }

  event L2GatewayTransferred(address indexed prevGateway, address indexed newGateway);
  modifier onlyGateway() {
    require(msg.sender == _l2Gateway, 'NOT Gateway');
    _;
  }

  function setL2Gateway(address newl2Gateway) public onlyGateway {
    require(newl2Gateway != address(0), 'Zero Address');
    emit L2GatewayTransferred(_l2Gateway, newl2Gateway);
    _l2Gateway = newl2Gateway;
  }
}
