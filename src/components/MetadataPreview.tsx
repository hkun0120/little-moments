'use client';

import { FC } from 'react';
import { MemoryFormData } from './MemoryForm';

interface MetadataPreviewProps {
  imagePreview: string | null;
  formData: MemoryFormData;
  onConfirm: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const MetadataPreview: FC<MetadataPreviewProps> = ({
  imagePreview,
  formData,
  onConfirm,
  onBack,
  isLoading,
}) => {
  const currentTime = new Date().toISOString();

  const metadata = {
    name: `Little Moments Memory`,
    description: 'A precious memory of my child, recorded with love.',
    image: 'ipfs://[will be uploaded]',
    external_url: 'https://little-moments.xyz',
    attributes: [
      { trait_type: 'Child Age', value: formData.childAge || 'Not specified' },
      { trait_type: 'Creation Type', value: 'Artwork' },
      { trait_type: 'Recorder', value: 'Parent' },
      { trait_type: 'Mint Year', value: new Date().getFullYear().toString() },
    ],
    memory: {
      recorded_at: currentTime,
      location: formData.location || 'Not specified',
      parent_feeling: formData.parentFeeling,
      child_words: formData.childWords || null,
      context: formData.context || null,
    },
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Preview Header */}
      <div className="text-center">
        <span className="text-5xl">🔮</span>
        <h2 className="text-2xl font-bold text-primary-800 mt-4">
          Preview Your Memory
        </h2>
        <p className="text-primary-500 mt-2">
          This is how your memory will be preserved forever on Solana
        </p>
      </div>

      {/* Memory Card Preview */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-primary-100">
        {/* Image Section */}
        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Artwork"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-primary-600">
              📅 {new Date().toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Parent Feeling - The Star */}
          <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-xl p-4 border-l-4 border-primary-400">
            <p className="text-xs text-primary-500 font-medium mb-2">
              💝 PARENT'S FEELING
            </p>
            <p className="text-lg text-primary-800 italic leading-relaxed">
              "{formData.parentFeeling}"
            </p>
          </div>

          {/* Child's Words */}
          {formData.childWords && (
            <div className="bg-soft-blue rounded-xl p-4">
              <p className="text-xs text-blue-500 font-medium mb-2">
                💬 CHILD SAID
              </p>
              <p className="text-primary-700">"{formData.childWords}"</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {formData.location && (
              <div className="bg-soft-green rounded-lg p-3">
                <span className="text-green-600 font-medium">📍 Location</span>
                <p className="text-primary-700">{formData.location}</p>
              </div>
            )}
            {formData.childAge && (
              <div className="bg-soft-purple rounded-lg p-3">
                <span className="text-purple-600 font-medium">👶 Age</span>
                <p className="text-primary-700">{formData.childAge}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Metadata */}
      <details className="bg-gray-50 rounded-xl p-4">
        <summary className="cursor-pointer text-gray-600 font-medium">
          🔧 View Technical Metadata (JSON)
        </summary>
        <pre className="mt-4 text-xs bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(metadata, null, 2)}
        </pre>
      </details>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all disabled:opacity-50"
        >
          ← Back to Edit
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Minting on Solana...
            </>
          ) : (
            '🚀 Mint Memory NFT'
          )}
        </button>
      </div>

      {/* Cost Notice */}
      <p className="text-center text-sm text-primary-400">
        ⚡ Powered by Solana • Minimal gas fees (~0.01 SOL)
      </p>
    </div>
  );
};
