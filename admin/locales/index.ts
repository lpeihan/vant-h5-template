import enUS_antd from 'ant-design-vue/es/locale/en_US';
import zhCN_antd from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { createI18n } from 'vue-i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

import storage from '../utils/storage';

import zhCN from './zh-CN';

const DEFAULT_LANG = 'zh-CN';

// https://github.com/lokalise/i18n-ally/tree/main/locales
export const SUPPORTED_LOCALES = [
  { name: '🇨🇳 简体中文', value: 'zh-CN' },
  { name: '🇺🇸 English', value: 'en' },
  // { name: '🇨🇳 繁體中文', value: 'zh-TW' },
  // { name: '🇯🇵 日本語', value: 'ja' },
  // { name: '🇰🇷 한국어', value: 'ko' },
  // { name: '🇹🇭 ไทย', value: 'th' },
  // { name: '🇷🇺 Русский', value: 'ru' },
  // { name: '🇸🇦 العربية', value: 'ar' },
  // { name: '🇻🇳 Tiếng Việt', value: 'vi' },
  // { name: '🇫🇷 Français', value: 'fr' },
  // { name: '🇩🇪 Deutsch', value: 'de' },
  // { name: '🇲🇾 Bahasa Melayu', value: 'ms' },
  // { name: '🇮🇳 हिन्दी', value: 'hi' },
  // { name: '🇪🇸 Español', value: 'es' },
];

export function getLocale() {
  return storage.getItem('locale') || DEFAULT_LANG;
}

export function getAntdLocale() {
  const locale = getLocale();

  const antdLocales = {
    'zh-CN': zhCN_antd,
    en: enUS_antd,
  };

  return antdLocales[locale];
}

export function getDayjsLocale(locale) {
  const dayjsLocales = {
    'zh-CN': 'zh-cn',
    en: 'en',
  };

  return dayjsLocales[locale];
}

function setupLocale() {
  const locale = getLocale();

  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LANG,
    messages: {
      'zh-CN': { ...zhCN },
    },
  });

  setLocale(locale);

  return i18n;
}

export const i18n = setupLocale();

async function loadLocaleMessages(locale) {
  const supported = SUPPORTED_LOCALES.map(({ value }) => value);
  if (!supported.includes(locale)) {
    locale = DEFAULT_LANG;
  }

  return await import(`./${locale}.ts`);
}

export async function setLocale(locale) {
  const messages = await loadLocaleMessages(locale);

  document.querySelector('html').setAttribute('lang', locale);

  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale.value = locale;
  dayjs.locale(getDayjsLocale(locale));

  storage.setItem('locale', locale);
}
