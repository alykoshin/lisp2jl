/** @format */

import path from 'path';

export const downloads_abs_path = path.resolve(
  process.cwd(),
  './resources/downloads/'
);
export const grammarPathname = path.resolve(__dirname, './grammar/lisp.pegjs');
