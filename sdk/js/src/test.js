import open from 'open';

(async () => {
    try {
        console.log('Attempting to open URL...');
        await open('https://www.google.com');  // Try to open URL
        console.log('Browser opened');
    } catch (err) {
        console.error('Failed to open browser:', err.message);
    }
})();
