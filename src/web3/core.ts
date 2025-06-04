import * as anchor from '@coral-xyz/anchor';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ComputeBudgetProgram, Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import Decimal from 'decimal.js';

import type { GdtcStaking } from './idl/gdtc_staking';

Decimal.set({ toExpNeg: -100, toExpPos: 100 });

export const connection = new Connection(process.env.VUE_APP_RPC_URL, 'confirmed');
export let authority: PublicKey;
export let provider: anchor.AnchorProvider;
export let stakingProgram: anchor.Program<GdtcStaking>;

export const movePointRight = (value, point) => {
  return new Decimal(value).times(new Decimal(10).pow(point)).toString();
};

export const movePointLeft = (value, point) => {
  return new Decimal(value).div(new Decimal(10).pow(point)).toString();
};

export const convertBN = (obj) => {
  if (obj && obj.toBase58) {
    return obj.toBase58();
  }

  if (BN.isBN(obj)) {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBN);
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertBN(value)]));
  }

  return obj;
};

export const toBN = (value) => {
  return new BN(value);
};

export const toBuffer = (value) => {
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64LE(BigInt(value));

  return buffer;
};

export const connectWallet = async () => {
  try {
    const wallet = new PhantomWalletAdapter();
    await wallet.connect();

    authority = wallet.publicKey;
    provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: 'confirmed',
    });
    stakingProgram = new anchor.Program(require('./idl/gdtc_staking.json'), provider);

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
