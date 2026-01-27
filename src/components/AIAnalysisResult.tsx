'use client';

import { FC } from 'react';
import { ArtworkAnalysis } from '@/lib/ai';
import { useI18n } from './I18nProvider';

interface AIAnalysisResultProps {
  analysis: ArtworkAnalysis | null;
  isLoading: boolean;
}

export const AIAnalysisResult: FC<AIAnalysisResultProps> = ({
  analysis,
  isLoading,
}) => {
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-bounce">🤖</div>
          <div>
            <p className="font-medium text-purple-800">{t.ai.analyzing}</p>
            <p className="text-sm text-purple-500">{t.ai.analyzingDesc}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-purple-100 rounded animate-pulse"></div>
          <div className="h-4 bg-purple-100 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-purple-100 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 space-y-4 fade-in">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl">🤖✨</span>
        <h3 className="font-bold text-purple-800">{t.ai.title}</h3>
        <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
          智谱 GLM
        </span>
      </div>

      {/* Description */}
      <div className="bg-white/60 rounded-xl p-4">
        <p className="text-sm text-purple-600 font-medium mb-1">🎨 {t.ai.artworkDesc}</p>
        <p className="text-purple-900">{analysis.description}</p>
      </div>

      {/* Child's Perspective */}
      <div className="bg-white/60 rounded-xl p-4">
        <p className="text-sm text-pink-600 font-medium mb-1">👶 {t.ai.childPerspective}</p>
        <p className="text-purple-800 italic text-sm">{analysis.childPerspective}</p>
      </div>

      {/* Memory Anchors */}
      {analysis.memoryAnchors && analysis.memoryAnchors.length > 0 && (
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-sm text-orange-600 font-medium mb-3">📍 {t.ai.memoryAnchors}</p>
          <p className="text-xs text-orange-500 mb-2">{t.ai.memoryAnchorsDesc}</p>
          <div className="space-y-2">
            {analysis.memoryAnchors.map((anchor, index) => (
              <div
                key={index}
                className="bg-orange-50 rounded-lg px-3 py-2 text-sm text-orange-700 border border-orange-100"
              >
                {anchor}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotion Prompts */}
      <div className="bg-white/60 rounded-xl p-4">
        <p className="text-sm text-purple-600 font-medium mb-3">💝 {t.ai.emotionPrompts}</p>
        <p className="text-xs text-purple-500 mb-2">{t.ai.emotionPromptsDesc}</p>
        <div className="space-y-2">
          {analysis.emotionPrompts.map((prompt, index) => (
            <div
              key={index}
              className="bg-purple-100/50 rounded-lg px-3 py-2 text-sm text-purple-700 hover:bg-purple-100 transition-colors"
            >
              {prompt}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4 text-center">
        <p className="text-sm text-purple-700 font-medium">
          ✍️ {t.ai.writeNow}
        </p>
        <p className="text-xs text-purple-500 mt-1">
          {t.ai.writeNowDesc}
        </p>
      </div>
    </div>
  );
};
