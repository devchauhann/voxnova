
import { AudioSettings } from "../types";

export interface VoicePersona {
  id: string;
  name: string;
  label: string;
  icon: string;
  type: 'male' | 'female' | 'robot' | 'deep' | 'standard';
  nativeVoice: SpeechSynthesisVoice;
}

export class BrowserTTSService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  /**
   * Identifies and categorizes the best voices into usable personas.
   * Improved regex and fallback logic for better cross-browser compatibility.
   */
  getCuratedPersonas(): VoicePersona[] {
    const allVoices = this.getVoices();
    if (allVoices.length === 0) return [];

    const personas: VoicePersona[] = [];

    // Helper to find a voice by keywords
    const findVoice = (keywords: RegExp, preferredLang: string = 'en') => {
      return allVoices.find(v => keywords.test(v.name) && v.lang.startsWith(preferredLang)) ||
             allVoices.find(v => keywords.test(v.name));
    };

    // 1. Female Persona
    const femaleVoice = findVoice(/female|zira|samantha|linda|catherine|susan|google us english|victoria|karen/i) || 
                       allVoices.find(v => v.lang.startsWith('en'));
    if (femaleVoice) {
      personas.push({
        id: 'female-smooth',
        name: femaleVoice.name,
        label: 'Female Smooth',
        icon: '👩‍💼',
        type: 'female',
        nativeVoice: femaleVoice
      });
    }

    // 2. Male Persona
    const maleVoice = findVoice(/male|david|james|mark|daniel|google uk english male|alex|guy/i);
    if (maleVoice) {
      personas.push({
        id: 'male-pro',
        name: maleVoice.name,
        label: 'Male Professional',
        icon: '🎙️',
        type: 'male',
        nativeVoice: maleVoice
      });
      
      // 3. Deep Narrator (Based on male voice with modulation)
      personas.push({
        id: 'deep-narrator',
        name: maleVoice.name,
        label: 'Deep Narrator',
        icon: '🌑',
        type: 'deep',
        nativeVoice: maleVoice
      });
    }

    // 4. Cyber Robot
    const robotVoice = findVoice(/standard|legacy|bad|robo|cellos|bells|mojave/i) || allVoices[allVoices.length - 1];
    if (robotVoice) {
      personas.push({
        id: 'cyber-robot',
        name: robotVoice.name,
        label: 'Cyber Robot',
        icon: '🤖',
        type: 'robot',
        nativeVoice: robotVoice
      });
    }

    // 5. Studio AI HD
    const studioVoice = findVoice(/google|neural|natural|premium|enhanced/i) || allVoices[0];
    if (studioVoice) {
      personas.push({
        id: 'studio-hd',
        name: studioVoice.name,
        label: 'Studio AI HD',
        icon: '✨',
        type: 'standard',
        nativeVoice: studioVoice
      });
    }

    return personas;
  }

  speak(
    text: string, 
    settings: AudioSettings, 
    personaId: string,
    onStart: () => void,
    onEnd: () => void,
    onPause: () => void,
    onResume: () => void
  ) {
    this.cancel();

    // Small delay to ensure previous speech is fully cancelled in some browsers
    setTimeout(() => {
      this.currentUtterance = new SpeechSynthesisUtterance(text);
      
      const voices = this.getVoices();
      const voice = voices.find(v => v.name === settings.voiceId) || voices[0];
      
      if (voice) {
        this.currentUtterance.voice = voice;
        this.currentUtterance.lang = voice.lang;
      }

      // Apply persona-specific modulations
      let finalPitch = settings.pitch;
      let finalRate = settings.rate;

      if (personaId === 'deep-narrator') {
        finalPitch *= 0.65; 
        finalRate *= 0.85; 
      } else if (personaId === 'cyber-robot') {
        finalPitch *= 1.8;
        finalRate *= 1.2;
      }

      this.currentUtterance.pitch = finalPitch;
      this.currentUtterance.rate = finalRate;
      this.currentUtterance.volume = settings.volume;

      this.currentUtterance.onstart = onStart;
      this.currentUtterance.onend = onEnd;
      this.currentUtterance.onpause = onPause;
      this.currentUtterance.onresume = onResume;
      
      this.currentUtterance.onerror = (event) => {
        console.error('Speech Synthesis Error:', event);
        onEnd();
      };

      this.synth.speak(this.currentUtterance);
    }, 50);
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }

  cancel() {
    this.synth.cancel();
    if (this.currentUtterance) {
      this.currentUtterance = null;
    }
  }

  get isSpeaking() {
    return this.synth.speaking;
  }

  get isPaused() {
    return this.synth.paused;
  }
}

export const ttsService = new BrowserTTSService();
