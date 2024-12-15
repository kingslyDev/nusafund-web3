import { Principal } from '@dfinity/principal';

// Konfigurasi principal dan account tujuan pembayaran
export const recipientAccount = '850ea13c6a5c1f976f739bfec9a34af2915edbcf225fffabee1d9e1590d6abfc';

// Fungsi untuk memeriksa koneksi Plug Wallet
export const connectPlug = async () => {
  if (!window.ic || !window.ic.plug) {
    throw new Error('Plug Wallet tidak ditemukan. Pastikan Anda sudah menginstal Plug Wallet.');
  }

  const connected = await window.ic.plug.requestConnect();
  if (!connected) {
    throw new Error('Koneksi Plug Wallet ditolak oleh pengguna.');
  }

  // Mendaftarkan canister ID jika perlu
  await window.ic.plug.createAgent({
    whitelist: ['bkyz2-fmaaa-aaaaa-qaaaq-cai'], // Backend canister ID
    host: 'https://ic0.app',
  });

  return await window.ic.plug.agent.getPrincipal();
};

// Fungsi untuk melakukan pembayaran dengan Plug
export const makePayment = async (amount) => {
  const toAccount = recipientAccount;
  const fromAccount = await window.ic.plug.agent.getPrincipal().then((principal) => principal.toText());
  const transaction = {
    to: toAccount,
    from: fromAccount,
    amount, // Nominal pembayaran dalam ICP
  };

  // Simulasikan transaksi atau gunakan API Plug jika ada
  console.log('Processing transaction:', transaction);

  return {
    success: true,
    transactionHash: 'dummy-transaction-hash-' + Date.now(), // Ganti dengan hash transaksi nyata jika API Plug mendukung
  };
};
