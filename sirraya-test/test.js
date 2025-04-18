const { CodonParser } = require('sirraya-sdk');

const codon = 'USR-ADM-REQ-LOGIN-20250418-IN-XYZ123';

try {
    const parser = new CodonParser(codon);

    console.log("Identity:", parser.getIdentity());
    console.log("Role:", parser.getRole());
    console.log("Intent:", parser.getIntent());
    console.log("Context:", parser.getContext());
    console.log("Time:", parser.getTime());
    console.log("Geo:", parser.getGeo());
    console.log("Signature:", parser.getSignature());

    console.log("Re-encoded:", parser.encode());

} catch (err) {
    console.error("Error parsing codon:", err.message);
}
