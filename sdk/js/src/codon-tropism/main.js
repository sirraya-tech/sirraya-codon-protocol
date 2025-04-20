// main.js
import { registerCodon, handleIntent } from './tropismEngine.js';

// Register tropism-aware codons
registerCodon({
  intent: 'copy_text',
  telomere: 'TL-COPY-1A',
  stimuli: {
    emotion: ['focused', 'neutral'],
    app: ['notepad.exe'],
    timeOfDay: [9, 10, 11]
  },
  handler: async (payload) => {
    console.log(`[📝] Copied text: "${payload.text}" to clipboard`);
  }
});

registerCodon({
  intent: 'play_music',
  telomere: 'TL-MUSIC-5B',
  stimuli: {
    emotion: ['sad'],
    timeOfDay: [21, 22, 23]
  },
  handler: async () => {
    console.log(`[🎶] Playing soothing music...`);
  }
});

// Trigger one
handleIntent('copy_text', { text: 'The DNA of logic' });
