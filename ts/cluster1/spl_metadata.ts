import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("4HAEFWasey2Qme7BYSuFU9FT2Jqbwnm4pj3j1xgJaxhU")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
        }
        let data: DataV2Args = {
            name: "My Money Maker",
            symbol: "huha",
            uri: "",
            sellerFeeBasisPoints: 0, // 0% royalty
            creators: null, // No creators for this example
            collection: null, // No collection for this example
            uses: null // No uses for this example
        }
        
        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true, 
            collectionDetails: null, 
            
        }
        
        let tx = createMetadataAccountV3(
             umi,
                 {
                 ...accounts,
                 ...args
            }
         )

         let result = await tx.sendAndConfirm(umi);
         console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
