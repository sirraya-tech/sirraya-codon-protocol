import open from 'open';  // Using ES module import

const CodonHandler = {
  handleAction: async (intent, components) => {
    if (intent === 'open_url') {
      return await CodonHandler.openBrowser('https://www.google.com');  // You can replace this URL with one from components
    }
    throw new Error(`No handler found for intent: ${intent}`);
  },

  openBrowser: async (url) => {
    try {
      console.log('Attempting to open URL...');
      await open(url);  // Attempt to open the URL
      console.log('Browser opened');
      return `Opened browser with URL: ${url}`;
    } catch (err) {
      console.error('Failed to open browser:', err.message);
      throw new Error(`Failed to open browser: ${err.message}`);
    }
  }
};

export default CodonHandler;
