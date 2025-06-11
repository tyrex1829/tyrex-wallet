import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface WalletCardProps {
  publicKey: string;
  privateKey: string;
  i: number;
}

const WalletCard = ({ publicKey, privateKey, i }: WalletCardProps) => {
  const [showKey, setShowKey] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

  const copyToClipboard = async (text: string, type: "public" | "private") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "public") {
        setCopiedPublic(true);
        setTimeout(() => setCopiedPublic(false), 2000);
      } else {
        setCopiedPrivate(true);
        setTimeout(() => setCopiedPrivate(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const truncateKey = (key: string, length: number = 20) => {
    if (key.length <= length) return key;
    return `${key.slice(0, length / 2)}...${key.slice(-length / 2)}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">W{i + 1}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Wallet {i + 1}
          </h3>
        </div>
      </div>

      {/* Public Key Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Public Key
          </label>
          <button
            onClick={() => copyToClipboard(publicKey, "public")}
            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            {copiedPublic ? (
              <>
                <CheckIcon className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border">
          <code className="text-sm text-gray-800 break-all font-mono">
            {truncateKey(publicKey, 32)}
          </code>
        </div>
      </div>

      {/* Private Key Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Private Key
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(privateKey, "private")}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              {copiedPrivate ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardIcon className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowKey((prev) => !prev)}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-700 transition-colors"
            >
              {showKey ? (
                <>
                  <EyeSlashIcon className="h-4 w-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <EyeIcon className="h-4 w-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border">
          <code className="text-sm text-gray-800 break-all font-mono">
            {showKey ? privateKey : "•".repeat(64)}
          </code>
        </div>
      </div>

      {/* Security Warning */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          ⚠️ Never share your private key with anyone. Keep it secure!
        </p>
      </div>
    </div>
  );
};

export default WalletCard;
