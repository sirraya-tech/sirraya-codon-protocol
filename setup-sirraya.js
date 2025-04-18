const fs = require("fs");
const path = require("path");

const structure = {
  "sirraya-codon-protocol": {
    "RFCs": {
      "0001-codon-schema.md": `# RFC 0001 - Sirraya Codon Schema

## Summary
Codons are atomic units of intent in the Sirraya protocol.

## Structure
A Codon has 7 parts:
AXXX-BXXX-CXXX-DXXX-EXXX-FXXX-GXXX

- A: ID
- B: Role
- C: Intent
- D: Context
- E: Time
- F: Geo
- G: Sign + Mutation (Telomere)

## Example

CODON: U123-ROLE-LOGN-USER-T123-GKSH-SIGX
`,
    },
    "codons": {
      "examples": {
        "login.codon": `U123-ADMIN-LOGN-APPX-TIME-LOCX-TLMX`,
      },
    },
    "sdk": {
      "js": {
        "README.md": `# Sirraya SDK for JavaScript

This will hold codon parsers and utilities for JavaScript.
`,
      },
      "react-native": {
        "README.md": `# React Native SDK for Sirraya

Cross-platform codon resolver and broadcaster for mobile.
`,
      },
    },
    "telomere": {
      "telomere-spec.md": `# Telomere Communication in Sirraya

Telomere allows codons to be emitted without broadcasting to all. It includes:
- Filtering
- Matching logic
- Mutation signature
`,
    },
    "README.md": `# Sirraya Codon Protocol

The Sirraya Protocol is a new ambient computing architecture where codons resolve into actions without a backend.

## Codon Format

AXXX-BXXX-CXXX-DXXX-EXXX-FXXX-GXXX

Each section encodes identity, role, intent, context, time, geo, and signature/mutation.

## Folders

- RFCs
- SDK
- Telomere
- Codons

## Status

Work in progress 🚀
`,
    "LICENSE": `MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge...`,
  },
};

function createStructure(basePath, obj) {
  for (const name in obj) {
    const fullPath = path.join(basePath, name);
    if (typeof obj[name] === "string") {
      fs.writeFileSync(fullPath, obj[name]);
    } else {
      fs.mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, obj[name]);
    }
  }
}

createStructure(".", structure);
console.log("✅ Sirraya Codon Protocol project created!");
