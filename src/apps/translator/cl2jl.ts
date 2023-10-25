/** @format */

import path from 'path';
import {compileFileDir} from './lib/compile-pegjs';
import {downloads_abs_path, grammarPathname} from './config';

async function run() {
  await compileFileDir(downloads_abs_path, grammarPathname);
}
run();
