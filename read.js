const {
    JsonRpcProvider,
    localnetConnection,
} = require('@mysten/sui.js');
const { packageObjectId } = require('./config');

const provider = new JsonRpcProvider(localnetConnection);

(async () => {
    const txn = await provider.getObject({
        id: packageObjectId,
        options: {
            showContent: true,
        },
    });
    console.log(txn);
})();
