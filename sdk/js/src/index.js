import CodonGenerator from './codon-generator/index.js';
import CodonParser from './codon-parser/index.js';
import CodonHandler from './codon-handler/index.js';
import Feedback from './utils/feedback.js';
import readline from 'readline';  // We will use readline for interactive input

// Define a simple function to map user input to the right intent
function mapUserInputToIntent(userInput) {
  // Define a list of basic patterns and map them to intents
  const mappings = [
    { pattern: /open.*browser/i, intent: 'open_browser' },
    { pattern: /open.*calculator/i, intent: 'open_calculator' },
    { pattern: /open.*notepad/i, intent: 'open_notepad' },
    { pattern: /open.*terminal/i, intent: 'open_terminal' },
    { pattern: /what.*time/i, intent: 'what_time' }, // Example for checking time
    { pattern: /tell.*joke/i, intent: 'tell_joke' }, // Example for telling a joke
    // Add more mappings here as needed
  ];

  // Check each pattern and see if it matches the user input
  for (const { pattern, intent } of mappings) {
    if (pattern.test(userInput)) {
      return intent;
    }
  }

  // If no match found, return null
  return null;
}

// Main function that processes user input
async function handleUserInput(userInput) {
  try {
    // Step 1: Map the user input to an intent
    const intent = mapUserInputToIntent(userInput);
    
    if (!intent) {
      console.log('Could not identify intent from input.');
      return;
    }

    console.log(`Mapped user input to intent: ${intent}`);

    // Step 2: Generate a codon based on the detected intent
    const codon = CodonGenerator.generateCodon(
      'User1',
      'Device',
      intent, // The mapped intent
      'device',
      null,
      'US',
      'Device123'
    );

    console.log('Generated Codon:', codon);

    // Step 3: Parse the codon
    const codonParser = new CodonParser(codon);
    console.log('Parsed Codon Components:', codonParser.components);

    // Step 4: Resolve and execute the action based on the codon using CodonHandler
    const result = await CodonHandler.handleAction(intent, codonParser.components);
    console.log('Resolved Action Result:', result);

    // Step 5: Provide feedback (optional)
    const feedback = Feedback.giveFeedback(result);
    console.log('Feedback:', feedback);
  } catch (error) {
    console.error('Error while handling user input:', error.message);
  }
}

// Set up readline for interactive input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user for input
function promptUserForInput() {
  rl.question('Please enter a command: ', (userInput) => {
    handleUserInput(userInput).then(() => {
      // After handling, prompt for another input
      promptUserForInput();
    });
  });
}

// Start prompting the user
promptUserForInput();
