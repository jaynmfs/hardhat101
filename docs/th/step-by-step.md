# ติดตั้ง Hardhat ที่ละขั้น

## BLOCK - PSU Blockchain Research Team, Solidity Tutorial EP.8 (สรุป)

## สิ่งที่ต้องมีก่อน

1. Node.js 14.x.x
2. NPM 7.x.x

## ขั้นตอนที่ 1: สร้างโปรเจค node

```bash
mkdir [ชื่อโปรเจคของคุณ] && cd [ชื่อโปรเจคของคุณ]
npm init -yp
```

## ขั้นตอนที่ 2: ติดตั้ง Hardhat

```bash
npm i --save-dev hardhat
```

## ขั้นตอนที่ 3: สร้างโปรเจค Hardhat

เลือก "Create an empty hardhat.conf.js"

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

หลังจากสร้างโปเจคเสร็จ ให้เปลี่ยนเวอร์ชันของ solidity จากเวอร์ชัน "0.7.3" เป็น "0.8.7" ในไฟล์ "hardhat.config.js"

## ขั้นตอนที่ 4: ติดตั้ง Hardhat-waffle และเขียน tasks

```bash
npm i --save-dev @nomiclabs/hardhat-waffle
```

เพิ่มโค้ดด้านล่างไปยังไฟล์ "hardhat.config.js" ส่วนต้นของไฟล์

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

## ขั้นตอนที่ 5: ติดตั้ง Chai และเขียนโค้ดทดสอบสำหรับ Hardhat

```bash
npm i --save-dev chai
```

หลังจากติดตั้ง Chai แล้ว ให้สร้างโฟลเดอร์ "test" ในโฟลเดอร์หลักของโปรเจค และสร้างไฟล์ "test.js" ในโฟลเดอร์ดังกล่าว เพื่อใช้ในการเขียนโค้ดทดสอบ

```bash
mkdir test
touch test/test.js
```

โค้ดด้านล่างเป็นตัวอย่างโค้ดสอบ

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

** ควรทำ Test-Driven-Development - TDD (เขียนเทสก่อนเขียนโค้ด, ลองเทสแล้วจะไม่สำเร็จ, เขียนโค้ดตามความต้องการ, ทดสอบอีกครั้ง ทำสลับกันไปจนกว่าจะเทสผ่าน)

หลังจากเขียนไฟล์โค้ดทดสอบเสร็จ สามารถลองรันโค้ดทดสอบได้โดยใช้คำสั่งด้านล่าง

```bash
npx hardhat test


  Hello
    ✓ Should return Hello (1467ms)


  1 passing (1s)


```

## ขั้นตอนที่ 6: เขียนสคริปต์สำหรับ deploy

```bash
mkdir scripts
touch scripts/deploy.js
```

เพิ่มโค้ดด้านล่างไปยังไฟล์ "deploy.js"

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

## ขั้นตอนที่ 7: รันโหนด Hardhat และ deploy contract ไปยัง local network

### รันโหนด Hardhat

```bash
npx hardhat node

Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

...

```

### Deploy contract ไปยัง local network

```bash
npx hardhat run scripts/deploy.js --network localhost

address 0x5FbDB2315678afecb367f032d93F642f6418xxxx
Get Hello:  Solidity EP.8

```

ฟังเนื้อหาได้ที่

- <https://facebook.com/BLOCK.PSU.Phuket/videos/164361209177133>

เพิ่มเติม

- <https://hardhat.org/getting-started/>
