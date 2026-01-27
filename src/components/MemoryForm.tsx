'use client';

import { FC, useState } from 'react';
import { useI18n } from './I18nProvider';

export interface MemoryFormData {
  parentFeeling: string;
  childWords: string;
  context: string;
  location: string;
  childAge: string;
}

interface MemoryFormProps {
  onSubmit: (data: MemoryFormData) => void;
  isLoading?: boolean;
}

export const MemoryForm: FC<MemoryFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<MemoryFormData>({
    parentFeeling: '',
    childWords: '',
    context: '',
    location: '',
    childAge: '',
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 280;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'parentFeeling') {
      if (value.length <= maxChars) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.parentFeeling.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Parent Feeling - Most Important Field */}
      <div className="bg-gradient-to-r from-primary-50 to-warm-100 rounded-2xl p-6 border-2 border-primary-200">
        <label className="block text-lg font-semibold text-primary-800 mb-2">
          💝 {t.form.myFeeling}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <p className="text-sm text-primary-500 mb-3">
          {t.form.myFeelingDesc}
        </p>
        <textarea
          name="parentFeeling"
          value={formData.parentFeeling}
          onChange={handleChange}
          placeholder={t.form.myFeelingPlaceholder}
          className="w-full h-32 px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none text-primary-800 placeholder-primary-300"
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-primary-400">
            {t.form.myFeelingNote}
          </p>
          <span
            className={`text-sm font-medium ${
              charCount >= maxChars ? 'text-red-500' : 'text-primary-400'
            }`}
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      {/* Child's Words */}
      <div className="bg-soft-blue rounded-2xl p-6">
        <label className="block text-lg font-semibold text-primary-800 mb-2">
          💬 {t.form.childWords}
        </label>
        <p className="text-sm text-primary-500 mb-3">
          {t.form.childWordsDesc}
        </p>
        <input
          type="text"
          name="childWords"
          value={formData.childWords}
          onChange={handleChange}
          placeholder={t.form.childWordsPlaceholder}
          className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-primary-800 placeholder-primary-300"
        />
      </div>

      {/* Context & Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-soft-green rounded-2xl p-5">
          <label className="block font-semibold text-primary-800 mb-2">
            📍 {t.form.location}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t.form.locationPlaceholder}
            className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-primary-800 placeholder-primary-300"
          />
        </div>

        <div className="bg-soft-purple rounded-2xl p-5">
          <label className="block font-semibold text-primary-800 mb-2">
            👶 {t.form.childAge}
          </label>
          <input
            type="text"
            name="childAge"
            value={formData.childAge}
            onChange={handleChange}
            placeholder={t.form.childAgePlaceholder}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all text-primary-800 placeholder-primary-300"
          />
        </div>
      </div>

      {/* Context */}
      <div className="bg-soft-yellow rounded-2xl p-6">
        <label className="block text-lg font-semibold text-primary-800 mb-2">
          📝 {t.form.context}
        </label>
        <p className="text-sm text-primary-500 mb-3">
          {t.form.contextDesc}
        </p>
        <input
          type="text"
          name="context"
          value={formData.context}
          onChange={handleChange}
          placeholder={t.form.contextPlaceholder}
          className="w-full px-4 py-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all text-primary-800 placeholder-primary-300"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formData.parentFeeling.trim() || isLoading}
        className={`
          w-full py-4 px-8 rounded-xl font-bold text-lg
          transition-all duration-300 transform
          ${
            formData.parentFeeling.trim() && !isLoading
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.create.minting}
          </span>
        ) : (
          t.form.previewMint
        )}
      </button>
    </form>
  );
};
