'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  const { connected } = useWallet();
  const { t, locale } = useI18n();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-warm-200 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Emoji Hero */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <span className="text-7xl animate-float" style={{ animationDelay: '0s' }}>🎨</span>
              <span className="text-7xl animate-float" style={{ animationDelay: '0.2s' }}>💝</span>
              <span className="text-7xl animate-float" style={{ animationDelay: '0.4s' }}>⛓️</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">{t.home.title}</span>
              <br />
              <span className="text-primary-800 text-2xl md:text-3xl lg:text-4xl">{t.home.subtitle}</span>
            </h1>

            {/* Key Message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8 shadow-lg border border-primary-100">
              <p className="text-xl md:text-2xl text-primary-800 font-semibold">
                {t.home.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-primary-600 max-w-xl mx-auto mb-10">
              {t.home.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {connected ? (
                <Link
                  href="/create"
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  ✨ {t.home.startButton}
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-primary-500 text-sm">{t.wallet.connectDesc}</p>
                  <WalletButton />
                </div>
              )}
            </div>

            {/* Devnet Notice */}
            <div className="mt-8 inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-sm">{t.network.devnetNote}</span>
              <a 
                href="https://faucet.solana.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 underline text-sm hover:text-green-800"
              >
                {t.network.getFreeSOL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 text-center">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">
                {t.home.features.emotion.title}
              </h3>
              <p className="text-primary-600">
                {t.home.features.emotion.desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 text-center">
              <div className="text-5xl mb-4">⛓️</div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">
                {t.home.features.permanent.title}
              </h3>
              <p className="text-primary-600">
                {t.home.features.permanent.desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">
                {t.home.features.private.title}
              </h3>
              <p className="text-primary-600">
                {t.home.features.private.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Appeal Section */}
      <section className="py-20 bg-gradient-to-b from-warm-50 to-warm-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🌟</div>
          <blockquote className="text-2xl md:text-3xl text-primary-800 font-medium italic mb-6">
            {locale === 'zh' 
              ? '"五年后，你会珍藏看到孩子画作时的那份感动。"'
              : '"Five years from now, you\'ll treasure reading what you felt when you saw your child\'s drawing."'
            }
          </blockquote>
          <p className="text-primary-500">
            {locale === 'zh' 
              ? '今天记录的情感，是明天最珍贵的回忆。'
              : 'The emotion you capture today becomes tomorrow\'s most precious memory.'
            }
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            {locale === 'zh' ? '开始珍藏记忆' : 'Start Preserving Memories Today'}
          </h2>
          <p className="text-lg text-primary-600 mb-8 max-w-xl mx-auto">
            {locale === 'zh' 
              ? '孩子每天都在成长，别让这些时光悄悄溜走。'
              : 'Your child is growing every day. Don\'t let these moments slip away.'
            }
          </p>
          {connected ? (
            <Link
              href="/create"
              className="inline-block px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              🎨 {t.home.startButton}
            </Link>
          ) : (
            <WalletButton />
          )}
        </div>
      </section>
    </div>
  );
}
