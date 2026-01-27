'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useI18n, LanguageSwitcher } from './I18nProvider';
import { WalletButton } from './WalletButton';

export const Header: FC = () => {
  const { connected } = useWallet();
  const { t } = useI18n();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-50/80 backdrop-blur-md border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎨</span>
            <div>
              <h1 className="text-xl font-bold gradient-text">{t.home.title}</h1>
              <p className="text-xs text-primary-600">{t.home.subtitle}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-primary-700 hover:text-primary-500 transition-colors font-medium"
            >
              {t.nav.home}
            </Link>
            {connected && (
              <>
                <Link
                  href="/create"
                  className="text-primary-700 hover:text-primary-500 transition-colors font-medium"
                >
                  {t.nav.create}
                </Link>
                <Link
                  href="/gallery"
                  className="text-primary-700 hover:text-primary-500 transition-colors font-medium"
                >
                  {t.nav.gallery}
                </Link>
              </>
            )}
          </nav>

          {/* Right Side: Network Badge + Language Switcher + Wallet */}
          <div className="flex items-center space-x-3">
            {/* Network Badge */}
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{t.network.devnet}</span>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};
