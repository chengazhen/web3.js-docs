

# 使用 web3.js ENS 包

##

<iframe width="100%" height="700px"  src="https://stackblitz.com/edit/vitejs-vite-qmk8vz?embed=1&file=main.ts&showSidebar=1"></iframe>

在本教程中，我们将探讨如何使用 web3.js ENS（以太坊名称服务）包。以太坊名称服务（ENS）是建立在以太坊区块链上的去中心化域名系统。它是一个分布式、安全的、可读性强的命名系统，旨在将以太坊地址、智能合约和各种其他服务映射到易于理解的名称。

## 安装 web3.js

首先，使用 npm 在您的项目中安装 web3.js 版本 4：

```bash
npm install web3
```

## 设置 web3 和 ENS

现在，让我们在 TypeScript 文件中设置 web3 和 ENS：

```typescript
import Web3 from 'web3';

// 假设你有一个提供者，将 'http://localhost:8545' 替换为你的 Web3 提供者
const web3 = new Web3('http://localhost:8545');

// 初始化 ENS
const ens = web3.ens;
```

## 解析 ENS 名称

一旦我们设置了 web3 和 ENS，我们可以解析 ENS 名称。以下是如何将 ENS 名称解析为以太坊地址的示例：

```typescript
const address = await ens.getAddress('vitalik.eth');
console.log('以太坊地址:', address);
```

## 注册 ENS 名称

要注册一个新的 ENS 名称，我们首先需要使用 web3.js 与 ENS 合约进行交互：

```typescript
const name = 'example.eth';
const owner = '0xYourEthereumAddress';

// 假设你已经部署了一个 ENS 合约
await ens.setOwner(name, owner);
console.log(`${name} 已注册到 ${owner}`);
```

## 反向解析

反向解析是从以太坊地址查找相应的 ENS 名称。以下是如何执行此操作的示例：

```typescript
const name = await ens.getName('0xYourEthereumAddress');
console.log('ENS 名称:', name);
```

## 总结

通过使用 web3.js ENS 包，您可以轻松地在去中心化的以太坊名称服务上解析、注册和反向解析名称。这为以太坊生态系统中的用户和开发者提供了便捷的命名服务，使得复杂的以太坊地址更易于使用和记忆。
