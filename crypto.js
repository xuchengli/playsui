const {
    Ed25519Keypair,
    fromB64,
    PRIVATE_KEY_SIZE,
    JsonRpcProvider,
    devnetConnection,
    RawSigner,
} = require('@mysten/sui.js');

(async() => {
    try {
        const raw = fromB64('AJbGDdeB8a8Twft2sPDeWm+zAuS605oaMh7FIo8ki+TH');
        if (raw[0] !== 0 || raw.length !== PRIVATE_KEY_SIZE + 1) {
            throw new Error('invalid key');
        }
        const keypair = Ed25519Keypair.fromSecretKey(raw.slice(1));
        const provider = new JsonRpcProvider(devnetConnection);
        const signer = new RawSigner(keypair, provider);

        const address = await signer.getAddress();
        console.log('address: ', address);

        const objects = await provider.getOwnedObjects({
            owner: address,
            options: {
                showContent: true,
                showType: true,
            },
        });
        const pledges = objects.data.filter(object => object.data.type.includes('liquidity_pool::Pledge'));
        console.log(JSON.stringify(pledges, null, 2));
    } catch (err) {
        console.error(err.message);
    }
})();
