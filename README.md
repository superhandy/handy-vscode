# handy-vscode

This is a *work-in-progress* extension to implement
[the handy mode](https://github.com/superhandy/intro) for
[VS Code](https://github.com/microsoft/vscode/).

Handy offers levels of keyboard bindings to incorporate them
progressively. At the moment we have a small subset of commands
described in the following sections.

You can change this level in your user settings handy-vscode level
(`"handy-vscode.level": 7` by default).

## Level 1 - JLIK

Character and line movements with <kbd>Alt+JLIK</kbd> keys.

          .-----.
          |  I  |
    .-----'     '-----.
    |  J     K     L  |
    '-----------------'

This set of keys simulate the arrow keys of any keyboard but they are
located in the home row mainly (JKL) so you don't have to move your
hand to move the cursor:

* <kbd>Alt+J</kbd>: Just like <kbd>Left</kbd> arrow key, moves the
  cursor one character to the left (`cursorLeft`)
* <kbd>Alt+L</kbd>: Just like <kbd>Right</kbd> arrow key, moves the
  cursor one character to the left (`cursorRight`)
* <kbd>Alt+I</kbd>: Just like <kbd>Up</kbd> arrow key, moves the
  cursor to the previous line (`cursorUp`)
* <kbd>Alt+K</kbd>: Just like <kbd>Down</kbd> arrow key, moves the
  cursor to the next line (`cursorDown`)

And with the <kbd>Shift</kbd> modifier:

* <kbd>Shift+Alt+J</kbd>: Jumps the [balanced
  expression](#balanced-expression) at the left
  (`handy-vscode.cursorExprLeft`)
* <kbd>Shift+Alt+L</kbd>: Jumps the [balanced
  expression](#balanced-expression) at the right
  (`handy-vscode.cursorExprRight`)
* <kbd>Shift+Alt+I</kbd>: Just like <kbd>Page Up</kbd> key, jumps to
  the previous page (`cursorPageUp`)
* <kbd>Shift+Alt+K</kbd>: Just like <kbd>Page Down</kbd> key, jumps to
  the next page (`cursorPageDown`)

TODO: Jumping between string limits (`"..."`) is not supported yet.

### Balanced Expression

What is a *balanced expression*? It can be anything that is balanced
in the actual programming language. For example, on mathematical
expression, it should jump between `(...)`

    x= ( (a+2)  * y -  (5*z) )
        ^-----^       ^-----^
      ^----------------------^

On programming languages it should jump between balanced strings
limits `"..."`, scopes `{...}`, array indexer `[...]`, etc. When none
of these characters are found, it should move just through words.

## Level 2 - NM

Prefix for commands with <kbd>Alt+M</kbd> and cancel action with
<kbd>Alt+N</kbd>.

                .-----.
                |     |
          .-----'     '-----.
          |                 |
    .-----'-----------------'
    |  N     M  |
    '-----------'

* <kbd>Alt+N</kbd>: Cancels the active selection or other commands.
* <kbd>Alt+M ...</kbd>: Prefix key for other key shortcuts, similar to `Ctrl+K ...`.
* <kbd>Alt+M S</kbd>: Saves the active file (`workbench.action.files.save`).
* <kbd>Alt+M Alt+S</kbd>: Saves all files (`workbench.action.files.saveAll`).
* <kbd>Alt+M Alt+F</kbd>: Quick open a file, just like <kbd>Ctrl+P</kbd> (`workbench.action.quickOpen`).
* <kbd>Alt+M Alt+G</kbd>: Find text in files (`workbench.action.findInFiles`).

## Level 3 - UO

Words movement with <kbd>Alt+U</kbd> and <kbd>Alt+O</kbd> keys.

          .-----.-----.-----.
          |  U  |     |  O  |
          |-----'     '-----|
          |                 |
    .-----'-----------------'
    |           |
    '-----------'

* <kbd>Alt+U</kbd>: Jumps the word at the left (`cursorWordLeft`)
* <kbd>Alt+O</kbd>: Jumps the word at the right (`cursorWordRight`)

* <kbd>Shift+Alt+U</kbd>: TODO Not available yet.
* <kbd>Shift+Alt+O</kbd>: TODO Not available yet.

## Level 4 - ZB

Enables <kbd>Alt+ZXCVB</kbd> and <kbd>Alt+Spacebar</kbd>.

                                        .-----.-----.-----.
                                        |     |     |     |
                                        |-----'     '-----|
                                        |                 |
    .-----------------------------.-----'-----------------'
    |  Z     X     C     V     B  |           |
    '-----------.                 '-----------|
                |             SPC             |
                '-----------------------------'

* <kbd>Alt+Z</kbd>: Undoes the last action, just like pressing <kbd>Ctrl+Z</kbd> (`undo`)
* <kbd>Alt+X</kbd>: Cuts the selection, like <kbd>Ctrl+X</kbd> (`editor.action.clipboardCutAction`)
* <kbd>Alt+C</kbd>: Copies the selection, like <kbd>Ctrl+C</kbd> (`editor.action.clipboardCopyAction`)
* <kbd>Alt+V</kbd>: Pastes the clipboard content, like <kbd>Ctrl+V</kbd> (`editor.action.clipboardPasteAction`)
* <kbd>Alt+B</kbd>: Opens other editors, like <kbd>Ctrl+K Ctrl+P</kbd> (`workbench.action.showAllEditors`).

## Level 5

Enables <kbd>Alt+YH</kbd> keys.

                                  .-----.-----.-----.-----.
                                  |  Y  |     |     |     |
                                  |     |-----'     '-----|
                                  |  H  |                 |
    .-----------------------------|-----'-----------------'
    |                             |           |
    '-----------.                 '-----------|
                |                             |
                '-----------------------------'

* <kbd>Alt+Y</kbd>: Finds text or goes to the next match (`actions.find` or `editor.action.nextMatchFindAction`).
* <kbd>Alt+H</kbd>: Goes to the beginning of line (`cursorHome`).

* <kbd>Shift+Alt+Y</kbd>: Finds text or goes to the previous match (`actions.find` or `editor.action.previousMatchFindAction`).
* <kbd>Shift+Alt+H</kbd>: Goes to the end of line (`cursorEnd`).

## Level 6 - WERD

Keys to delete characters and words.

          .-----------------.     .-----.-----.-----.-----.
          |  W     E     R  |     |     |     |     |     |
          '-----.           '-----|     |-----'     '-----|
                |  D     F     G  |     |                 |
    .-----------'-----------------|-----'-----------------'
    |                             |           |
    '-----------.                 '-----------|
                |                             |
                '-----------------------------'

* <kbd>Alt+W</kbd>: TODO Not available yet.
* <kbd>Alt+E</kbd>: Deletes the word at the left side (`deleteWordLeft`).
* <kbd>Alt+R</kbd>: Deletes the word at the right side (`deleteWordRight`).
* <kbd>Alt+D</kbd>: Just like pressing the <kbd>Backspace</kbd> key to delete the character at the left (`deleteLeft`).
* <kbd>Alt+F</kbd>: Just like pressing the <kbd>Delete</kbd> key to delete the character at the right (`deleteRight`).
* <kbd>Alt+G</kbd>: TODO Not available yet.

## Level 7

TODO Not available yet.
