/** @format */

import path from 'path';
import {compileFileDir, parseSourceWithGrammarFile} from './lib/compile-pegjs';
import {
  compile_ast2jl_str_js,
  compile_ast2jl_str_json,
  compile_ast2jl_str_ts,
} from './lib/ast2jl';
import {grammarPathname} from './config';

function print(name: string, source: string) {
  console.log(name + ':');
  console.log('------------------------------');
  console.log(source);
  console.log('------------------------------');
  console.log();
}

async function run() {
  const lispSource = `;; Demo function 
(defun pair. (x y)
  (cond ((and. (null. x) (null. y)) '())
        ((and. (not. (atom x)) (not. (atom y)))
         (cons (list. (car x) (car y))
               (pair. (cdr x) (cdr y))))))`;

  print('Original LISP source', lispSource);

  const parsed_ast = await parseSourceWithGrammarFile(
    lispSource,
    grammarPathname
  );

  // Compile AST to JL/JSON and save to file

  const compiledJson = await compile_ast2jl_str_json(parsed_ast);
  print('Translated to JSON', compiledJson);

  const compiledJs = await compile_ast2jl_str_js(parsed_ast);
  print('Translated to Javascript', compiledJs);

  const compiledTs = await compile_ast2jl_str_ts(parsed_ast);
  print('Translated to Typescript', compiledTs);
}
run();
