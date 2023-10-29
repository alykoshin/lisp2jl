/** @format */

import path from 'path';
import {compileFileDir} from './lib/compile-pegjs';
import {downloads_abs_path, lispGrammarPathname} from './config';

async function run() {
  let src_path;
  if (process.argv[2]) {
    src_path = process.argv[2];
  } else {
    src_path = downloads_abs_path;
    console.log(
      `Source path to translate not provided; using default: "${src_path}"`
    );
  }
  await compileFileDir(src_path, lispGrammarPathname);
}
run();
