const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-waffle');

task('accounts', 'Display accounts', async (args, hre) => {
  const accounts =  await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.7.3",
  solidity: "0.8.7",
};
