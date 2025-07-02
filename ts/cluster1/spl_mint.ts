import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("4HAEFWasey2Qme7BYSuFU9FT2Jqbwnm4pj3j1xgJaxhU");

(async () => {
    try {
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        );
        console.log(`Associated Token Account: ${ata.address.toBase58()}`);

        //mint tokens to the associated token account
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair.publicKey,
            100n * token_decimals, // Minting 100 tokens, adjust as needed
        );
        console.log(`Minted tokens successfully! Transaction: ${mintTx}`);
    }
    catch (e) {
        console.log(`Something went wrong: ${e}`);
    }
})();