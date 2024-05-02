import { test, expect, jest, describe, beforeEach, beforeAll } from 'bun:test';
import { render } from '@testing-library/react';
import { useKeyHandler } from './use-key-handler';

const testFn = jest.fn();

const TestComponent = () => {
  useKeyHandler('shift+a', testFn);

  return null;
};

describe('useKeyHandler', () => {
  beforeAll(() => {
    render(<TestComponent />);
  });

  beforeEach(() => {
    testFn.mockClear();
  });

  test('sanity test', () => {
    expect(testFn).toBeCalledTimes(0);
  });

  test('correct key is pressed & listener is called shift+a', () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', shiftKey: true })
    );
    expect(testFn).toBeCalledTimes(1);
  });

  test('incorrect key is pressed & listener is not called a for shift+a', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(testFn).toBeCalledTimes(0);
  });

  test('incorrect modifier is pressed & listener is not called ctrl+a for shift+a', () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    );
    expect(testFn).toBeCalledTimes(0);
  });
});
