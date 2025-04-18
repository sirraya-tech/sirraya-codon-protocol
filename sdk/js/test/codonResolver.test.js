const CodonParser = require('../src/codonParser'); // Assuming this path is correct
const CodonResolver = require('../src/codonResolver'); // Adjust path

function generateCodon(identity, role, intent = null, context = null, time = '', geo = null, signature = null, additionalComponents = []) {
    const codonParts = [identity, role, intent, context, time, geo, signature, ...additionalComponents];
    
    // Filter out any undefined or null parts before joining them into a codon
    return codonParts.filter(part => part !== null && part !== undefined).join('-');
}

describe('CodonResolver', () => {

  let codonResolver;
  
  beforeEach(() => {
    codonResolver = new CodonResolver();
  });

  it('should resolve intent to turn on the light', () => {
    // Register the action for "turn_on" intent and "light" context
    codonResolver.register('turn_on', 'light', (components) => {
      return `Turning on the light.`;
    });

    // Generate the codon for the action using the Codon Generator
    const codon = new CodonParser(generateCodon('A1', 'B2', 'turn_on', 'light', '2025-04-18T12:00:00', 'India', 'S1'));
    const result = codonResolver.resolve(codon);

    // Test that it resolves correctly
    expect(result).toBe('Turning on the light.');
  });

  it('should resolve intent to play music', () => {
    // Register the action for "play" intent and "music" context
    codonResolver.register('play', 'music', (components) => {
      return 'Playing music.';
    });

    // Generate the codon for the action using the Codon Generator
    const codon = new CodonParser(generateCodon('A1', 'B2', 'play', 'music', '2025-04-18T12:00:00', 'India', 'S2'));
    const result = codonResolver.resolve(codon);

    // Test that it resolves correctly
    expect(result).toBe('Playing music.');
  });

  it('should throw an error if no resolver found', () => {
    // Register an action for "turn_on" intent and "light" context
    codonResolver.register('turn_on', 'light', (components) => {
      return `Turning on the light.`;
    });

    // Generate the codon for the "pause" intent, which hasn't been registered
    const codon = new CodonParser(generateCodon('A1', 'B2', 'pause', 'music', '2025-04-18T12:00:00', 'India', 'S3'));

    // Test that it throws the expected error when no resolver is found
    expect(() => {
      codonResolver.resolve(codon);
    }).toThrowError('No resolver found for intent: pause, context: music');
  });

});
