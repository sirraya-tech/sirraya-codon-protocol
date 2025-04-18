// models/codon.js
class Codon {
    constructor(identity, role, intent, context, time, geo, signature) {
        this.identity = identity;
        this.role = role;
        this.intent = intent;
        this.context = context;
        this.time = time;
        this.geo = geo;
        this.signature = signature;
    }

    toString() {
        return `${this.identity}-${this.role}-${this.intent}-${this.context}-${this.time || ''}-${this.geo || ''}-${this.signature || ''}`;
    }
}

module.exports = Codon;
