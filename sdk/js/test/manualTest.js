const { CodonParser } = require('../src');

// Codon with 7 components (as before)
const codon1 = 'A1-B2-C3-D4-2025-04-18T00:00:00Z-F6-G7';
const parser1 = new CodonParser(codon1);

console.log('Parsed Components (Codon 1):');
console.log('Identity:', parser1.getIdentity());
console.log('Role:', parser1.getRole());
console.log('Intent:', parser1.getIntent());
console.log('Context:', parser1.getContext());
console.log('Time:', parser1.getTime());  // Should print a valid ISO format time
console.log('Geo:', parser1.getGeo());
console.log('Signature:', parser1.getSignature());
