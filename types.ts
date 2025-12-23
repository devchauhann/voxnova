
export enum VoiceProvider {
  GEMINI = 'GEMINI',
  BROWSER = 'BROWSER'
}

export type AudioFormat = 'wav' | 'mp3' | 'txt';

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  gender: 'male' | 'female' | 'neutral';
  provider: VoiceProvider;
}

export interface TTSHistoryItem {
  id: string;
  text: string;
  voiceId: string;
  timestamp: number;
  duration?: number;
  blobUrl?: string;
}

export interface AudioSettings {
  pitch: number;
  rate: number;
  volume: number;
  voiceId: string;
  format: AudioFormat;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
