# 开始使用 `eth` 
##

<iframe src="https://stackblitz.com/edit/vitejs-vite-w8v2kw?embed=1&file=main.ts&showSidebar=1" width="100%" height="600">
</iframe>

## 介绍

`web3-eth` 软件包提供了一套强大的功能，可与以太坊区块链和智能合约进行交互。 在本教程中，我们将指导你使用 web3.js 第 4 版的 `web3-eth` 软件包的基础知识。 我们将在整个示例中使用 TypeScript。

## 概述

以下是本教程的步骤概述：

1. [配置本地环境]()
2. [初始化项目]()
3. [配置 web3.js 并且连接到 Ganache 服务]()
4. [使用 web3.js 和以太坊区块链进行交互]()
5. [导入制定的包]()
6. [发送不同类型的事务]()

## 第一步: 配置本地环境

在开始编写和部署合同之前，我们需要设置环境。 为此，我们需要安装以下环境：

> 您还可以使用节点提供商而不是 ganache 与主网/台网交互，您可以使用 Alchemy、Infura、QuickNode 或从 Chainlist 获取公共端点。

1. `Ganache` Ganache 是用于以太坊开发的个人区块链(用于启动本地区块链服务)，可让您查看智能合约在现实世界中的运行情况。 您可以从 http://truffleframework.com/ganache 下载。
2. `Node.js` - Node.js 是一种 JavaScript 运行环境，允许您在服务器端运行 JavaScript。 您可以从 https://nodejs.org/en/download/ 下载。
3. `npm` - Node 软件包管理器用于在公共 npm 注册表或私有 npm 注册表中发布和安装软件包。 以下是如何安装 https://docs.npmjs.com/downloading-and-installing-node-js-and-npm。 (或者，也可以使用 yarn 代替 npm https://classic.yarnpkg.com/lang/en/docs/getting-started/）

## 第二步初始化项目
首先，为您的项目创建一个新的项目目录并进入目录：

```bash
mkdir web3-eth-tutorial
cd web3-eth-tutorial
```

然后使用 npm 初始化一个 node.js 项目：

```bash
npm init -y
```

这会在你的项目目录中创建一个 `package.json` 文件。

```bash

npm i typescript @types/node

```
这会给我们的项目安装 `typescript` 和 `@types/node` 依赖。


## 第三步: 配置 web3.js 并且连接到 Ganache 服务

在这一步我们会使用 web3.js 并且连接到 Ganache 服务，在这之前请确保 Ganache 服务已经启动。

首先，使用 npm 安装 web3

```bash
npm i web3
```

然后在你的项目里面创建 `index.ts` 文件，并添加如下代码：

```typescript
import { Web3 } from 'web3';

// Set up a connection to the Ganache network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
/* NOTE:
instead of using ganache, you can also interact with a testnet/mainnet using another provider
https://app.infura.io/
https://dashboard.alchemy.com/
or use a public provider https://chainlist.org/
*/

// Log the current block number to the console
const block = await web3.eth.getBlockNumber();

console.log('Last block:', block);
// ↳ Last block: 4975299n
```

这段代码会和 Ganache 网络建立连接，并且把当前的区块号打印到控制台。

执行下面的命令来运行来测试一下：

```bash

npx ts-node index.ts

```

## 第四步: 使用 web3.js 和以太坊区块链进行交互

这一步，我们使用 web3.js 和 Ganache 网络进行交互

在第一个例子里面，我们打算发送一个简单的事务。创建一个 `transaction.ts` 文件并且添加如下代码：

