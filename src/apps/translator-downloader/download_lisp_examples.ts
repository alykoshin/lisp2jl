/** @format */

import fs from 'fs/promises';
import path from 'path';
import * as mkdirp from 'mkdirp';
import axios from 'axios';
import {mkdir} from 'fs';
import {downloads_abs_path} from '../translator/config';

function primitive_url2filename(url: string): string {
  return url
    .replaceAll(/^https?\:\/\//gi, '') // remove http(s) prefix
    .replaceAll(/\?.*$/gi, '') // remove query part from url
    .replaceAll(/[\/\\\|\*\?]/gi, '_'); // replace "/\|*?" with "_"
}

export const download = async function (
  i: number,
  url_def: UrlDef,
  base_path: string
) {
  let url: string;
  let fname;
  if (Array.isArray(url_def)) {
    [url, fname] = url_def;
  } else {
    url = url_def;
    fname = primitive_url2filename(url);
  }
  const method = 'GET';
  const config = {
    method,
    url,
  };
  console.log(`[${i}] ${method} ${url}`);
  const response = await axios(config);
  const {data, status, statusText} = response;

  // console.log(response.headers['content-disposition']);

  console.log(`[${i}] -> ${status} ${statusText} ${data.length} Bytes`);

  const outPathname = path.resolve(base_path, fname);
  console.log(`[${i}] --> ${outPathname}`);
  await fs.writeFile(outPathname, data, 'utf8');
  return data;
};

// ["setq", "$$path", "./resources/downloads/"],
//       ["$shelljs", "mkdir", "-p", "${ $$path }" ],
//       [ "plist",
//         ["write-string-into-file",  "${ $$path }sourceforge.net_p_sbcl_sbcl_ci_master_tree_src_code_pred.lisp",
//           ["$axios", "get", "https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/pred.lisp?format=raw"]]

//www.ulisp.com/list?38EL

type UrlDef = string | [string, string];

const sbcl_urls: UrlDef[] = [
  'https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/pred.lisp?format=raw',
  'https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/defmacro.lisp?format=raw',
  'https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/defstruct.lisp?format=raw',
  'https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/deftype.lisp?format=raw',
  'https://sourceforge.net/p/sbcl/sbcl/ci/master/tree/src/code/string.lisp?format=raw',
  //
  'https://github.com/sbcl/sbcl/raw/master/src/code/target-format.lisp',
];
const clisp_urls: UrlDef[] = [
  'https://github.com/JoshCheek/clisp/raw/master/src/format.lisp',
];
const paulgraham_urls: UrlDef[] = [
  'https://sep.turbifycdn.com/ty/cdn/paulgraham/jmc.lisp?t=1688221954&',
];
const mary_urls: UrlDef[] = [
  'https://github.com/andybelltree/Mary/raw/master/demos/tic-tac-toe.lisp',
  'https://github.com/andybelltree/Mary/raw/master/lisp/fnstdlib.lisp',
  'https://github.com/andybelltree/Mary/raw/master/lisp/macrostdlib.lisp',
  'https://github.com/andybelltree/Mary/raw/master/lisp/minstdlib.lisp',
  'https://github.com/andybelltree/Mary/raw/master/lisp/stdlib.lisp',
];
const grammar_urls: UrlDef[] = [
  'https://github.com/devijvers/lisp.js/raw/master/lisp/grammar/lisp.pegjs',
  'https://github.com/honza/inertia/raw/master/inertia/grammar.pegjs',
];
const trivial_download_urls: UrlDef[] = [
  'https://github.com/eudoxia0/trivial-download/raw/master/src/trivial-download.lisp',
  'https://github.com/eudoxia0/trivial-download/raw/master/t/trivial-download.lisp',
];
const lisp_unit_urls: UrlDef[] = [
  'https://gitlab.com/criesbeck/cs325/-/raw/main/lisp-unit/lisp-unit.asd?ref_type=heads',
  'https://gitlab.com/criesbeck/cs325/-/raw/main/lisp-unit/lisp-unit.lisp?ref_type=heads',
  'https://gitlab.com/criesbeck/cs325/-/raw/main/lisp-unit/package.lisp?ref_type=heads',
];
const cl_str_urls: UrlDef[] = [
  'https://github.com/vindarel/cl-str/raw/master/test/test-str.lisp',
  'https://github.com/vindarel/cl-str/raw/master/str.asd',
  'https://github.com/vindarel/cl-str/raw/master/str.lisp',
  'https://github.com/vindarel/cl-str/raw/master/str.test.asd',
];
const ulisp_urls: UrlDef[] = [
  // A simple text adventure game
  // http://www.ulisp.com/show?383X
  //
  // Need to rename the file
  ['http://www.ulisp.com/list?38EL', 'www.ulisp.com_list_38EL.lisp'],
];
const adventure_urls: UrlDef[] = [
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/game.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/game-data.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/game-state.lisp',

  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/game-uis.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/graph-gen.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/main.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/src/scene-descriptors.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/tests/tests.lisp',
  'https://raw.githubusercontent.com/shaaza/text-adventure-game/master/vendor/lisp-unit.lisp',
];
const landoflisp_urls: UrlDef[] = [
  'http://landoflisp.com/guess.lisp',
  'http://landoflisp.com/wizards_game.lisp',
  'http://landoflisp.com/graph-util.lisp',
  'http://landoflisp.com/wumpus.lisp',
  'http://landoflisp.com/orc-battle.lisp',
  'http://landoflisp.com/evolution.lisp',
  'http://landoflisp.com/robots.lisp',
  'http://landoflisp.com/webserver.lisp',
  'http://landoflisp.com/dice_of_doom_v1.lisp',
  'http://landoflisp.com/svg.lisp',
  'http://landoflisp.com/wizard_special_actions.lisp',
  'http://landoflisp.com/lazy.lisp',
  'http://landoflisp.com/dice_of_doom_v2.lisp',
  'http://landoflisp.com/dice_of_doom_v3.lisp',
  'http://landoflisp.com/dice_of_doom_v4.lisp',
];
const metalhead_urls: UrlDef[] = [
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/MetalHead.asd',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/Metalhead-core.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/actions.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/gui.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/package.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/save-core.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/tests.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/util.lisp',
  'https://raw.githubusercontent.com/mswift42/MetalHead/master/world.lisp',
];

const urls: UrlDef[] = [
  // ...grammar_urls,
  // ...sbcl_urls,
  // ...clisp_urls,
  // ...paulgraham_urls,
  // ...mary_urls,
  // ...trivial_download_urls,
  // ...lisp_unit_urls,
  // ...cl_str_urls,
  ...ulisp_urls,
  // ...adventure_urls,
  // ...landoflisp_urls,
  // ...metalhead_urls,
];

async function run() {
  mkdirp.sync(downloads_abs_path);
  const promises = urls.map(
    async (url, i) => await download(i, url, downloads_abs_path)
  );
  await Promise.all(promises);
}
run();
