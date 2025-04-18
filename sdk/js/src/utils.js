// Utility function to validate if a Codon string is in the correct format
function validateCodon(codon) {
    const codonRegex = /^[A-Za-z0-9]+(-[A-Za-z0-9]+){6}$/;
    return codonRegex.test(codon);
}

// Utility function to convert time to a standard format (e.g., ISO)
function convertToISODate(time) {
    const date = new Date(time);
    return date.toISOString();
}

module.exports = {
    validateCodon,
    convertToISODate
};
