const crypto = require('crypto');

class CodonGenerator {
    constructor(delimiter = '-') {
        this.delimiter = delimiter;
    }

    /**
     * Generate a codon string based on components.
     * @param {Object} data - { identity, role, intent, context, geo, time (optional), secretKey (optional) }
     * @returns {string}
     */
    generateCodon({ identity, role, intent, context, geo, time = null, secretKey = '' }) {
        const timestamp = time || new Date().toISOString();

        const baseComponents = [identity, role, intent, context, timestamp, geo];
        const rawCodon = baseComponents.join(this.delimiter);
        const signature = this.generateSignature(rawCodon, secretKey);

        return `${rawCodon}${this.delimiter}${signature}`;
    }

    /**
     * Generate SHA-256 signature for the codon
     * @param {string} codonBody
     * @param {string} secretKey
     * @returns {string}
     */
    generateSignature(codonBody, secretKey) {
        const hash = crypto.createHash('sha256');
        hash.update(codonBody + secretKey);
        return hash.digest('hex').slice(0, 8); // Shorten to 8 chars for simplicity
    }
}

module.exports = CodonGenerator;