```typescript
import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
web3.eth.Contract.handleRevert = true;

async function interact() {
  //fetch all the available accounts
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  let balance1, balance2;
  //The initial balances of the accounts should be 100 Eth (10^18 wei)
  balance1 = await web3.eth.getBalance(accounts[0]);
  balance2 = await web3.eth.getBalance(accounts[1]);

  console.log(balance1, balance2);

  //create a transaction sending 1 Ether from account 0 to account 1
  const transaction = {
    from: accounts[0],
    to: accounts[1],
    // value should be passed in wei. For easier use and to avoid mistakes,
    //	we utilize the auxiliary `toWei` function:
    value: web3.utils.toWei('1', 'ether'),
  };

  //send the actual transaction
  const transactionHash = await web3.eth.sendTransaction(transaction);
  console.log('transactionHash', transactionHash);

  balance1 = await web3.eth.getBalance(accounts[0]);
  balance2 = await web3.eth.getBalance(accounts[1]);

  // see the updated balances
  console.log(balance1, balance2);

  // irrelevant with the actual transaction, just to know the gasPrice
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
}

(async () => {
  await interact();
})();
```

> <i class="fas fa-exclamation-circle"></i> 敲黑板 使用 Ganache 运行本地开发区块链时，所有账户通常默认为解锁状态，以便在开发和测试期间轻松访问和执行交易。 这意味着无需私钥或口令即可访问账户。 这就是为什么我们在示例中只用 from 字段表示账户

执行下面命令

```bash
npx ts-node transaction.ts

```

如果一切顺利，你会看到类似下面的输出：

```bash
[
  '0xc68863f36C48ec168AD45A86c96347D520eac1Cf',
  '0x80c05939B307f9833d905A685575b45659d3EA70',
  '0xA260Cf742e03B48ea1A2b76b0d20aaCfe6F85E5E',
  '0xf457b8C0CBE41e2a85b6222A97b7b7bC6Df1C0c0',
  '0x32dF9a0B365b6265Fb21893c551b0766084DDE21',
  '0x8a6A2b8b00C1C8135F1B25DcE54f73Ee18bEF43d',
  '0xAFc526Be4a2656f7E02501bdf660AbbaA8fb3d7A',
  '0xc32618116370fF776Ecd18301c801e146A1746b3',
  '0xDCCD49880dCf9603835B0f522c31Fcf0579b46Ff',
  '0x036006084Cb62b7FAf40B979868c0c03672a59B5'
]
100000000000000000000n 100000000000000000000n

transactionHash {
  transactionHash: '0xf685b64ccf5930d3779a33335ca22195b68901dbdc439f79dfc65d87c7ae88b0',
  transactionIndex: 0n,
  blockHash: '0x5bc044ad949cfd32ea4cbb249f0292e7dded44c3b0f599236c6d20ddaa96cc06',
  blockNumber: 1n,
  from: '0xc68863f36c48ec168ad45a86c96347d520eac1cf',
  to: '0x80c05939b307f9833d905a685575b45659d3ea70',
  gasUsed: 21000n,
  cumulativeGasUsed: 21000n,
  logs: [],
  status: 1n,
  logsBloom: '0x......000'
}

98999580000000000000n 101000000000000000000n

20000000000n

```

> <i class="fas fa-exclamation-circle"></i> NOTE
> 为了计算实际花费的以太币，我们必须计算发送的价值和费用。 Initial_balance = (Remaining_balance + value + gasUsed * gasPrice). 
> 在我们的例子中： 98999580000000000000 + 100000000000000 + (20000000000*21000) = 100 Ether


