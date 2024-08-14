
# Web3Eth 方法

## createAccessList

[createAccessList](/api/web3-eth/function/createAccessList) 方法用于创建访问列表。
在以太坊中创建访问列表通常与以太坊改进提案（EIP）-2930相关，该提案引入了一种指定交易预期访问的账户和存储键的方法。访问列表用于通过提供交易需要访问的明确信息来优化交易的燃气成本。

## estimateGas

[estimateGas](/api/web3-eth/function/estimateGas) 函数用于估算执行特定交易或调用合约函数时将消耗的 Gas 量。当您想在实际将交易发送到以太坊网络之前确定交易或函数调用的潜在成本时，这非常有用。它帮助用户确保他们有足够的以太币来支付操作的 Gas 费用。

## getBalance

[getBalance](/api/web3-eth/function/getBalance) 函数用于检索以太坊地址的余额，表示与该地址关联的以太币（ETH）数量。在使用以太坊应用程序时，这是一个基本且经常使用的函数。

## getBlock

[getBlock](/api/web3-eth/function/getBlock) 函数用于检索特定以太坊区块的信息。以太坊区块是区块链的基本构建块，包含一系列交易和其他数据。

## getBlockNumber

[getBlockNumber](/api/web3-eth/function/getBlockNumber) 函数用于检索以太坊区块链的最新区块号（也称为区块高度）。区块号是以太坊中的一个关键信息，它代表区块链的当前状态，表示迄今为止已挖掘的区块总数。

## getBlockTransactionCount

[getBlockTransactionCount](/api/web3-eth/function/getBlockTransactionCount) 函数用于检索特定以太坊区块中的交易数量。它允许您确定以太坊区块链上特定区块中包含了多少交易。

## getBlockUncleCount

[getBlockUncleCount](/api/web3-eth/function/getBlockUncleCount) 函数用于检索与特定以太坊区块关联的叔块数量。在以太坊中，叔块（也称为"陈旧块"或"ommer块"）是已被挖掘但未包含在主区块链中的区块。它们被其他区块引用，作为一种即使矿工的区块不是主链的一部分也能奖励矿工努力的方式。

## getChainId

[getChainId](/api/web3-eth/function/getChainId) 函数用于检索所连接的以太坊网络的链ID。链ID是特定以太坊网络的唯一标识符，用于在签署交易时帮助防止重放攻击。不同的以太坊网络，如主网、测试网和私有网络，都有不同的链ID。

## getCode

[getCode](/api/web3-eth/function/getCode) 函数库用于检索部署在以太坊区块链上的智能合约的字节码。以太坊上的智能合约通常是通过将字节码部署到特定地址来创建的，此函数允许您获取与特定合约地址关联的字节码。

## getCoinbase

[getCoinbase](/api/web3-eth/function/getCoinbase) 函数用于检索当前作为所连接以太坊节点挖矿coinbase地址的以太坊账户地址。coinbase地址是当矿工成功在以太坊区块链上挖掘新区块时，区块奖励被发送到的地址。矿工配置他们的coinbase地址以接收他们挖矿努力的奖励。

## getGasPrice

[getGasPrice](/api/web3-eth/function/getGasPrice) 函数用于检索以太坊网络上的当前 Gas 价格。Gas 价格是用户在执行以太坊网络上的交易时愿意为每单位 Gas 支付的以太币（ETH）数量。Gas 价格是决定交易费用（以 ETH 计）的重要因素。

## getPendingTransactions

[getPendingTransactions](/api/web3-eth/function/getPendingTransactions) 函数用于检索以太坊网络中待处理交易的信息。待处理交易是已提交到网络但尚未包含在已挖掘区块中的交易。此函数允许您访问等待矿工确认的交易信息。

## getProof

[getProof](/api/web3-eth/function/getProof) 函数用于获取以太坊智能合约存储中特定值或数据的默克尔证明或帕特里夏树证明。当您想验证某个数据是否存储在合约的存储中，或者在不与整个合约状态交互的情况下提供数据包含的证据时，通常使用此函数。

在以太坊中，存储证明用于证明合约存储中存在某个值，而无需查询合约的整个存储，这可能在计算上很昂贵。这些证明对于各种应用至关重要，包括去中心化交易所、区块链浏览器和某些加密操作。

## getProtocolVersion

您可以使用 [getProtocolVersion](/api/web3-eth/function/getProtocolVersion) 方法检索所连接以太坊节点的当前以太坊协议版本。

## getStorageAt

[getStorageAt](/api/web3-eth/function/getStorageAt) 方法用于获取以太坊地址特定存储槽中存储的数据。它通常用于检查智能合约的内部状态，特别是当您想检索合约存储中特定变量的值时。

## getTransaction

[getTransaction](/api/web3-eth/function/getTransaction) 方法允许您根据交易哈希检索有关交易的信息。您提供交易哈希，此方法返回一个包含交易详情的对象。

## getTransactionCount

[getTransactionCount](/api/web3-eth/function/getTransactionCount) 方法允许您检索特定以太坊地址的交易计数（nonce）。

## getTransactionReceipt

[getTransactionReceipt](/api/web3-eth/function/getTransactionReceipt) 方法允许您根据交易哈希检索特定交易的交易收据。

## getUncle

[getUncle](/api/web3-eth/function/getUncle) 方法允许您检索给定区块中特定索引处的叔块信息。

## isMining

[isMining](/api/web3-eth/function/isMining) 函数返回一个布尔值，表示节点是否正在积极挖矿。

## isSyncing

[isSyncing](/api/web3-eth/function/isSyncing) 方法允许您检查以太坊节点的当前同步状态。

## sendTransaction

[sendTransaction](/api/web3-eth/function/sendTransaction) 方法用于创建并发送交易到以太坊网络。

::: warning IMPORTANT
发送交易时请谨慎，特别是在处理智能合约时，因为它们可能执行具有不可逆效果的特定函数。始终确保交易对象中的详细信息准确无误且符合预期。

[这里](/guides/wallet/transactions)您可以找到更多如何发送交易的示例。
:::

## sign

[sign](/api/web3-eth/function/sign) 方法用于使用私钥对消息或数据进行签名。这通常用于证明特定数据的所有权或作者身份，或在各种以太坊相关操作中提供加密证明。

## signTransaction

[signTransaction](/api/web3-eth/function/signTransaction) 方法用于签署以太坊交易，创建可以广播到以太坊网络的已签名交易对象。

## sendSignedTransaction

[sendSignedTransaction](/api/web3-eth/function/sendSignedTransaction) 方法用于将已签名的以太坊交易发送到以太坊网络。在发送交易之前，您需要使用私钥对其进行签名，然后可以使用此方法将已签名的交易广播到网络。

::: info NOTE
[这里](/guides/wallet/transactions)您可以找到更多如何发送交易的示例。
:::

