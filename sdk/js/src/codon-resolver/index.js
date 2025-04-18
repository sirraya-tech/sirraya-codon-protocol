// codon-resolver/index.js
class CodonResolver {
    constructor() {
        this.resolvers = new Map();
    }

    register(intent, context, action) {
        const key = `${intent}-${context}`;
        this.resolvers.set(key, action);
    }

    resolve(codonParser) {
        const { intent, context } = codonParser.getComponents();
        const key = `${intent}-${context}`;

        const action = this.resolvers.get(key);
        if (!action) {
            throw new Error(`No resolver found for intent: ${intent}, context: ${context}`);
        }

        return action(codonParser.getComponents());
    }
}

module.exports = CodonResolver;
