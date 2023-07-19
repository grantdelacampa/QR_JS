# QR_JS

This project is being built just to test my programming skills. I wanted to write a QR generator that doesn't use any external packages, and still maintains fast generation speeds.

**This project is still in Alpha please be aware if you want to fork it**

## Current Bugs
- Pixel resolution starts bluring after V-27

## Current Features
- Black and white QR generation from v1-v40
- Modes for numeric, alphanumeric, byte, and Kanji via Byte.
- Variable error correction mode selection.

## Planned Features
- Allow the user to change the colors for the 0 and 1 pixels.
- Allow variable whitespace size.
- Better react integration
- Publish package to NPM

## In Progress
- Better test coverage (should have done this first/sooner)
- Regression testing for more versions and modes.

## Generation overview
1. Data Analysis
2. Data Encoding
3. Error correction coding
4. Structuring final message
5. Module placement
7. Data Masking
8. Format & Version info

### acknowledgments & resources
- https://www.thonky.com/qr-code-tutorial/
- https://www.nayuki.io/page/creating-a-qr-code-step-by-step
