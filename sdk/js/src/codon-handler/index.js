import { exec } from 'child_process';
import os from 'os';

const CodonHandler = {
  registry: new Map(),

  registerIntent: function (intentName, handlerFunction) {
    this.registry.set(intentName, handlerFunction);
  },

  handleAction: async (intent, components) => {
    const handler = CodonHandler.registry.get(intent);
    if (!handler) {
      throw new Error(`No handler found for intent: ${intent}`);
    }
    return await handler(components); // supports future params
  }
};

// === Intent Implementations ===

CodonHandler.registerIntent('open_terminal', async () => {
  const platform = os.platform();
  let command;

  if (platform === 'win32') {
    command = 'start cmd';
  } else if (platform === 'darwin') {
    command = 'open -a Terminal';
  } else if (platform === 'linux') {
    command = 'x-terminal-emulator || gnome-terminal || konsole || xterm';
  } else {
    throw new Error('Unsupported platform for terminal launch');
  }

  return new Promise((resolve, reject) => {
    console.log(`Opening terminal on ${platform}...`);
    exec(command, (err) => {
      if (err) {
        return reject(new Error(`Failed to open terminal: ${err.message}`));
      }
      resolve('Opened terminal successfully.');
    });
  });
});

CodonHandler.registerIntent('open_calculator', async () => {
  const platform = os.platform();
  let command;

  if (platform === 'win32') command = 'calc';
  else if (platform === 'darwin') command = 'open -a Calculator';
  else if (platform === 'linux') command = 'gnome-calculator || kcalc';

  return new Promise((resolve, reject) => {
    console.log(`Opening calculator on ${platform}...`);
    exec(command, (err) => {
      if (err) {
        return reject(new Error(`Failed to open calculator: ${err.message}`));
      }
      resolve('Opened calculator successfully.');
    });
  });
});

// Add more like open_browser, open_notepad, etc.
CodonHandler.registerIntent('open_notepad', async () => {
  const platform = os.platform();
  let command;

  if (platform === 'win32') {
    // Use full path to notepad if needed
    command = 'C:\\Windows\\System32\\notepad.exe'; // Full path for Notepad
    // Alternatively, try:
    // command = 'start notepad';
  } else if (platform === 'darwin') {
    command = 'open -a TextEdit';
  } else if (platform === 'linux') {
    command = 'gedit || xed || nano'; // Customize based on installed editors
  } else {
    throw new Error('Unsupported platform for notepad launch');
  }

  return new Promise((resolve, reject) => {
    console.log(`Opening notepad/text editor on ${platform}...`);
    exec(command, (err) => {
      if (err) {
        return reject(new Error(`Failed to open text editor: ${err.message}`));
      }
      resolve('Opened text editor successfully.');
    });
  });
});

CodonHandler.registerIntent('what_time', async () => {

  return new Promise((resolve, reject) => {
    try {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString(); // Localized format of time

      console.log(`Current time is ${formattedTime}`);
      resolve(`The current time is ${formattedTime}`);
    } catch (error) {
      console.error('Failed to get current time:', error);
      reject(new Error(`Failed to get current time: ${error.message}`));
    }
  });
});

CodonHandler.registerIntent('tell_joke', async () => {
  const jokes = [
    "Why don’t skeletons fight each other? They don’t have the guts!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "Why was the math book sad? It had too many problems.",
    "What do you get when you cross a snowman and a vampire? Frostbite.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised."
  ];

  // Select a random joke from the list
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return new Promise((resolve, reject) => {
    try {
      console.log(`Joke: ${randomJoke}`);
      resolve(randomJoke);
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      reject(new Error(`Failed to fetch joke: ${error.message}`));
    }
  });
});




export default CodonHandler;
