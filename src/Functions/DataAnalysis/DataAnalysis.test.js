import { decideMode } from './DataAnalysis';

test('Numeric Mode Test', () => {
  expect(decideMode(1232312)).toBe('numeric');
});

test('Alphanumeric Mode Test', () => {
  expect(decideMode('HELLO WORLD$/*.-')).toBe('alphanumeric');
});

test('Byte Mode Test', () => {
  expect(decideMode('Hello World')).toBe('byte');
});

// TODO ShiftJIS test when it works!
