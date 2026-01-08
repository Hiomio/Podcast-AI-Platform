import { voicePack } from './voicePack';

const VOICE_ASSIGNMENTS = (() => {
    const hostVoices = voicePack.filter(v => v.displayName.includes('(F)'));
    const guestVoices = voicePack.filter(v => v.displayName.includes('(M)'));
    
    return {
      host: hostVoices[0]?.voiceId || 'en-IN-isha',
      guest: guestVoices[0]?.voiceId || 'en-IN-eashwar'
    };
  })();

export const getVoiceForRole = (role: 'host' | 'guest'): string => {
  return role === 'host' ? VOICE_ASSIGNMENTS.host : VOICE_ASSIGNMENTS.guest;
};