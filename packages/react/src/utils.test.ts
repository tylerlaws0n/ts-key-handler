import { describe, test, expect, jest, beforeEach } from 'bun:test';
import { handleShortcut, handleShortcuts } from './utils';

const aKeyListener = jest.fn((e: KeyboardEvent) => {
  expect(e.key).toBe('a');
});

beforeEach(() => {
  aKeyListener.mockClear();
});

describe('utils - handleShortcut', () => {
  test('Correct key is passed & listener is called', () => {
    const handler = handleShortcut('a', aKeyListener);
    document.addEventListener('keydown', handler);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(aKeyListener).toHaveBeenCalledTimes(1);
  });

  test('listener is not called when different key is pressed', () => {
    const handler = handleShortcut('a', aKeyListener);
    document.addEventListener('keydown', handler);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

    expect(aKeyListener).toHaveBeenCalledTimes(0);
  });

  test('listener is called multiple times', () => {
    const listener = jest.fn();
    const handler = handleShortcut('a', listener);
    document.addEventListener('keydown', handler);
    const event = new KeyboardEvent('keydown', { key: 'a' });

    for (let i = 0; i < 100; i++) {
      document.dispatchEvent(event);
    }

    expect(listener).toHaveBeenCalledTimes(100);
  });

  test.each(['shift', 'ctrl', 'alt', 'cmd', 'super'] as const)(
    'listener is not called when a is pressed without %s key',
    (modifier) => {
      const listener = jest.fn();
      const handler = handleShortcut(`${modifier}+a`, listener);
      document.addEventListener('keydown', handler);
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'a',
        })
      );

      expect(listener).toHaveBeenCalledTimes(0);
    }
  );

  test.each(['shift', 'ctrl', 'alt', 'cmd', 'super'] as const)(
    'listener is called once when %s+a is pressed',
    (modifier) => {
      const listener = jest.fn();
      const handler = handleShortcut(`${modifier}+a`, listener);
      document.addEventListener('keydown', handler);
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'a',
          [`${modifier === 'super' || modifier === 'cmd' ? 'meta' : modifier}Key`]:
            true,
        })
      );

      expect(listener).toHaveBeenCalledTimes(1);
    }
  );
});

describe('utils - handleShortcuts', () => {
  test('Correct key is passed & listener is called', () => {
    const emptyListener = jest.fn();
    const handler = handleShortcuts(['a', emptyListener], ['b', emptyListener]);
    document.addEventListener('keydown', handler);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

    expect(emptyListener).toHaveBeenCalledTimes(2);
  });

  test('listener is not called when different key is pressed', () => {
    const emptyListener = jest.fn();
    const handler = handleShortcuts(['a', emptyListener], ['b', emptyListener]);
    document.addEventListener('keydown', handler);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));

    expect(emptyListener).toHaveBeenCalledTimes(0);
  });

  test('listener is called once per shortcut', () => {
    const emptyListener = jest.fn();
    const handler = handleShortcuts(['a', emptyListener], ['b', emptyListener]);
    document.addEventListener('keydown', handler);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));

    expect(emptyListener).toHaveBeenCalledTimes(1);
  });

  test('listener is called multiple times', () => {
    const listener = jest.fn();
    const handler = handleShortcuts(['a', listener], ['b', listener]);
    document.addEventListener('keydown', handler);

    document.addEventListener('keydown', handler);

    for (let i = 0; i < 100; i++) {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: Math.random() < 0.5 ? 'a' : 'b' })
      );
    }

    expect(listener).toHaveBeenCalledTimes(100);
  });

  test.each(['shift', 'ctrl', 'alt', 'cmd', 'super'] as const)(
    'listener is not called when a is pressed without %s key',
    (modifier) => {
      const listener = jest.fn();
      const handler = handleShortcuts(
        [`${modifier}+a`, listener],
        [`${modifier}+b`, listener]
      );
      document.addEventListener('keydown', handler);
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'a',
        })
      );
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'b',
        })
      );

      expect(listener).toHaveBeenCalledTimes(0);
    }
  );

  test.each(['shift', 'ctrl', 'alt', 'cmd', 'super'] as const)(
    'listener is called once when %s+a is pressed',
    (modifier) => {
      const listener = jest.fn();
      const handler = handleShortcuts(
        [`${modifier}+a`, listener],
        [`${modifier}+b`, listener]
      );
      document.addEventListener('keydown', handler);
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'a',
          [`${modifier === 'super' || modifier === 'cmd' ? 'meta' : modifier}Key`]:
            true,
        })
      );
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'b',
          [`${modifier === 'super' || modifier === 'cmd' ? 'meta' : modifier}Key`]:
            true,
        })
      );

      expect(listener).toHaveBeenCalledTimes(2);
    }
  );
});
