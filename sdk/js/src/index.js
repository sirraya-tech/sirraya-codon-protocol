import CodonGenerator from './codon-generator/index.js';  // Using import instead of require
import CodonParser from './codon-parser/index.js';        // Using import instead of require
import CodonResolver from './codon-resolver/index.js';    // Using import instead of require
import CodonHandler from './codon-handler/index.js';      // Using import instead of require
import Feedback from './utils/feedback.js';         // Using import instead of require

// Step 1: Registering intents in the resolver
const codonResolver = new CodonResolver();
codonResolver.register('open_url', 'device', async (components) =>
    await CodonHandler.handleAction('open_url', components)
);

// Wrap everything in an async IIFE so we can use await
(async () => {
    // Step 2: Generate a codon
    const codon = CodonGenerator.generateCodon(
        'User1',          // sender
        'Device',         // receiver
        'open_url',       // intent
        'device',         // context
        null,             // timestamp (defaults to now)
        'US',             // location
        'Device123'       // session
    );

    console.log('--- Codon Test Run ---');
    console.log('Generated Codon:', codon);

    // Step 3: Parse the codon
    const codonParser = new CodonParser(codon);
    console.log('Parsed Codon Components:', codonParser.components);

    // Step 4: Resolve the codon and perform the action
    try {
        const result = await codonResolver.resolve(codonParser); // ⬅️ await is crucial here
        console.log('Resolved Action Result:', result);

        // Step 5: Feedback or mutation logic (optional)
        const feedback = Feedback.giveFeedback(result);
        console.log('Feedback:', feedback);
    } catch (error) {
        console.error('Error while resolving codon:', error.message);
    }
})();
