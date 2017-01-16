import {CurrencyFormatPipe} from './currency-format.pipe';

// suite of related tests
describe('Currency Format Pipe', () => {
    let pipe = new CurrencyFormatPipe();

    // test definitions
    it('transforms 1000 to 1,000.00', () => {
        expect(pipe.transform(1000, '0,0.00')).toBe('1,000.00');
    });
});
