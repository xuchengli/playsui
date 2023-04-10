const {
    Ed25519Keypair,
    JsonRpcProvider,
    localnetConnection,
    RawSigner,
    TransactionBlock,
} = require('@mysten/sui.js');

// Generate a new Keypair
const keypair = new Ed25519Keypair();
const provider = new JsonRpcProvider(localnetConnection);
const signer = new RawSigner(keypair, provider);

const packageObjectId = '0x1bcc1bbea3855ffa14db94fce14d8873a0b9bff76a4f434d72f160c787262e02';
const counterObjectId = '0x75347e6c80cbbe55bfb2cfb1def96cdf11461078108bd717c341c89d459e1578';

(async () => {
    // 先获取sui
    const gasObjects = await signer.requestSuiFromFaucet();
    console.log('1. 获取sui');
    console.log('===============================');
    console.log(gasObjects);

    // 调合约
    const tx = new TransactionBlock();
    tx.setGasBudget(10000);
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
