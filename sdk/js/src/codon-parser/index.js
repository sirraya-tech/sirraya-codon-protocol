import CodonModel from '../models/codon.js'; // Using import instead of require

class CodonParser {
    constructor(codon) {
        this.codon = codon;
        this.components = this.parseCodon(codon);
    }

    parseCodon(codon) {
        const components = codon.split('-');
        if (components.length < 4) {
            throw new Error("Invalid Codon format: Too few components");
        }

        return {
            identity: components[0],
            role: components[1],
            intent: components[2],
            context: components[3],
            time: components[4] || null,
            geo: components[5] || null,
            signature: components[6] || null,
            additionalComponents: components.slice(7),
        };
    }

    getComponents() {
        return this.components;
    }
}

export default CodonParser; // Use export default instead of module.exports
