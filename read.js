const {
    JsonRpcProvider,
    // localnetConnection,
    // Connection,
    devnetConnection,
} = require('@mysten/sui.js');
const { packageObjectId, clientAddress } = require('./config');

// const provider = new JsonRpcProvider(localnetConnection);

// const connection = new Connection({
//     fullnode: 'http://39.107.236.62:9000',
// });
// const provider = new JsonRpcProvider(connection);

const provider = new JsonRpcProvider(devnetConnection);

(async () => {
    const txn = await provider.getObject({
        id: packageObjectId,
        options: {
            showContent: true,
        },
    });
    console.log(txn);

    const events = await provider.queryEvents({
        query: { Sender: clientAddress },
        limit: 2,
    });
    console.log(events);
})();
