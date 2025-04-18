class CodonParser {
    constructor(codon) {
        this.codon = codon;
        this.components = this.parseCodon(codon);  // Parse the codon
    }

    parseCodon(codon) {
        const components = codon.split('-');  // Split by delimiter (default is '-')

        // If there's no codon or it can't be parsed correctly, throw an error
        if (components.length < 2) {
            throw new Error("Invalid Codon format: Too few components");
        }

        // Dynamically map the components, based on common use cases
        const parsedComponents = {
            identity: components[0],  // First component is always identity
            role: components[1],  // Second component is always role
            intent: components[2] || null,  // Third component is optional, if it exists
            context: components[3] || null,  // Fourth component is optional, if it exists
            time: this.parseTime(components[4] || ''),  // Fifth component is time, optional
            geo: components[5] || null,  // Sixth component is geo, optional
            signature: components[6] || null,  // Seventh component is signature, optional
            additionalComponents: components.slice(7)  // Any additional components (dynamic length)
        };

        return parsedComponents;
    }

    parseTime(time) {
        if (!time) return null;  // If no time is provided, return null

        // Check if it's an ISO 8601 format with or without the 'Z' suffix
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z)?$/;
        if (isoRegex.test(time)) {
            return new Date(time).toISOString(); // Return ISO format date
        }

        // If time is a Unix timestamp, handle it as such
        const timestamp = parseInt(time, 10);
        if (!isNaN(timestamp)) {
            return new Date(timestamp * 1000).toISOString(); // Convert Unix timestamp to ISO format
        }

        // If neither of the above, return null
        return null;
    }

    encode() {
        // Encode components back into a string, ensuring that undefined components are skipped
        const { identity, role, intent, context, time, geo, signature, additionalComponents } = this.components;
        const allComponents = [identity, role, intent, context, time, geo, signature, ...additionalComponents].filter(component => component !== null);
        return allComponents.join('-');  // Join back with the delimiter
    }

    getIdentity() { return this.components.identity; }
    getRole() { return this.components.role; }
    getIntent() { return this.components.intent; }
    getContext() { return this.components.context; }
    getTime() { return this.components.time; }
    getGeo() { return this.components.geo; }
    getSignature() { return this.components.signature; }
    getAdditionalComponents() { return this.components.additionalComponents; }
}

module.exports = CodonParser;
