const { JsonRpcProvider, testnetConnection } = require('@mysten/sui.js');

const provider = new JsonRpcProvider(testnetConnection);

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

(async () => {
    /*
    const txn = await provider.getObject({
        id: '0x5b77ec28a4077acb46e27e2421aa36b6bbdbe14b4165bc8a7024f10f0fde6112',
        options: {
            showContent: true,
            showType: true,
        },
    });
    console.log(JSON.stringify(txn, null, 2));
    */
    /*
    const events = await provider.queryEvents({
        query: {
            MoveModule: {
                package: '0x5b77ec28a4077acb46e27e2421aa36b6bbdbe14b4165bc8a7024f10f0fde6112',
                module: 'config_script',
            },
        },
        limit: 10,
        order: 'ascending',
    });
    console.log(JSON.stringify(events, null, 2));
    */
    /*
    const checkpoints = await provider.getCheckpoints({
        descendingOrder: false,
        limit: 10,
    });
    console.log(JSON.stringify(checkpoints, null, 2));
    */
    const checkpoint = await provider.getCheckpoint({ id: '2212103' });
    // console.log(JSON.stringify(checkpoint, null, 2));

    const events = [];

    while (checkpoint.transactions.length > 0) {
        const querys = checkpoint.transactions.splice(0, 10).map(async transaction => {
            return await provider.queryEvents({
                query: { Transaction: transaction },
            });
        });
        (await Promise.all(querys)).forEach(event => {
            events.push(...event.data);
        });

        await sleep(1);
    }

    const specificEvents = events.filter(event => event.packageId === '0x5b77ec28a4077acb46e27e2421aa36b6bbdbe14b4165bc8a7024f10f0fde6112');
    
    console.log(JSON.stringify(specificEvents, null, 2));
})();