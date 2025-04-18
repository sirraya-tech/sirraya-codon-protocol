const CodonGenerator = require('../src/codonGenerator');

// You can change the delimiter if needed
const generator = new CodonGenerator();

const codon = generator.generateCodon({
    identity: 'USR001',
    role: 'admin',
    intent: 'update',
    context: 'account',
    geo: 'IN',
    secretKey: 'mySecretKey123' 
});

console.log('Generated Codon:', codon);
