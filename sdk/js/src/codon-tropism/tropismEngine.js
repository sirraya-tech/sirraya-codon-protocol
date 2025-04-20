// tropismEngine.js
const codons = [];

export function registerCodon(codon) {
  codons.push(codon);
}

function getStimuliSnapshot() {
  // Simulated live stimuli – replace with real context sensors later
  return {
    emotion: 'focused',
    app: 'notepad.exe',
    timeOfDay: 10,
  };
}

function matchesStimuli(required, actual) {
  return Object.entries(required).every(([key, val]) => {
    if (Array.isArray(val)) return val.includes(actual[key]);
    return actual[key] === val;
  });
}

function resolveCodon(intentName) {
  const currentStimuli = getStimuliSnapshot();

  const matched = codons.find(c =>
    c.intent === intentName &&
    matchesStimuli(c.stimuli || {}, currentStimuli)
  );

  return matched;
}

export async function handleIntent(intentName, payload = {}) {
  const matchedCodon = resolveCodon(intentName);
  if (!matchedCodon) {
    console.log(`[❌] No matching codon found for intent: ${intentName}`);
    return;
  }

  console.log(`[✅] Codon "${matchedCodon.telomere}" matched via tropism!`);
  await matchedCodon.handler(payload);
}
