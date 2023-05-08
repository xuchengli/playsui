const { JsonRpcProvider, localnetConnection, devnetConnection } = require('@mysten/sui.js');
const moment = require('moment');

// connect to local RPC server
// const provider = new JsonRpcProvider(localnetConnection);
const provider = new JsonRpcProvider(devnetConnection);

(async () => {
    // get tokens from the local faucet server
    const gasObjects = await provider.requestSuiFromFaucet(
      '0xe42d79acbbc17c214518bad150b0e6d47c111c2796b4069520b15158a3915217',
    );

    console.log(gasObjects);

    const now = moment(Number('1681798959688'));
    console.log(now.format('YYYY-MM-DD HH:mm:ss'));
})();
