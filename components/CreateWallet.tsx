"use client";

import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWalletComponent";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CreateWallet = () => {
  const [inputSecretPhrase, setInputSecretPhrase] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic");
    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
    }
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (mnemonic === "") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Tyrex Wallet
            </h1>
            <p className="text-gray-600">
              Import an existing wallet or create a new one
            </p>
          </div>

          {/* Import Wallet Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Import Existing Wallet
            </h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your 12-word secret phrase"
                className="w-full h-14 px-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                value={inputSecretPhrase}
                onChange={(e) => setInputSecretPhrase(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="mt-4">
              <Button
                type="primary"
                onClick={() => {
                  if (inputSecretPhrase.trim()) {
                    setMnemonic(inputSecretPhrase.trim());
                    localStorage.setItem("mnemonic", inputSecretPhrase.trim());
                  }
                }}
                disabled={!inputSecretPhrase.trim()}
              >
                Import Wallet
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                OR
              </span>
            </div>
          </div>

          {/* Generate Wallet Section */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Create New Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Generate a new wallet with a secure 12-word phrase
            </p>
            <div className="max-w-sm mx-auto">
              <Button
                type="primary"
                onClick={async () => {
                  const mn = await generateMnemonic();
                  if (mn) {
                    setMnemonic(mn);
                    localStorage.setItem("mnemonic", mn);
                  }
                }}
              >
                Generate New Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mnemonic !== "") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Wallet Seed Phrase
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 text-center font-medium text-gray-800 shadow-sm border"
                  >
                    <span className="text-xs text-gray-500 block">
                      {index + 1}
                    </span>
                    <span className="text-sm">{word}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  ⚠️ Keep this phrase secure and never share it with anyone
                </p>
              </div>
            </div>
          </div>

          <SolanaWallet mnemonic={mnemonic} />
        </div>
      </div>
    );
  }
};

export default CreateWallet;
