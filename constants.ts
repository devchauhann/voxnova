
import { Language, AudioSettings } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
];

export const DEFAULT_SETTINGS: AudioSettings = {
  pitch: 1.0,
  rate: 1.0,
  volume: 1.0,
  voiceId: '',
  format: 'txt'
};
