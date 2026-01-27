'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useI18n } from './I18nProvider';

export const WalletButton: FC = () => {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const { t, locale } = useI18n();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (connected) {
      setShowDropdown(!showDropdown);
    } else {
      setVisible(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDropdown(false);
  };

  // 格式化地址
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleClick}
        disabled={connecting}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all
          bg-gradient-to-r from-primary-500 to-primary-600 text-white
          hover:from-primary-600 hover:to-primary-700
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-md hover:shadow-lg"
      >
        {connecting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>{locale === 'zh' ? '连接中...' : 'Connecting...'}</span>
          </>
        ) : connected && publicKey ? (
          <>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>{formatAddress(publicKey.toString())}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>{locale === 'zh' ? '选择钱包' : 'Select Wallet'}</span>
          </>
        )}
      </button>

      {/* 下拉菜单 */}
      {showDropdown && connected && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-primary-100 py-2 z-50">
          <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
            {locale === 'zh' ? '已连接' : 'Connected'}
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span>{locale === 'zh' ? '断开连接' : 'Disconnect'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
