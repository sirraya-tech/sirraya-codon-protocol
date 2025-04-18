class CodonResolver {
  constructor(actions = {}) {
    this.actions = actions;
  }

  resolve(codon) {
    const intent = codon.getIntent();
    const context = codon.getContext();

    const key = `${intent}:${context}`;
    const action = this.actions[key];

    if (!action) {
      throw new Error(`No resolver found for intent: ${intent}, context: ${context}`);
    }

    return action(codon.components);
  }

  register(intent, context, fn) {
    const key = `${intent}:${context}`;
    this.actions[key] = fn;
  }
}

module.exports = CodonResolver;
