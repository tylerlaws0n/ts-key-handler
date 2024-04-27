type ABC =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

type Num = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type KeySymbol =
  | '!'
  | '@'
  | '#'
  | '$'
  | '%'
  | '^'
  | '&'
  | '*'
  | '('
  | ')'
  | '\\'
  | '/'
  | ','
  | '.'
  | '<'
  | '>'
  | '?'
  | ';'
  | ':'
  | '['
  | ']'
  | '{'
  | '}'
  | '-'
  | '_'
  | '='
  | '+'
  | '|'
  | '`'
  | '~'
  | ' ';

export type Key = ABC | Num | KeySymbol;

export type Modifier = 'shift' | 'ctrl' | 'alt' | 'cmd' | 'super';

export type Shortcut =
  | `${Key}`
  | `${Modifier}+${Key}`
  | `${Modifier}+${Modifier}+${Key}`;

export type ShortcutWithHandler = [Shortcut, (e: KeyboardEvent) => void];
