# NEPHW Protocol

# Introduction

NEPHEW Protocol or the Non Ephemeral Wallet Protocol aims to change the way transactions are executed on EVM blockchains.

Instead of users executing a transaction directly - they first create a "transaction request". This request contains all the
data for executing the blockchain transaction as well as optional metadata - e.g. who created the transaction, decribing the contract
being executed on and the function call itself, etc...

This transaction request is *non ephemeral* meaning it doens't 
expire and can theoretically be executed mutliple times. This
creates a lot of advantages in comparison to clasicall transaction environment. Some notable examples include:

* **Organization transaction management**: One or a few people in the organization have Ledgers or access to master private keys. A lot more people are tasked with actually building transactions (e.g. payroll management - "accounting" creates transactions, management executes them). 
* **Multi-device transaction management**: Each user can select their own way of getting transaction requests. If you have a wallet on your smartphone, but use Web3 on your PC - you can receive the transaction request through SMS, Email or other methods, execute it on the mobile phone and continue using your Web3 app on the PC
* **Transaction Chaining**: The transaction request doesn't have to be a single transaction. It can be a list of transactions which are executed one after another (e.g. Approve → Spend). This transfers the UX burden of handling multiple dependend or independent transactions to the wallet instead of the Web3 app - leading to much less repetition in handling these common aspects of Web3 life.

## Fully decentralized

The transaction requests are generated on the frontend and pinned to IPFS through Filecoin. The frontend for executing the transactions is hosted on IFPS. The format to execute the transaction is:

ipfs://<frontend_hash>:<transaction_request_hash>

## Third party plugins

This implementation opens the posbility of building a very rich and vibrant third party plugin system. Some notable examples are:

* Simulating Transactions before Execution (Tenderly style)
* Decorating transcations with metadata (e.g. decribing the contract call, what it will do and potential dangers in human readable style)
* Transaction history/queueing
* Repeating the same transaction or chain of transactions on a scheduled basis (e.g. re-stake farms once a month)