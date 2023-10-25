<!-- @format -->

# lisp2jl - LISP to JSON-LISP Translator

## Usage:

### To run demo translation LISP to JSON-LISP:

```shell
yarn run demo
```

Original LISP source:

<!-- @prettier-ignore -->
```lisp
;; Demo function
(defun pair. (x y)
  (cond ((and. (null. x) (null. y)) '())
        ((and. (not. (atom x)) (not. (atom y)))
         (cons (list. (car x) (car y))
               (pair. (cdr x) (cdr y))))))
``` 

Translated to JSON:

```json
[
  [ ";", ";; Demo function " ],
  ["defun", "pair.", ["x", "y"],
    ["cond", [["and.", ["null.", "x"], ["null.", "y"]], ["quote",[]]],
          [["and.", ["not.", ["atom", "x"]], ["not.", ["atom", "y"]]],
           ["cons", ["list.", ["car", "x"], ["car", "y"]],
                 ["pair.", ["cdr", "x"], ["cdr", "y"]]]]]]
]      
```

Translated to Javascript:

```javascript
const code = [
  // ;; Demo function
  ["defun", "pair.", ["x", "y"],
    ["cond", [["and.", ["null.", "x"], ["null.", "y"]], ["quote",[]]],
          [["and.", ["not.", ["atom", "x"]], ["not.", ["atom", "y"]]],
           ["cons", ["list.", ["car", "x"], ["car", "y"]],
                 ["pair.", ["cdr", "x"], ["cdr", "y"]]]]]]
];

module.exports = { code }
```

Translated to Typescript:

```typescript
export const code = [
  // ;; Demo function
  ["defun", "pair.", ["x", "y"],
    ["cond", [["and.", ["null.", "x"], ["null.", "y"]], ["quote",[]]],
          [["and.", ["not.", ["atom", "x"]], ["not.", ["atom", "y"]]],
           ["cons", ["list.", ["car", "x"], ["car", "y"]],
                 ["pair.", ["cdr", "x"], ["cdr", "y"]]]]]]
];

export default code;
```

### To download some examples of LISP source files and LISP grammar files in Peg.js format:

```shell
yarn run download
```

### To translate all downloaded files:

```shell
yarn run translate
```

---

## References

### Existing Peggy/Peg.js based LISP parsers:

- LISP Parser -- Lisp.js Project -- [https://github.com/devijvers/lisp.js/blob/master/lisp/grammar/lisp.pegjs](https://github.com/devijvers/lisp.js/blob/master/lisp/grammar/lisp.pegjs)
- LISP Parser -- Inertia Project -- [https://github.com/honza/inertia/blob/master/inertia/grammar.pegjs](https://github.com/honza/inertia/blob/master/inertia/grammar.pegjs)
- Scheme parser -- Nconc Project -- [https://github.com/patrickdlogan/nconc/blob/master/public/scripts/nconc.pegjs](https://github.com/patrickdlogan/nconc/blob/master/public/scripts/nconc.pegjs)

> Source: [https://github.com/peggyjs/peggy/wiki/Projects-Using-Peggy](https://github.com/peggyjs/peggy/wiki/Projects-Using-Peggy)

### Peggy

Online Peggy Parser Generator

https://peggyjs.org/online.html
