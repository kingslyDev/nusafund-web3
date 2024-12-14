  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import { Actor, HttpAgent } from '@dfinity/agent';
  import { idlFactory } from 'declarations/fundraising_icp_backend/fundraising_icp_backend.did.js'; // Gunakan alias "declarations"
  import { canisterId } from 'declarations/fundraising_icp_backend/index.js'; // Gunakan alias "declarations"

  export function cn(...inputs) {
    return twMerge(clsx(inputs));
  }

  // Konfigurasi Actor untuk interaksi dengan backend canister
  const agent = new HttpAgent({ host: 'http://localhost:4943' }); // Gunakan host lokal saat pengembangan

  // Hanya untuk pengembangan lokal, fetchRootKey diperlukan
  if (process.env.DFX_NETWORK !== 'ic') {
    agent.fetchRootKey().catch((err) => {
      console.warn('Unable to fetch root key. Check to ensure that your local replica is running.');
      console.error(err);
    });
  }

  // Membuat Actor untuk interaksi dengan backend canister
  export const fundraisingActor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
