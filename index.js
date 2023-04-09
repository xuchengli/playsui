const { JsonRpcProvider, localnetConnection } = require('@mysten/sui.js');

// connect to local RPC server
const provider = new JsonRpcProvider(localnetConnection);

(async () => {
    // get tokens from the local faucet server
    const gasObjects = await provider.requestSuiFromFaucet(
      '0xabf81ad9dfc1265343371b34204a74526add444603773afa4d01d34093fe2d5c',
    );

    console.log(gasObjects);
})();
