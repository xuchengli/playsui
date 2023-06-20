const {
    JsonRpcProvider,
    devnetConnection,
} = require('@mysten/sui.js');

const provider = new JsonRpcProvider(devnetConnection);

(async () => {
    const txn = await provider.getTransactionBlock({
        digest: 'DpJgcfSfkZwwSk2mgkncUobzwd4aoDPSfZBkrUuN5VCv',
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });
    console.log(txn);
})();
