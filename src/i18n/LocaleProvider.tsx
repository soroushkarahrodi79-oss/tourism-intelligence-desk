import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UI_STRINGS, UiStringPath, resolveUiString } from './ui';

export type Locale = 'en' | 'es';

const STORAGE_KEY = 'tid-language';

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'es';
}

function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // localStorage may be unavailable (private mode, blocked storage, etc.)
  }
  return 'en';
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore write failures — locale still works for this session.
  }
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: UiStringPath) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      // document may be unavailable in non-DOM test environments.
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const t = useCallback((path: UiStringPath) => resolveUiString(UI_STRINGS, path, locale), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

export function useTranslation(): LocaleContextValue {
  return useLocale();
}
