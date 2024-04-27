import { useEffect } from 'react';
import {Shortcut, handleShortcut} from '@ts-key-handler/core';  


/**
 * Helper hook to handle a single key shortcut with a listener
 *
 * Please memoize your listener! :)
 *
 * @example
 *   const handleShiftA = useCallback((e: KeyboardEvent) => {
 *     console.log('Shift + A pressed!');
 *   }, []);
 *   useKeyHandler('shift+a', handleShiftA);
 *
 * @param shortcut String representation of the shortcut to trigger listener on
 * @param listener Callback to handle event when key shortcut is pressed
 */
export const useKeyHandler = (
  shortcut: Shortcut,
  listener: (e: KeyboardEvent) => void
) => {
  useEffect(() => {
    const handler = handleShortcut(shortcut, listener);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [listener, shortcut]);
};
