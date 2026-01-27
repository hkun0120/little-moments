'use client';

import { FC, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageSelect: (file: File | null, preview: string | null) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPreview(result);
          onImageSelect(file, result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null, null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
            transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center
            ${
              isDragActive
                ? 'border-primary-400 bg-primary-50'
                : 'border-primary-200 hover:border-primary-300 bg-warm-50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="text-6xl mb-4 animate-float">🖼️</div>
          <p className="text-primary-700 font-medium text-lg mb-2">
            {isDragActive
              ? 'Drop the artwork here...'
              : "Drop your child's artwork here"}
          </p>
          <p className="text-primary-400 text-sm">
            or click to select a file (JPG, PNG, max 10MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-[400px] object-contain"
          />
          <button
            onClick={clearImage}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-primary-600 rounded-full p-2 shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-4 py-2 text-sm text-primary-600 font-medium">
            ✨ Beautiful artwork!
          </div>
        </div>
      )}
    </div>
  );
};
