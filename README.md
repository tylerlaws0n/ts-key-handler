# ts-key-handler

```ts
import { useCallback } from 'react';
import { useKeyHandler } from './use-key-handler';

const handleShiftA = useCallback(
  () => console.log('Shift + A was pressed!'),
  []
);
useKeyHandler('shift+a', handleShiftA);
```

```ts
import { useKeyHandlers } from '@/utils';
const handleShortcuts = useMemo<ShortcutWithHandler[]>(
  () => [
    ['shift+a', handleShiftA],
    ['shift+b', handleShiftB],
  ],
  []
);
useKeyHandlers(handleShortcuts);
```

This is a super minimal type-safe library for handling key events.

I am starting with just react support because that is what I currently use. I have set this up as a monorepo with turbo with the anticipation of being framework agnostic if there is any demand for this.
