'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Locale, Translations, getTranslations } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh'); // 默认中文
  const [t, setT] = useState<Translations>(getTranslations('zh'));

  // 初始化时从 localStorage 读取
  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLocaleState(saved);
      setT(getTranslations(saved));
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setT(getTranslations(newLocale));
    localStorage.setItem('locale', newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    setLocale(newLocale);
  }, [locale, setLocale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// 语言切换按钮组件
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, toggleLocale } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 transition-all text-sm font-medium ${className}`}
      title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span className="text-base">🌐</span>
      <span>{locale === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}
