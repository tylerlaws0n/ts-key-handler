import { test, expect, jest, describe, beforeEach, beforeAll } from 'bun:test';
import { render } from '@testing-library/react';
import { ShortcutWithHandler } from '../../core/src/types';
import { useMemo } from 'react';
import { useKeyHandlers } from './use-key-handlers';

const testA = jest.fn();
const testB = jest.fn();

const TestComponent = () => {
  const handleShortcuts = useMemo<ShortcutWithHandler[]>(
    () => [
      ['shift+a', testA],
      ['shift+b', testB],
    ],
    []
  );
  useKeyHandlers(handleShortcuts);

  return null;
};

describe('useKeyHandlers', () => {
  beforeAll(() => {
    render(<TestComponent />);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sanity test', () => {
    expect(testA).toBeCalledTimes(0);
    expect(testB).toBeCalledTimes(0);
  });

  test('correct key is pressed & listener is called shift+a & not shift+b', () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', shiftKey: true })
    );
    expect(testA).toBeCalledTimes(1);
    expect(testB).toBeCalledTimes(0);
  });

  test('both keys are pressed & listeners are called', () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', shiftKey: true })
    );
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'b', shiftKey: true })
    );
    expect(testA).toBeCalledTimes(1);
    expect(testB).toBeCalledTimes(1);
  });

  test('incorrect key is pressed & neither listener is called', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(testA).toBeCalledTimes(0);
    expect(testB).toBeCalledTimes(0);
  });

  test('incorrect modifier is pressed & listener is not called ctrl+a for shift+a', () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    );
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'b', ctrlKey: true })
    );
    expect(testA).toBeCalledTimes(0);
    expect(testB).toBeCalledTimes(0);
  });
});
