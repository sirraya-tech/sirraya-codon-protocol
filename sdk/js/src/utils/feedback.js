// utils/feedback.js
class Feedback {
    static giveFeedback(result) {
        return `Action performed successfully: ${result}`;
    }

    static mutateCodon(codon, mutationDetails) {
        // Modify codon based on mutation details
        return `${codon}-${mutationDetails}`;
    }
}

module.exports = Feedback;
