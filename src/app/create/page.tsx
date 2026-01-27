'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ImageUpload } from '@/components/ImageUpload';
import { MemoryForm, MemoryFormData } from '@/components/MemoryForm';
import { MetadataPreview } from '@/components/MetadataPreview';
import { MintSuccess } from '@/components/MintSuccess';
import { AIAnalysisResult } from '@/components/AIAnalysisResult';
import { useI18n } from '@/components/I18nProvider';
import { generateMetadata } from '@/lib/metadata';
import { uploadImage, uploadMetadata } from '@/lib/ipfs';
import { mintMemoryNFT, saveMemoryLocally } from '@/lib/solana';
import { analyzeArtwork, ArtworkAnalysis } from '@/lib/ai';

type Step = 'upload' | 'form' | 'preview' | 'success';

export default function CreatePage() {
  const { connected, publicKey } = useWallet();
  const wallet = useWallet();
  const { t } = useI18n();

  const [step, setStep] = useState<Step>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemoryFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mintResult, setMintResult] = useState<{
    signature: string;
    mintAddress: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // AI 分析状态
  const [aiAnalysis, setAiAnalysis] = useState<ArtworkAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = useCallback(
    async (file: File | null, preview: string | null) => {
      setImageFile(file);
      setImagePreview(preview);
      
      if (file && preview) {
        setStep('form');
        
        // 触发 AI 分析
        setIsAnalyzing(true);
        setAiAnalysis(null);
        
        try {
          const analysis = await analyzeArtwork(preview);
          setAiAnalysis(analysis);
        } catch (err) {
          console.error('AI analysis failed:', err);
        } finally {
          setIsAnalyzing(false);
        }
      }
    },
    []
  );

  const handleFormSubmit = useCallback((data: MemoryFormData) => {
    setFormData(data);
    setStep('preview');
  }, []);

  const handleMint = async () => {
    if (!imageFile || !formData || !publicKey) return;

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Upload image to IPFS
      const imageUri = await uploadImage(imageFile as unknown as File);
      console.log('Image uploaded:', imageUri);

      // Step 2: Generate metadata
      const memoryNumber = Date.now() % 1000000; // Simple number generation
      const metadata = generateMetadata(imageUri, formData, memoryNumber);
      console.log('Metadata generated:', metadata);

      // Step 3: Upload metadata to IPFS
      const metadataUri = await uploadMetadata(metadata);
      console.log('Metadata uploaded:', metadataUri);

      // Step 4: Mint NFT on Solana
      const result = await mintMemoryNFT(wallet, metadataUri, metadata.name);

      if (result.success && result.signature && result.mintAddress) {
        // Save locally for gallery
        saveMemoryLocally(publicKey.toString(), {
          id: result.mintAddress,
          imageUrl: imagePreview,
          parentFeeling: formData.parentFeeling,
          childWords: formData.childWords,
          childAge: formData.childAge,
          location: formData.location,
          context: formData.context,
          recordedAt: new Date().toISOString(),
          mintAddress: result.mintAddress,
          signature: result.signature,
        });

        setMintResult({
          signature: result.signature,
          mintAddress: result.mintAddress,
        });
        setStep('success');
      } else {
        throw new Error(result.error || 'Minting failed');
      }
    } catch (err: any) {
      console.error('Minting error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'preview') {
      setStep('form');
    } else if (step === 'form') {
      setStep('upload');
    }
  };

  const resetFlow = () => {
    setStep('upload');
    setImageFile(null);
    setImagePreview(null);
    setFormData(null);
    setMintResult(null);
    setError(null);
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-2xl font-bold text-primary-800 mb-4">
            {t.wallet.connect}
          </h1>
          <p className="text-primary-600 mb-6">
            {t.wallet.connectDesc}
          </p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <StepIndicator
                number={1}
                label={t.create.uploadTitle}
                active={step === 'upload'}
                completed={step !== 'upload'}
              />
              <div className="w-12 h-0.5 bg-primary-200"></div>
              <StepIndicator
                number={2}
                label={t.form.myFeeling}
                active={step === 'form'}
                completed={step === 'preview'}
              />
              <div className="w-12 h-0.5 bg-primary-200"></div>
              <StepIndicator
                number={3}
                label={t.create.mintButton}
                active={step === 'preview'}
                completed={false}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-500 text-sm underline mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step Content */}
        {step === 'upload' && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-800 mb-2">
                {t.create.title}
              </h1>
              <p className="text-primary-600">
                {t.create.uploadDesc}
              </p>
            </div>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>
        )}

        {step === 'form' && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-800 mb-2">
                {t.create.formTitle}
              </h1>
              <p className="text-primary-600">
                {t.create.formDesc}
              </p>
            </div>

            {/* Small image preview */}
            {imagePreview && (
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-auto rounded-xl shadow-md"
                  />
                  <button
                    onClick={handleBack}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-primary-500 hover:text-primary-700"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            )}

            {/* AI 分析结果 - 提供描述和反思提示，不建议具体感受 */}
            <div className="mb-6">
              <AIAnalysisResult
                analysis={aiAnalysis}
                isLoading={isAnalyzing}
              />
            </div>

            <MemoryForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading}
            />
          </div>
        )}

        {step === 'preview' && formData && (
          <MetadataPreview
            imagePreview={imagePreview}
            formData={formData}
            onConfirm={handleMint}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {step === 'success' && mintResult && (
          <MintSuccess
            signature={mintResult.signature}
            mintAddress={mintResult.mintAddress}
            imagePreview={imagePreview}
            parentFeeling={formData?.parentFeeling || ''}
          />
        )}
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold
          ${
            active
              ? 'bg-primary-500 text-white'
              : completed
              ? 'bg-green-500 text-white'
              : 'bg-primary-100 text-primary-400'
          }
        `}
      >
        {completed ? '✓' : number}
      </div>
      <span
        className={`text-xs mt-1 ${
          active ? 'text-primary-700 font-medium' : 'text-primary-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
