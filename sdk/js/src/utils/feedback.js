class Feedback {
    static giveFeedback(result) {
        return `Action performed successfully: ${result}`;
    }

    static mutateCodon(codon, mutationDetails) {
        // Modify codon based on mutation details
        return `${codon}-${mutationDetails}`;
    }
}

// Exporting the Feedback class using ES module syntax
export default Feedback;
