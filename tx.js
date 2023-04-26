const {
    JsonRpcProvider,
    devnetConnection,
} = require('@mysten/sui.js');

const provider = new JsonRpcProvider(devnetConnection);

(async () => {
    const txn = await provider.getTransactionBlock({
        digest: '9dC5jj9iqj3q9P7gJtLup51LZe3QbybfHNhbgMwLx2AB',
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });
    console.log(txn);
})();
