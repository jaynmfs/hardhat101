# Setup Hardhat Step-by-Step

## BLOCK - PSU Blockchain Research Team, Solidity Tutorial EP.8 (Summarize)

## Prerequisites

1. Node.js 14.x.x
2. NPM 7.x.x

## Step 1: Initialize node project

```bash
mkdir [your-project-name] && cd [your-project-name]
npm init -yp
```

## Step 2: Install Hardhat deps

```bash
npm i --save-dev hardhat
```

## Step 3: Initialize Hardhat project

use "Create an empty hardhat.conf.js"

```bash
npx hardhat

888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.0.8

? What do you want to do? …
  Create a sample project
  Create an advanced sample project
> Create an empty hardhat.config.js
  Quit
```

After project initialized, change solidity version from "0.7.3" to "0.8.7" in "hardhat.config.js"

## Step 4: Install Hardhat-waffle and write some tasks

```bash
npm i --save-dev @nomiclabs/hardhat-waffle
```

In "hardhat.config.js" file, add code below to the top line of the file

```js
// hardhat.config.js

const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-waffle');

task('accounts', 'Display accounts', async (args, hre) => {
  const accounts =  await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
...
```

## Step 5: Install Chai and write Hardhat tests

```bash
npm i --save-dev chai
```

After Chai installed, create "test" folder on root directory, and write some test file in the folder

```bash
mkdir test
touch test/test.js
```

Code below is test example

```js
// test/test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Hello", () => {
  it("Should return Hello", async () => {
    const Hello = await ethers.getContractFactory("Hello"); // create contract factory
    const hello = await Hello.deploy();

    expect(await hello.getHello()).to.equals("Hello");
  });
});
```

** Should do Test-Driven-Development - TDD (write test before develop, test and failed, develop, test again until success)

After write test file, try to run test by command below

```bash
npx hardhat test


  Hello
    ✓ Should return Hello (1467ms)


  1 passing (1s)


```

## Step 6: Write deploy script

```bash
mkdir scripts
touch scripts/deploy.js
```

Add code below to "deploy.js" file

```js
// scripts/deploy.js

const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  const Hello = await ethers.getContractFactory('Hello');
  const hello = await Hello.deploy();

  console.log('address', hello.address);
  await hello.setHello('Solidity EP.8');
  console.log('Get Hello: ', await hello.getHello());
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });


```

## Step 7: Run Hardhat node and deploy contract to local network

### Run Hardhat node

```bash
npx hardhat node

Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

...

```

### Deploy contract to local network

```bash
npx hardhat run scripts/deploy.js --network localhost

address 0x5FbDB2315678afecb367f032d93F642f6418xxxx
Get Hello:  Solidity EP.8

```
