import { PublicKey } from '@solana/web3.js';

import { convertBN, stakingProgram } from './core';

const STAKING_PROGRAM_ID = new PublicKey(process.env.VUE_APP_STAKING_PROGRAM_ID);

const [STAKING_INSTANCE] = PublicKey.findProgramAddressSync(
  [Buffer.from('staking_instance')],
  STAKING_PROGRAM_ID,
);

export const fetchStakingInstance = async () => {
  const bnResponse = await stakingProgram.account.stakingInstance.fetch(STAKING_INSTANCE);

  return convertBN(bnResponse);
};
