'use client';

import { FC } from 'react';

interface MemoryCardProps {
  id: string;
  imageUrl: string;
  parentFeeling: string;
  childWords?: string;
  childAge?: string;
  location?: string;
  recordedAt: string;
  mintAddress?: string;
  onClick?: () => void;
}

export const MemoryCard: FC<MemoryCardProps> = ({
  imageUrl,
  parentFeeling,
  childWords,
  childAge,
  recordedAt,
  onClick,
}) => {
  const formattedDate = new Date(recordedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="memory-card bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border border-primary-100 hover:border-primary-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt="Memory artwork"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <p className="text-white text-xs font-medium">{formattedDate}</p>
        </div>
        {childAge && (
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-primary-600">
            👶 {childAge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Parent Feeling */}
        <div className="bg-primary-50 rounded-lg p-3">
          <p className="text-xs text-primary-500 font-medium mb-1">💝</p>
          <p className="text-sm text-primary-800 italic line-clamp-3">
            "{parentFeeling}"
          </p>
        </div>

        {/* Child's Words */}
        {childWords && (
          <div className="bg-soft-blue rounded-lg p-2">
            <p className="text-xs text-blue-600 italic line-clamp-2">
              💬 "{childWords}"
            </p>
          </div>
        )}

        {/* Blockchain Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-green-600 font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            On-chain
          </span>
          <span className="text-xs text-primary-400">View Details →</span>
        </div>
      </div>
    </div>
  );
};
