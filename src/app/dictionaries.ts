import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  tr: () => import('../dictionaries/tr.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: string) => {
  const loc = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  return dictionaries[loc]?.() ?? dictionaries.tr()
}
