import { Key } from 'react';
import { Shortcut, Modifier, ShortcutWithHandler } from './types';

/**
 * Internal handler for a single shortcut
 *
 * @param event Keyboard event to handle
 * @param shortcut String representation of the shortcut
 * @param listener Callback to trigger when the shortcut is pressed
 */
const _singleShortcutEventHandler = (
  event: KeyboardEvent,
  shortcut: Shortcut,
  listener: (e: KeyboardEvent) => void
) => {
  const key = shortcut.charAt(shortcut.length - 1).toLowerCase() as Key;
  const remaining = shortcut.slice(0, -2); // shortcut without +${key}

  // key is always lowercase, shift should not change it
  if (event.key.toLowerCase() !== key || !remaining.length) {
    if (event.key === key) listener(event);
    return;
  }

  const modifiers = remaining.split('+') as Modifier[];

  for (const modifier of modifiers) {
    if (
      (modifier === 'shift' && !event.shiftKey) ||
      (modifier === 'ctrl' && !event.ctrlKey) ||
      (modifier === 'alt' && !event.altKey) ||
      ((modifier === 'cmd' || modifier === 'super') && !event.metaKey)
    ) {
      return;
    }
  }
  listener(event);
};

/**
 * Handle a single shortcut
 *
 * @param shortcut Keyboard shortcut to listen for
 * @param listener Event listener to call when shortcut is pressed
 * @returns Event listener
 */
export const handleShortcut = (
  shortcut: Shortcut,
  listener: (e: KeyboardEvent) => void
) => {
  return (event: KeyboardEvent) => {
    _singleShortcutEventHandler(event, shortcut, listener);
  };
};

/**
 * Given a list of shortcuts, return a function that can be used as an event
 * listener
 *
 * @param shortcuts List of shortcuts to call when shortcut is pressed
 * @returns Event listener
 */
export const handleShortcuts = (...shortcuts: ShortcutWithHandler[]) => {
  return (event: KeyboardEvent) => {
    shortcuts.forEach(([shortcut, listener]) =>
      _singleShortcutEventHandler(event, shortcut, listener)
    );
  };
};
