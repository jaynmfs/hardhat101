// SPDX-License-Identifier: NoLicense

pragma solidity 0.8.7;

contract Hello {
  string hello = "Hello";

  function getHello() public view returns (string memory) {
    return hello;
  }

  function setHello(string memory _hello) public {
    hello = _hello;
  }
}