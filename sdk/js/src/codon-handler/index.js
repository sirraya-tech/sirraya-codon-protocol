const open = require('open');

const CodonHandler = {
  handleAction: async (intent, components) => {
    if (intent === 'open_url') {
      return await CodonHandler.openBrowser('https://www.google.com'); // You can also extract URL from components
    }
    throw new Error(`No handler found for intent: ${intent}`);
  },

  openBrowser: async (url) => {
    try {
      await open(url);
      return `Opened browser with URL: ${url}`;
    } catch (err) {
      throw new Error(`Failed to open browser: ${err.message}`);
    }
  }
};

module.exports = CodonHandler;
