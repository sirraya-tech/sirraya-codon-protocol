const CodonParser = require('../src/codonParser'); // Assuming this path is correct
const CodonResolver = require('../src/codonResolver'); // Adjust path

// Manual test suite
const runTests = () => {
  let codonResolver;

  // Test 1: Should resolve intent to turn on the light
  try {
    codonResolver = new CodonResolver();
    codonResolver.register('turn_on', 'light', (components) => {
      return 'The light is now ON!';
    });
    const codon = new CodonParser('A1-B2-turn_on-light-2025-04-18T12:00:00-India-S1');
    const result = codonResolver.resolve(codon);
    console.log('Test 1: Turn on the light');
    console.log('Expected Result: The light is now ON!');
    console.log('Actual Result:', result);
    console.assert(result === 'The light is now ON!', 'Test 1 Failed');
  } catch (error) {
    console.log('Test 1 Failed with error:', error);
  }

  // Test 2: Should resolve intent to play music
  try {
    codonResolver = new CodonResolver();
    codonResolver.register('play', 'music', (components) => {
      return 'Playing your favorite music!';
    });
    const codon = new CodonParser('A1-B2-play-music-2025-04-18T12:00:00-India-S2');
    const result = codonResolver.resolve(codon);
    console.log('Test 2: Play music');
    console.log('Expected Result: Playing your favorite music!');
    console.log('Actual Result:', result);
    console.assert(result === 'Playing your favorite music!', 'Test 2 Failed');
  } catch (error) {
    console.log('Test 2 Failed with error:', error);
  }

  // Test 3: Should throw an error if no resolver is found for intent and context
  try {
    codonResolver = new CodonResolver();
    const codon = new CodonParser('A1-B2-pause-music-2025-04-18T12:00:00-India-S3');
    codonResolver.resolve(codon);
    console.log('Test 3 Failed: Expected error but did not throw');
  } catch (error) {
    console.log('Test 3: No resolver for pause intent in music context');
    console.log('Expected error:', error.message);
    console.assert(error.message === 'No resolver found for intent: pause, context: music', 'Test 3 Failed');
  }

  // Test 4: Should resolve intent to order food
  try {
    codonResolver = new CodonResolver();
    codonResolver.register('order', 'food', (components) => {
      return 'Your food order has been placed!';
    });
    const codon = new CodonParser('A1-B2-order-food-2025-04-18T12:00:00-India-S4');
    const result = codonResolver.resolve(codon);
    console.log('Test 4: Order food');
    console.log('Expected Result: Your food order has been placed!');
    console.log('Actual Result:', result);
    console.assert(result === 'Your food order has been placed!', 'Test 4 Failed');
  } catch (error) {
    console.log('Test 4 Failed with error:', error);
  }

  // Test 5: Should handle unknown intents gracefully
  try {
    codonResolver = new CodonResolver();
    const codon = new CodonParser('A1-B2-unknown-device-2025-04-18T12:00:00-India-S5');
    codonResolver.resolve(codon);
    console.log('Test 5 Failed: Expected error but did not throw');
  } catch (error) {
    console.log('Test 5: Unknown intent');
    console.log('Expected error:', error.message);
    console.assert(error.message === 'No resolver found for intent: unknown, context: device', 'Test 5 Failed');
  }
};

// Run all tests
runTests();
