const {
    JsonRpcProvider,
    // localnetConnection,
    devnetConnection,
    Connection,
} = require('@mysten/sui.js');
const { packageObjectId } = require('./config');

// const provider = new JsonRpcProvider(localnetConnection);

// const connection = new Connection({
//     fullnode: 'http://39.107.236.62:9000',
// });
// const provider = new JsonRpcProvider(connection);

const provider = new JsonRpcProvider(devnetConnection);

const subEvent = async (pkg, module) => {
    console.log('startup subscribe...');

    const subscriptionId = await provider.subscribeEvent({
        filter: { MoveModule: { package: pkg, module} },
        onMessage(event) {
            console.log(event);
        },
    });
    console.log('startup subscribe...', subscriptionId);

    setTimeout(async (pkg, module) => {
        if (subscriptionId) {
            console.log('remove subscription>>>>>', await provider.unsubscribeEvent({ id: subscriptionId }));
        }
        await subEvent(pkg, module);
    }, 20000, pkg, module);
}

(async () => {
    await subEvent(packageObjectId, 'counter');

    /*
    const subscriptionId = await provider.subscribeEvent({
        filter: { MoveModule: { package: packageObjectId, module: 'counter'} },
        onMessage(event) {
            console.log(event);
        },
    });
    console.log(subscriptionId);
    */
})();
