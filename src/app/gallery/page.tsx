'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { MemoryCard } from '@/components/MemoryCard';
import { fetchUserNFTs } from '@/lib/solana';
import Link from 'next/link';

interface Memory {
  id: string;
  imageUrl: string;
  parentFeeling: string;
  childWords?: string;
  childAge?: string;
  location?: string;
  context?: string;
  recordedAt: string;
  mintAddress?: string;
  signature?: string;
}

export default function GalleryPage() {
  const { connected, publicKey } = useWallet();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      loadMemories();
    } else {
      setIsLoading(false);
    }
  }, [connected, publicKey]);

  const loadMemories = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    try {
      const userMemories = await fetchUserNFTs(publicKey.toString());
      setMemories(userMemories);
    } catch (error) {
      console.error('Error loading memories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-2xl font-bold text-primary-800 mb-4">
            View Your Memories
          </h1>
          <p className="text-primary-600 mb-6">
            Connect your wallet to see your preserved memories
          </p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">🌀</div>
          <p className="text-primary-600">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            📚 My Memories
          </h1>
          <p className="text-primary-600 max-w-xl mx-auto">
            Each moment preserved here is a timestamp of love. 
            Years from now, these words will be your most treasured possessions.
          </p>
        </div>

        {memories.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎨</div>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              No memories yet
            </h2>
            <p className="text-primary-600 mb-8 max-w-md mx-auto">
              Start preserving your child's precious moments. 
              Each artwork tells a story that deserves to be remembered forever.
            </p>
            <Link
              href="/create"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              ✨ Create Your First Memory
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border border-primary-100">
                <p className="text-3xl font-bold text-primary-600">{memories.length}</p>
                <p className="text-sm text-primary-400">Total Memories</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md border border-primary-100">
                <p className="text-3xl font-bold text-primary-600">
                  {new Set(memories.map(m => m.childAge).filter(Boolean)).size || 1}
                </p>
                <p className="text-sm text-primary-400">Age Stages</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md border border-primary-100">
                <p className="text-3xl font-bold text-primary-600">
                  {memories.length > 0 ? new Date(memories[0].recordedAt).getFullYear() : '-'}
                </p>
                <p className="text-sm text-primary-400">First Memory</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md border border-primary-100">
                <p className="text-3xl font-bold text-green-600">∞</p>
                <p className="text-sm text-primary-400">Years Preserved</p>
              </div>
            </div>

            {/* Memory Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  {...memory}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </div>

            {/* Add More Button */}
            <div className="text-center mt-12">
              <Link
                href="/create"
                className="inline-block px-8 py-4 bg-primary-50 text-primary-600 font-bold rounded-xl hover:bg-primary-100 transition-all"
              >
                ➕ Add Another Memory
              </Link>
            </div>
          </>
        )}

        {/* Memory Detail Modal */}
        {selectedMemory && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={selectedMemory.imageUrl}
                alt="Memory"
                className="w-full h-64 object-cover rounded-t-3xl"
              />

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-400">
                    📅 {new Date(selectedMemory.recordedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  {selectedMemory.childAge && (
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      👶 {selectedMemory.childAge}
                    </span>
                  )}
                </div>

                {/* Parent Feeling */}
                <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-xl p-4 border-l-4 border-primary-400">
                  <p className="text-xs text-primary-500 font-medium mb-2">
                    💝 PARENT'S FEELING
                  </p>
                  <p className="text-lg text-primary-800 italic">
                    "{selectedMemory.parentFeeling}"
                  </p>
                </div>

                {/* Child Words */}
                {selectedMemory.childWords && (
                  <div className="bg-soft-blue rounded-xl p-4">
                    <p className="text-xs text-blue-500 font-medium mb-2">
                      💬 CHILD SAID
                    </p>
                    <p className="text-primary-700">"{selectedMemory.childWords}"</p>
                  </div>
                )}

                {/* Details */}
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.location && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      📍 {selectedMemory.location}
                    </span>
                  )}
                  {selectedMemory.context && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      📝 {selectedMemory.context}
                    </span>
                  )}
                </div>

                {/* Blockchain Info */}
                {selectedMemory.mintAddress && (
                  <div className="bg-gray-50 rounded-xl p-4 text-sm">
                    <p className="text-gray-500 mb-1">🔗 NFT Address</p>
                    <p className="font-mono text-xs text-gray-600 break-all">
                      {selectedMemory.mintAddress}
                    </p>
                    <a
                      href={`https://explorer.solana.com/address/${selectedMemory.mintAddress}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-xs mt-2 inline-block"
                    >
                      View on Solana Explorer →
                    </a>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="w-full py-3 bg-primary-100 text-primary-600 font-medium rounded-xl hover:bg-primary-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
