const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Hello", () => {
  it("Should return Hello", async () => {
    const Hello = await ethers.getContractFactory("Hello"); // create contract factory
    const hello = await Hello.deploy();

    expect(await hello.getHello()).to.equals("Hello");
  });
});
