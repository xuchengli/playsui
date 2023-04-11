const {
    JsonRpcProvider,
    localnetConnection,
} = require('@mysten/sui.js');
const { packageObjectId } = require('./config');

const provider = new JsonRpcProvider(localnetConnection);

(async () => {
    const subscriptionId = await provider.subscribeEvent({
        filter: { MoveModule: { package: packageObjectId, module: 'counter'} },
        onMessage(event) {
            console.log(event);
        },
    });
    console.log(subscriptionId);
})();
