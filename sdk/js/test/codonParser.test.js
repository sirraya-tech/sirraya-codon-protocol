const { CodonParser } = require('../src');
const { validateCodon, convertToISODate } = require('../src/utils');

describe('CodonParser', () => {
    test('should parse a valid codon', () => {
        const codon = 'A1-B2-C3-D4-E5-F6-G7';
        const parser = new CodonParser(codon);
        expect(parser.getIdentity()).toBe('A1');
        expect(parser.getRole()).toBe('B2');
        expect(parser.getIntent()).toBe('C3');
    });

    test('should throw error for invalid codon format', () => {
        const codon = 'A1-B2-C3-D4-E5';
        expect(() => new CodonParser(codon)).toThrow('Invalid Codon format');
    });
});

describe('Utils', () => {
    test('should validate codon format', () => {
        const validCodon = 'A1-B2-C3-D4-E5-F6-G7';
        const invalidCodon = 'A1-B2-C3-D4';
        expect(validateCodon(validCodon)).toBe(true);
        expect(validateCodon(invalidCodon)).toBe(false);
    });

    test('should convert time to ISO format', () => {
        const time = '2025-04-18T00:00:00Z';
        expect(convertToISODate(time)).toBe('2025-04-18T00:00:00.000Z');
    });
});
