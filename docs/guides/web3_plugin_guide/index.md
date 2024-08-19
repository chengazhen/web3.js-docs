好的,我来为您翻译这篇markdown文档,并保留原有格式:

---
sidebar_position: 1
sidebar_label: '入门指南'
---

# 入门指南

<iframe width="100%" height="700px"  src="https://stackblitz.com/edit/vitejs-vite-uxkc1b?embed=1&file=main.ts&showSidebar=1"></iframe>

欢迎来到Web3插件🧩指南,这是web3.js v4中引入的新功能。除了核心的web3.js库之外,插件还为终端用户带来了专门的功能(这些功能是您作为开发者可以创建的)。这些增强功能可能涉及为特定合约创建包装器、为RPC方法添加额外功能、添加任何外部库、逻辑、扩展web3.js方法的能力等...

在本指南中,您将学习构建web3插件的基础知识,设置提供者,导入和使用不同的web3.js包。

- [插件开发者指南(创建者用)](/guides/web3_plugin_guide/plugin_authors)
- [插件用户指南(使用)](/guides/web3_plugin_guide/plugin_users)

- 您可以在[这里](https://web3js.org/plugins)找到所有的web3插件🧩

- 要将您的web3插件🧩列入web3js.org/plugins页面,您可以在[这里](https://github.com/web3/web3js-landing/blob/main/src/pluginList.ts)提交PR

## 创建插件

```javascript
//1. 导入 `Web3PluginBase` 模块
import { Web3PluginBase } from "web3";

//2. 创建一个继承 `Web3Pluginbase` 的类
class MyPlugin extends Web3PluginBase {

    //3. 为插件添加一个名称
    pluginNamespace = "pluginExample";

    //4. 创建任何具有您所需功能的方法
    async doSomething(){
        console.log("Hello web3!");
        //发送交易
        //初始化合约
        //部署或与合约交互
        //添加您自己的库、逻辑或功能
        //更多...
    }
}

module.exports = MyPlugin;
```

## 使用插件

```javascript
//1. 导入插件和web3模块
import { Web3 } from "web3";
import MyPlugin from "./plugin";

//2. 初始化web3实例
const web3 = new Web3("https://eth.llamarpc.com");

//3. 注册插件以添加当前的Web3Context
web3.registerPlugin(new MyPlugin());

//4. 使用插件方法
web3.pluginExample.doSomething();
//--> Hello web3!
```

## 在插件中使用web3包

### 使用Eth模块

```js
import { FMT_NUMBER, Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async getChainId() {
    //`this`是您在使用时注册插件的web3上下文
    return await eth.getChainId(this, { number: FMT_NUMBER.NUMBER });
  }

  async getBlockNumber() {
    return await eth.getBlockNumber(this, { number: FMT_NUMBER.NUMBER });
  }

  //更多web3.eth.方法...
}

export default MyPlugin;
```

### 使用Utils

```js
import { Web3PluginBase, utils } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  weiToEth(value) {
    //`this`是您在使用时注册插件的web3上下文
    return utils.fromWei(value, 'ether');
  }

  //更多web3.eth.方法...
}

export default MyPlugin;
```

### 使用Accounts

```js
import { Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async createAccount() {
    const account = eth.accounts.create();
    console.log("account:", account);
    /*
    account: {
        address: '0x59E797F2F66AffA9A419a6BC2ED4742b7cBc2570',
        privateKey: '0x52a81fc3a7fd6ce9644147c9fb5bfbe1f708f37b4611b3c3310eb9a6dc85ccf4',
        signTransaction: [Function: signTransaction],
        sign: [Function: sign],
        encrypt: [Function: encrypt]
    }
    */
  }
}

export default MyPlugin;
```

### 使用Wallet

```js
import { Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async createWallet() {
    //1. 创建一个随机账户
    const accounts = eth.accounts.create();
    //2. 将账户添加到钱包
    const wallet = this.wallet.add(accounts);
    //通过创建钱包,web3.js将使用此账户在后台签署交易
    console.log(wallet);
    /*
    Wallet(1) [
    {
      address: '0x233725561B1430bE2C24Ce9EEabe63E4B46EC9E3',
      privateKey: '0x6856adf06dd803e0354450ccf251f829a2c9ef1177ce371f8835bbfb56cd0898',
      signTransaction: [Function: signTransaction],
      sign: [Function: sign],
      encrypt: [Function: encrypt]
    },
    _accountProvider: {
      create: [Function: createWithContext],
      privateKeyToAccount: [Function: privateKeyToAccountWithContext],
      decrypt: [Function: decryptWithContext]
    },
    _addressMap: Map(1) { '0x233725561b1430be2c24ce9eeabe63e4b46ec9e3' => 0 },
    _defaultKeyName: 'web3js_wallet'
  ]
    */
  }
}

export default MyPlugin;
```

### 使用Contract

```js
import { Web3PluginBase, Contract } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async interactWithContract() {
    //1. 初始化合约
    const myContract = new Contract(ABI, ADDRESS);

    //2. 与读取函数交互
    const response = myContract.methods.doSomething().call();

    //3. 与写入函数交互
    //您必须初始化一个钱包才能从wallet[0].address发送交易
    const txReceipt = myContract.methods.doSomething().send({from: wallet[0].address})
  }
}

export default MyPlugin;
```

### 使用ENS

```js
import { Web3PluginBase } from "web3";
import { ENS } from "web3-eth-ens";

class MyPlugin extends Web3PluginBase {
  pluginNamespace = "pluginExample";

  async getAddressENS() {
    const ens = new ENS(undefined, this); //链接到当前web3Context
    return ens.getAddress("ethereum.eth");
  }

}
```

:::info
更多ENS方法[请点击这里](https://docs.web3js.org/libdocs/ENS#methods)
:::

## Web3 requestManager (自定义RPC)

```js
import { Web3PluginBase } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async customRPC() {
    return await this.requestManager.send({
      method: "custom_RPC_call",
      params: [],
    });
  }

  async getNonce() {
    return await this.requestManager.send({
      jsonrpc: "2.0",
      method: "eth_getTransactionCount",
      params: ["0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F", "latest"],
    });
  }

  async getBlockNumber() {
    return await this.requestManager.send({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
    });
  }

}
```

:::info
所有Ethereum JSON-RPC API[请点击这里](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)
:::

## Web3 配置参数

```js
import { Web3PluginBase } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async configParams() {
    this.config.handleRevert = true;
    this.config.defaultTransactionType = 0x1;
    //更多参数...
  }
}
```

:::info
所有web3配置参数[请点击这里](https://docs.web3js.org/guides/web3_config/)
:::

## 视频

### 20分钟创建您的第一个插件!

<iframe width="560" height="315" src="https://www.youtube.com/embed/fW1PDApXCtM?si=isocyW7NvWkEuDqG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Chainlink插件: web3.js, viem, ethers vs web3插件🧩

<iframe width="560" height="315" src="https://www.youtube.com/embed/iF_O7ggQaQw?si=8KHqYDWx3JfmbAGZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>好的,我来为您翻译这篇markdown文档,并保留原有格式:

---
sidebar_position: 1
sidebar_label: '入门指南'
---

# 入门指南

<iframe width="100%" height="700px"  src="https://stackblitz.com/edit/vitejs-vite-uxkc1b?embed=1&file=main.ts&showSidebar=1"></iframe>

欢迎来到Web3插件🧩指南,这是web3.js v4中引入的新功能。除了核心的web3.js库之外,插件还为终端用户带来了专门的功能(这些功能是您作为开发者可以创建的)。这些增强功能可能涉及为特定合约创建包装器、为RPC方法添加额外功能、添加任何外部库、逻辑、扩展web3.js方法的能力等...

在本指南中,您将学习构建web3插件的基础知识,设置提供者,导入和使用不同的web3.js包。

- [插件开发者指南(创建者用)](/guides/web3_plugin_guide/plugin_authors)
- [插件用户指南(使用)](/guides/web3_plugin_guide/plugin_users)

- 您可以在[这里](https://web3js.org/plugins)找到所有的web3插件🧩

- 要将您的web3插件🧩列入web3js.org/plugins页面,您可以在[这里](https://github.com/web3/web3js-landing/blob/main/src/pluginList.ts)提交PR

## 创建插件

```javascript
//1. 导入 `Web3PluginBase` 模块
import { Web3PluginBase } from "web3";

//2. 创建一个继承 `Web3Pluginbase` 的类
class MyPlugin extends Web3PluginBase {

    //3. 为插件添加一个名称
    pluginNamespace = "pluginExample";

    //4. 创建任何具有您所需功能的方法
    async doSomething(){
        console.log("Hello web3!");
        //发送交易
        //初始化合约
        //部署或与合约交互
        //添加您自己的库、逻辑或功能
        //更多...
    }
}

module.exports = MyPlugin;
```

## 使用插件

```javascript
//1. 导入插件和web3模块
import { Web3 } from "web3";
import MyPlugin from "./plugin";

//2. 初始化web3实例
const web3 = new Web3("https://eth.llamarpc.com");

//3. 注册插件以添加当前的Web3Context
web3.registerPlugin(new MyPlugin());

//4. 使用插件方法
web3.pluginExample.doSomething();
//--> Hello web3!
```

## 在插件中使用web3包

### 使用Eth模块

```js
import { FMT_NUMBER, Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async getChainId() {
    //`this`是您在使用时注册插件的web3上下文
    return await eth.getChainId(this, { number: FMT_NUMBER.NUMBER });
  }

  async getBlockNumber() {
    return await eth.getBlockNumber(this, { number: FMT_NUMBER.NUMBER });
  }

  //更多web3.eth.方法...
}

export default MyPlugin;
```

### 使用Utils

```js
import { Web3PluginBase, utils } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  weiToEth(value) {
    //`this`是您在使用时注册插件的web3上下文
    return utils.fromWei(value, 'ether');
  }

  //更多web3.eth.方法...
}

export default MyPlugin;
```

### 使用Accounts

```js
import { Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async createAccount() {
    const account = eth.accounts.create();
    console.log("account:", account);
    /*
    account: {
        address: '0x59E797F2F66AffA9A419a6BC2ED4742b7cBc2570',
        privateKey: '0x52a81fc3a7fd6ce9644147c9fb5bfbe1f708f37b4611b3c3310eb9a6dc85ccf4',
        signTransaction: [Function: signTransaction],
        sign: [Function: sign],
        encrypt: [Function: encrypt]
    }
    */
  }
}

export default MyPlugin;
```

### 使用Wallet

```js
import { Web3PluginBase, eth } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async createWallet() {
    //1. 创建一个随机账户
    const accounts = eth.accounts.create();
    //2. 将账户添加到钱包
    const wallet = this.wallet.add(accounts);
    //通过创建钱包,web3.js将使用此账户在后台签署交易
    console.log(wallet);
    /*
    Wallet(1) [
    {
      address: '0x233725561B1430bE2C24Ce9EEabe63E4B46EC9E3',
      privateKey: '0x6856adf06dd803e0354450ccf251f829a2c9ef1177ce371f8835bbfb56cd0898',
      signTransaction: [Function: signTransaction],
      sign: [Function: sign],
      encrypt: [Function: encrypt]
    },
    _accountProvider: {
      create: [Function: createWithContext],
      privateKeyToAccount: [Function: privateKeyToAccountWithContext],
      decrypt: [Function: decryptWithContext]
    },
    _addressMap: Map(1) { '0x233725561b1430be2c24ce9eeabe63e4b46ec9e3' => 0 },
    _defaultKeyName: 'web3js_wallet'
  ]
    */
  }
}

export default MyPlugin;
```

### 使用Contract

```js
import { Web3PluginBase, Contract } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async interactWithContract() {
    //1. 初始化合约
    const myContract = new Contract(ABI, ADDRESS);

    //2. 与读取函数交互
    const response = myContract.methods.doSomething().call();

    //3. 与写入函数交互
    //您必须初始化一个钱包才能从wallet[0].address发送交易
    const txReceipt = myContract.methods.doSomething().send({from: wallet[0].address})
  }
}

export default MyPlugin;
```

### 使用ENS

```js
import { Web3PluginBase } from "web3";
import { ENS } from "web3-eth-ens";

class MyPlugin extends Web3PluginBase {
  pluginNamespace = "pluginExample";

  async getAddressENS() {
    const ens = new ENS(undefined, this); //链接到当前web3Context
    return ens.getAddress("ethereum.eth");
  }

}
```

:::info
更多ENS方法[请点击这里](https://docs.web3js.org/libdocs/ENS#methods)
:::

## Web3 requestManager (自定义RPC)

```js
import { Web3PluginBase } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async customRPC() {
    return await this.requestManager.send({
      method: "custom_RPC_call",
      params: [],
    });
  }

  async getNonce() {
    return await this.requestManager.send({
      jsonrpc: "2.0",
      method: "eth_getTransactionCount",
      params: ["0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F", "latest"],
    });
  }

  async getBlockNumber() {
    return await this.requestManager.send({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
    });
  }

}
```

:::info
所有Ethereum JSON-RPC API[请点击这里](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)
:::

## Web3 配置参数

```js
import { Web3PluginBase } from 'web3';

class MyPlugin extends Web3PluginBase {
  pluginNamespace = 'pluginExample';

  async configParams() {
    this.config.handleRevert = true;
    this.config.defaultTransactionType = 0x1;
    //更多参数...
  }
}
```

:::info
所有web3配置参数[请点击这里](https://docs.web3js.org/guides/web3_config/)
:::

## 视频

### 20分钟创建您的第一个插件!

<iframe width="560" height="315" src="https://www.youtube.com/embed/fW1PDApXCtM?si=isocyW7NvWkEuDqG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Chainlink插件: web3.js, viem, ethers vs web3插件🧩

<iframe width="560" height="315" src="https://www.youtube.com/embed/iF_O7ggQaQw?si=8KHqYDWx3JfmbAGZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>