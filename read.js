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

function sleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n * 1000);
}

async function querySuiEvents(moveModule, cursor = {}) {

    const filter = {
        query: { MoveModule: { ...moveModule } },
        limit: 10,
        order: 'ascending',
    };

    // 判断是否需要翻页
    if (Object.keys(cursor).length !== 0) {
        Object.assign(filter, { cursor });
    }

    // console.log('查询条件:', filter);

    return await provider.queryEvents(filter);
}

(async () => {
    /*
    const txn = await provider.getObject({
        id: packageObjectId,
        options: {
            showContent: true,
        },
    });
    console.log(txn);
    */

    let moveModules = [
        {
            package: '0x9d12400e7857afd7b7c7f2001680ca291c1b786e4cce77372fcaea5bf84bdf1d',
            module: 'counter',
            cursor: {},
        },
        {
            package: '0x3e521d6829ec4ef5c65a47b66635947892d4145f8bc8f598d779633cb8564cf0',
            module: 'counter',
            cursor: {},
        },
    ];
    setInterval(async() => {
        try {
            const querys = moveModules.map(async moveModule => {
                const { package, module, cursor } = moveModule;
                return await querySuiEvents({ package, module }, cursor);
            });
            const events = await Promise.all(querys);

            for ([i, event] of events.entries()) {
                console.log(event.data);

                moveModules[i].cursor = event.nextCursor;
            }
        } catch (err) {
            console.err(err);
        }
    }, 10000);
})();
