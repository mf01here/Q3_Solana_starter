import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/62SqEfRrt8Bt88hiUc86d9jHttg6zdAA33Xu3ZemLtcU"
        const metadata = {
             name: "You got Rugged?",
             symbol: "YGR",
             description: "Hell yeah",
             image: image  ,
             attributes: [
                 {trait_type: 'nothing and everything', value: 'all'},
             ],
             properties: {
                 files: [
                     {
                         type: "image/png",
                         uri: "?"
                     },
                 ]
             },
             creators: []
         };
         const myUri = await umi.uploader.uploadJson(metadata);

         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
