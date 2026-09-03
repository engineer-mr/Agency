import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import zh from './locales/zh.json'
import en from './locales/en.json'
import type { Language } from './types'

type LocaleTree = Record<string, any>

type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const localeMap: Record<Language, LocaleTree> = {
  zh,
  en,
}

const I18nContext = createContext<I18nContextValue | null>(null)

function lookup(locale: LocaleTree, key: string) {
  return key.split('.').reduce<any>((value, segment) => (value && typeof value === 'object' ? value[segment] : undefined), locale)
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return Object.entries(vars).reduce((result, [name, value]) => result.replaceAll(`{{${name}}}`, String(value)), template)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem('agency-language')
    return stored === 'en' ? 'en' : 'zh'
  })

  useEffect(() => {
    window.localStorage.setItem('agency-language', language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, vars?: Record<string, string | number>) => {
      const locale = localeMap[language]
      const resolved = lookup(locale, key)
      if (typeof resolved === 'string') return interpolate(resolved, vars)
      return key
    }

    return {
      language,
      setLanguage: setLanguageState,
      t,
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)

  if (!value) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return value
}