在下一个示例中，我们将使用 estimateGas 函数查看合同部署的预期 Gas。 (有关合约的更多信息，请参阅相应的教程）。 创建一个名为 estimate.ts 的文件，并填充以下代码：

```typescript

import { Web3, ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } from 'web3';

async function estimate() {
  // abi of our contract
  const abi = [
    {
      inputs: [{ internalType: 'uint256', name: '_myNumber', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'myNumber',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_myNumber', type: 'uint256' }],
      name: 'setMyNumber',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

  //get the available accounts
  const accounts = await web3.eth.getAccounts();
  let acc = await accounts[0];

  let contract = new web3.eth.Contract(abi);

  const deployment = contract.deploy({
    data: '0x608060405234801561001057600080fd5b506040516101d93803806101d983398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b61012c806100ad6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806323fd0e401460375780636ffd773c146051575b600080fd5b603d6069565b6040516048919060bf565b60405180910390f35b6067600480360381019060639190608c565b606f565b005b60005481565b8060008190555050565b60008135905060868160e2565b92915050565b600060208284031215609d57600080fd5b600060a9848285016079565b91505092915050565b60b98160d8565b82525050565b600060208201905060d2600083018460b2565b92915050565b6000819050919050565b60e98160d8565b811460f357600080fd5b5056fea2646970667358221220d28cf161457f7936995800eb9896635a02a559a0561bff6a09a40bfb81cd056564736f6c63430008000033',
    // @ts-expect-error
    arguments: [1],
  });

  let estimatedGas = await deployment.estimateGas({ from: acc }, DEFAULT_RETURN_FORMAT);
  // the returned data will be formatted as a bigint

  console.log('Default format:', estimatedGas);

  estimatedGas = await deployment.estimateGas({ from: acc }, ETH_DATA_FORMAT);
  // the returned data will be formatted as a hexstring

  console.log('Eth format:', estimatedGas);
}

(async () => {
  await estimate();
})();

```
执行下面命令

```bash
npx ts-node estimate.ts
```

如果一切正常，就能看到类似下面的内容：

```bash
Default format: 140648n
Eth format: 0x22568
```

> <i class="fas fa-exclamation-circle"></i> 请注意，web3.js 返回的数字默认为 BigInt 格式。 在本例中，我们使用了 ETH_DATA_FORMAT 参数，该参数可以在 web3.js 的大多数方法中传递，以便将结果格式化为十六进制。

在下一个示例中，我们将签署一个事务，并使用 sendSignedTransaction 发送已签署的事务。 创建一个名为 sendSigned.ts 的文件，并在其中填入以下代码：

```typescript
import { Web3 } from 'web3';
const web3 = new Web3('http://localhost:7545');

//make sure to copy the private key from ganache
const privateKey = '0x0fed6f64e01bc9fac9587b6e7245fd9d056c3c004ad546a17d3d029977f0930a';
const value = web3.utils.toWei('1', 'ether');

async function sendSigned() {
  const accounts = await web3.eth.getAccounts();
  const fromAddress = accounts[0];
  const toAddress = accounts[1];
  // Create a new transaction object
  const tx = {
    from: fromAddress,
    to: toAddress,
    value: value,
    gas: 21000,
    gasPrice: web3.utils.toWei('10', 'gwei'),
    nonce: await web3.eth.getTransactionCount(fromAddress),
  };

  // Sign the transaction with the private key
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  // Send the signed transaction to the network
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log('Transaction receipt:', receipt);
}
(async () => {
  await sendSigned();
})();

```
执行下面命令

```bash
npx ts-node sendSigned.ts
```

如果一切正常，就能看到类似下面的内容：

```bash

Transaction receipt: {
  transactionHash: '0x742df8f1ad4d04f6e5632889109506dbb7cdc8a6a1c80af3dfdfc71a67a04ddc',
  transactionIndex: 0n,
  blockNumber: 1n,
  blockHash: '0xab6678d76499b0ee383f182ab8f848ba27bd787e70e227524255c86b25224ed3',
  from: '0x66ce32a5200aac57b258c4eac26bc1493fefddea',
  to: '0x0afcfc43ac454348d8170c77b1f912b518b4ebe8',
  cumulativeGasUsed: 21000n,
  gasUsed: 21000n,
  logs: [],
  logsBloom: '0x...0000',
  status: 1n,
  effectiveGasPrice: 10000000000n,
  type: 2n
}

```

## 第五步: 导入制定的包（按需导入）

要使用 web3-eth 软件包的功能，可以选择直接导入该软件包，而不是依赖全局 web3 软件包，这样可以减少构建的大小。


### 直接导入 web3-eth

例如 getBalance 方法：

```TypeScript

import { Web3Eth } from 'web3-eth';

const eth = new Web3Eth('http://localhost:7545');

async function test() {
	const accounts = await eth.getAccounts();
	const currentBalance = await eth.getBalance(accounts[0]);
	console.log('Current balance:', currentBalance);
	// 115792089237316195423570985008687907853269984665640564039437613106102441895127n
}

(async () => {
	await test();
})();

```

### 直接使用 web3-eth 软件包

```ts
import { Web3Eth } from 'web3-eth';

const eth = new Web3Eth('http://localhost:8545');

console.log('defaultTransactionType before', eth.config.defaultTransactionType);
// defaultTransactionType before 0x0

eth.setConfig({ defaultTransactionType: '0x1' });

console.log('eth.config.defaultTransactionType after', eth.config.defaultTransactionType);
// defaultTransactionType before 0x1
```

## 第六步 发送不同类型的事务

### Legacy Transaction（传统交易）

在以太坊中，"传统交易 "通常指传统交易，其中的 Gas 费用由发送方明确设定，并可根据网络需求波动。 在以太坊改进提案（EIP）1559 实施之前，这些传统交易在以太坊网络上非常普遍。

传统交易的主要特征

1. Gas Price：在传统交易中，发送方会指定没每单位的 Gas 价格（单位： Gwei）。Gas 价格可由发送方调整，并决定交易在矿工处理过程中的优先级。 Gas 价格越高，交易确认越快。

2. Gas limit：发送方也可以设置 Gas 使用的上限。 Gas 是用于在以太坊网络上执行交易和智能合约的计算燃料。 设置 Gas 上限主要是为了确保发送方在处理交易时不会耗尽以太币。 它也会影响交易的成败。

3. Uncertainty in Fees： 传统交易的 Gas 价格会因网络拥堵而波动。 在需求旺盛时，Gas 价格会飙升，导致用户为及时处理交易支付更多费用。 相反，在网络较冷清的时期，用户可以支付较低的费用。

4. Manual Fee Estimation： 用户去手动估算适当的 Gas 价格，并将其纳入传统交易，以确保及时处理。 这一过程具有挑战性，因为 Gas 价格设置过低可能导致确认缓慢，而设置过高则可能导致多付。

5. EIP-1559 如下所述，EIP-1559 对以太坊的交易费用系统进行了修改，使其更加用户友好和可预测。 随着 EIP-1559 的推出，"基本费用 "的概念取代了人工设置 Gas 价格，从而减少了与传统交易相关的一些不确定性。

虽然 EIP-1559 显著改善了用户体验，但以太坊网络仍支持传统交易，如果用户愿意，可以继续发送手动指定 Gas 价格和 Gas Limit 的交易。 不过，EIP-1559 机制现在是大多数交易的推荐方法，因为它简化了流程，降低了多付费用的可能性。

要发送传统交易，请使用下面的代码：

```ts
import { Web3 } from 'web3';

const web3 = new Web3('http://localhost:8545');

async function test() {
  const privateKey = 'YOUR PRIVATE KEY HERE';
  // add private key to wallet to have auto-signing transactions feature
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // create transaction object
  const tx = {
    from: account.address,
    to: '0x27aa427c1d668ddefd7bc93f8857e7599ffd16ab',
    value: '0x1',
    gas: BigInt(21000),
    gasPrice: await web3.eth.getGasPrice(),
    type: BigInt(0), // <- specify type
  };

  // send transaction
  const receipt = await web3.eth.sendTransaction(tx);

  console.log('Receipt:', receipt);
  // Receipt: {
  //   blockHash: '0xc0f2fea359233b0843fb53255b8a7f42aa7b1aff53da7cbe78c45b5bac187ad4',
  //   blockNumber: 21n,
  //   cumulativeGasUsed: 21000n,
  //   effectiveGasPrice: 2569891347n,
  //   from: '0xe2597eb05cf9a87eb1309e86750c903ec38e527e',
  //   gasUsed: 21000n,
  //   logs: [],
  //   logsBloom: '0x0...00000',
  //   status: 1n,
  //   to: '0x27aa427c1d668ddefd7bc93f8857e7599ffd16ab',
  //   transactionHash: '0x0ffe880776f5631e4b64caf521bd01cd816dd2cc29e533bc56f392211856cf9a',
  //   transactionIndex: 0n,
  //   type: 0n
  // }
}
(async () => {
  await test();
})();
```