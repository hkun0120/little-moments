import { MemoryFormData } from '@/components/MemoryForm';

export interface MemoryMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  memory: {
    recorded_at: string;
    location: string | null;
    parent_feeling: string;
    child_words: string | null;
    context: string | null;
  };
}

export function generateMetadata(
  imageUri: string,
  formData: MemoryFormData,
  memoryNumber: number = 1
): MemoryMetadata {
  const currentTime = new Date().toISOString();
  const year = new Date().getFullYear().toString();

  return {
    name: `Little Moments #${String(memoryNumber).padStart(6, '0')}`,
    description:
      'A precious memory of my child, recorded with love on the Solana blockchain. This is not about NFTs. It\'s about preserving emotions.',
    image: imageUri,
    external_url: 'https://little-moments.xyz',
    attributes: [
      {
        trait_type: 'Child Age',
        value: formData.childAge || 'Not specified',
      },
      {
        trait_type: 'Creation Type',
        value: 'Artwork',
      },
      {
        trait_type: 'Recorder',
        value: 'Parent',
      },
      {
        trait_type: 'Mint Year',
        value: year,
      },
    ],
    memory: {
      recorded_at: currentTime,
      location: formData.location || null,
      parent_feeling: formData.parentFeeling,
      child_words: formData.childWords || null,
      context: formData.context || null,
    },
  };
}

export function validateMetadata(metadata: MemoryMetadata): boolean {
  // parent_feeling is required
  if (!metadata.memory.parent_feeling || metadata.memory.parent_feeling.trim().length === 0) {
    return false;
  }

  // image URI is required
  if (!metadata.image) {
    return false;
  }

  return true;
}
