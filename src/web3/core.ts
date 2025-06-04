import * as anchor from '@coral-xyz/anchor';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ComputeBudgetProgram, Connection, PublicKey } from '@solana/web3.js';

export const connection = new Connection(process.env.VUE_APP_RPC_URL, 'confirmed');
export let authority: PublicKey;
export let provider: anchor.AnchorProvider;

export const connectWallet = async () => {
  try {
    const wallet = new PhantomWalletAdapter();
    await wallet.connect();

    authority = wallet.publicKey;
    provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: 'confirmed',
    });

    return authority.toBase58();
  } catch (error) {
    console.log('🚀 ~ connectWal ~ error:', error);
    throw error;
  }
};

export const sendTransaction = async (transaction) => {
  try {
    transaction.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 500000,
      }),
    );

    transaction.feePayer = authority;
    const { blockhash } = await provider.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const signature = await provider.sendAndConfirm(transaction);
    console.log('🚀 ~ sendTransaction ~ signature:', signature);

    return signature;
  } catch (err) {
    console.log('🚀 ~ sendTransaction ~ err:', err);
    throw err;
  }
};
