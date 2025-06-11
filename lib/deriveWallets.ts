import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import * as ed25519 from "ed25519-hd-key";

export interface WalletData {
  mnemonic: string;
  path: string;
  privateKey: string;
  publicKey: string;
}

export const deriveWalletsFromMnemonic = async (
  mnemonic: string,
  numberOfAccounts = 3
): Promise<WalletData[]> => {
  const wallets: WalletData[] = [];

  for (let i = 0; i < numberOfAccounts; i++) {
    const path = `m/44'/501'/0'/${i}'`;
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const derivedSeed = ed25519.derivePath(path, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    wallets.push({
      mnemonic,
      path,
      privateKey: Buffer.from(keypair.secretKey).toString("base64"),
      publicKey: keypair.publicKey.toBase58(),
    });
  }

  return wallets;
};
