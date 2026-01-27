'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useI18n } from './I18nProvider';

interface MintSuccessProps {
  signature: string;
  mintAddress: string;
  imagePreview: string | null;
  parentFeeling: string;
}

export const MintSuccess: FC<MintSuccessProps> = ({
  signature,
  mintAddress,
  imagePreview,
  parentFeeling,
}) => {
  const { t, locale } = useI18n();
  const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

  return (
    <div className="text-center space-y-8 fade-in">
      {/* Success Animation */}
      <div className="relative">
        <div className="text-8xl animate-float">🎉</div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-4xl animate-ping">
          ✨
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-2">
          {t.success.title}
        </h2>
        <p className="text-primary-500">
          {t.success.subtitle}
        </p>
      </div>

      {/* Memory Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-primary-100 max-w-md mx-auto">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Minted Artwork"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-xl p-4 border-l-4 border-primary-400">
            <p className="text-xs text-primary-500 font-medium mb-2">
              💝 {t.success.memoryPreserved}
            </p>
            <p className="text-primary-800 italic">"{parentFeeling}"</p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left space-y-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">{t.gallery.mintAddress}</p>
          <p className="text-sm font-mono text-primary-700 break-all">
            {mintAddress}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Transaction</p>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-blue-600 hover:text-blue-700 break-all underline"
          >
            {t.success.viewOnChain} →
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Link
          href="/gallery"
          className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl text-center"
        >
          📚 {t.success.backToGallery}
        </Link>
        <Link
          href="/create"
          className="flex-1 py-4 px-6 rounded-xl font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all text-center"
        >
          ➕ {t.success.createAnother}
        </Link>
      </div>

      {/* Share prompt */}
      <div className="bg-soft-yellow rounded-xl p-4 max-w-md mx-auto">
        <p className="text-sm text-primary-700">
          🌟 <strong>{locale === 'zh' ? '提示：' : 'Tip:'}</strong> 
          {locale === 'zh' 
            ? '把这份记忆分享给未来的自己。多年后，你会感谢今天的决定。'
            : 'Share this moment with your future self. Years from now, you\'ll be glad you did.'
          } 
          you'll be grateful you preserved this feeling.
        </p>
      </div>
    </div>
  );
};
