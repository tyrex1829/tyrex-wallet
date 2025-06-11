import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import Button from "./ui/Button";
import bs58 from "bs58";
import WalletCard from "./ui/WalletCard";
import { PlusIcon, TrashIcon, WalletIcon } from "@heroicons/react/24/outline";

type Wallet = {
  mnemonic: string;
  path: string;
  publicKey: string;
  privateKey: string;
};

type Mnemonic = {
  mnemonic: string;
  resetMnemonic: () => void;
};

export function SolanaWallet({ mnemonic, resetMnemonic }: Mnemonic) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [index, setIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("solana_wallets");
    if (stored) {
      const parsed: Wallet[] = JSON.parse(stored);
      setWallets(parsed);
      setIndex(parsed.length); // continue from next index
    }
  }, []);

  const generateWallet = async () => {
    setIsGenerating(true);
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${index}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secretKey);

      const newWallet: Wallet = {
        mnemonic,
        path,
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
      };

      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      setIndex(index + 1);
      localStorage.setItem("solana_wallets", JSON.stringify(updatedWallets));
    } catch (error) {
      console.error("Error generating wallet:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearWallets = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all wallets? This action cannot be undone."
      )
    ) {
      setWallets([]);
      setIndex(0);
      localStorage.removeItem("solana_wallets");
      localStorage.removeItem("mnemonic");
      resetMnemonic();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <WalletIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Solana Wallets
        </h2>
        <p className="text-gray-600">
          Manage your Solana wallet addresses derived from your seed phrase
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Button
          type="primary"
          onClick={generateWallet}
          disabled={isGenerating}
          size="lg"
        >
          <div className="flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>{isGenerating ? "Generating..." : "Add New Wallet"}</span>
          </div>
        </Button>

        {wallets.length > 0 && (
          <Button type="danger" onClick={clearWallets} size="lg">
            <div className="flex items-center space-x-2">
              <TrashIcon className="h-5 w-5" />
              <span>Clear All Wallets</span>
            </div>
          </Button>
        )}
      </div>

      {/* Wallets Display */}
      {wallets.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WalletIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No wallets yet
          </h3>
          <p className="text-gray-500 mb-6">
            Generate your first Solana wallet to get started
          </p>
          <Button
            type="primary"
            onClick={generateWallet}
            disabled={isGenerating}
          >
            <div className="flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>Generate First Wallet</span>
            </div>
          </Button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-8 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WalletIcon className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Total Wallets: {wallets.length}
                </span>
              </div>
              <div className="text-sm text-gray-600">Next Index: {index}</div>
            </div>
          </div>

          {/* Wallets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallets.map((wallet, i) => (
              <div
                key={i}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <WalletCard
                  publicKey={wallet.publicKey}
                  privateKey={wallet.privateKey}
                  i={i}
                />
              </div>
            ))}
          </div>

          {/* Add More Button (when wallets exist) */}
          <div className="text-center mt-8">
            <Button
              type="secondary"
              onClick={generateWallet}
              disabled={isGenerating}
            >
              <div className="flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>Add Another Wallet</span>
              </div>
            </Button>
          </div>
        </>
      )}

      {/* Security Notice */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-amber-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800">
              Security Reminder
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              All wallets are derived from your seed phrase. Keep your seed
              phrase secure and never share your private keys with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
