const {
    Ed25519Keypair,
    JsonRpcProvider,
    localnetConnection,
    RawSigner,
    TransactionBlock,
} = require('@mysten/sui.js');
const { packageObjectId, counterObjectId } = require('./config');

// Generate a new Keypair
const keypair = new Ed25519Keypair();
const provider = new JsonRpcProvider(localnetConnection);
const signer = new RawSigner(keypair, provider);

(async () => {
    // 先获取sui
    const gasObjects = await signer.requestSuiFromFaucet();
    console.log('1. 获取sui');
    console.log('===============================');
    console.log(gasObjects);

    // 调合约
    const tx = new TransactionBlock();
    tx.setGasBudget(10000000000);
    tx.moveCall({
        target: `${packageObjectId}::counter::incr`,
        arguments: [tx.object(`${counterObjectId}`)],
    });
    const result = await signer.signAndExecuteTransactionBlock({
        transactionBlock: tx,
    });
    console.log('2. 调用合约');
    console.log('===============================');
    console.log({result});
})();
