const open = require('open');  // This requires installing the 'open' package

class CodonHandler {
    constructor(codonResolver) {
        this.codonResolver = codonResolver;
    }

    // Define specific handler for the action when codon is resolved
    handleResolvedCodon(components) {
        const { intent, context } = components;

        // Example: If intent is 'open' and context is 'browser', open google.com
        if (intent === 'open' && context === 'browser') {
            this.openBrowser();
        }
    }

    // Open the browser with a specific URL
    openBrowser() {
        console.log('Opening the browser...');
        open('https://www.google.com');
    }
}

module.exports = CodonHandler;
