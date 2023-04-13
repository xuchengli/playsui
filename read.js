const {
    JsonRpcProvider,
    // localnetConnection,
    Connection,
} = require('@mysten/sui.js');
const { packageObjectId } = require('./config');

// const provider = new JsonRpcProvider(localnetConnection);

const connection = new Connection({
    fullnode: 'http://39.107.236.62:9000',
});
const provider = new JsonRpcProvider(connection);

(async () => {
    const txn = await provider.getObject({
        id: packageObjectId,
        options: {
            showContent: true,
        },
    });
    console.log(txn);
})();
