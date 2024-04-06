import * as vscode from 'vscode';

enum SkipAction {
  Stop,
  Skip,
  StopInNextChar,
}

const extensionId = 'handy-vscode';

function prevChar(editor: vscode.TextEditor,
                  pos: vscode.Position): vscode.Position {
  var offset = editor.document.offsetAt(pos);
  if (offset > 0) {
    --offset;
  }
  return editor.document.positionAt(offset);
}

function skipChars(editor: vscode.TextEditor,
                   pos: vscode.Position,
                   delta: number,
                   skipCharCallback: (char: string) => SkipAction): vscode.Position {
  var p = pos;
  if (delta < 0)
    p = prevChar(editor, p);

  let doc = editor.document;
  var line = doc.lineAt(p);
  var lastLine = doc.lineAt(doc.lineCount - 1);
  var offset = doc.offsetAt(p);
  var lastOffset = doc.offsetAt(lastLine.range.end);

  while ((delta < 0 && offset >= 0) ||
         (delta > 0 && offset <= lastOffset)) {
    // Go to next line non-empty line
    if (pos.line != p.line) {
      if (delta > 0)
        pos = p;

      let skip = skipCharCallback('\n');
      if (skip != SkipAction.Skip)
        break;

      if (delta < 0)
        pos = p;

      line = doc.lineAt(p);
    }

    if (delta > 0)
      pos = p;

    let chr = (p.character < line.text.length ?
      line.text.charAt(p.character): '\n');

    let skip = skipCharCallback(chr);
    if (skip == SkipAction.Stop)
      break;

    if (delta < 0) {
      pos = p;
      if (skip == SkipAction.StopInNextChar)
        break;
    }

    offset += delta;
    p = doc.positionAt(offset);

    if (skip == SkipAction.StopInNextChar) {
      pos = p;
      break;
    }
  }
  return pos;
}

function charIsWhitespace(char: string) {
  return (char == ' ' ||
          char == '\t' ||
          char == '\n' ||
          char == '\r');
}

function charIsPunct(char: string) {
  return (char == '.' ||
    char == ';' ||
    char == '=' ||
    char == '!' ||
    char == '+' ||
    char == '-' ||
    char == '/' ||
    char == '*' ||
    char == '&' ||
    char == '|' ||
    char == '^');
}

function jumpExpr(delta: number) {
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  var pos = editor.selection.active;
  var balance = 0;
  var enterParens = true;

  pos = skipChars(editor, pos, delta,
                  char => {
    return charIsWhitespace(char) ||
           charIsPunct(char) ? SkipAction.Skip: SkipAction.Stop;
  });
  pos = skipChars(editor, pos, delta, char => {
    switch (char) {

      case '{':
      case '(':
      case '[':
        if (balance == 0 && !enterParens)
          return SkipAction.Stop;

        balance += delta;
        if (delta < 0) {
          if (balance < 0)
            return SkipAction.Stop;
          else if (balance == 0)
            return SkipAction.StopInNextChar;
        }
        break;

      case '}':
      case ')':
      case ']':
        if (balance == 0 && !enterParens)
          return SkipAction.Stop;

        balance -= delta;
        if (delta > 0) {
          if (balance < 0)
            return SkipAction.Stop;
          else if (balance == 0)
            return SkipAction.StopInNextChar;
        }
        break;

      default:
        if ((balance == 0) &&
            (charIsWhitespace(char) || charIsPunct(char))) {
          return SkipAction.Stop;
        }
        break;
    }
    enterParens = false;
    return SkipAction.Skip;
  });

  editor.selection = new vscode.Selection(pos, pos);
}

export function activate(context: vscode.ExtensionContext) {
  const cursorExprLeftId = extensionId + '.cursorExprLeft';
  const cursorExprLeft = () => jumpExpr(-1);

  const cursorExprRightId = extensionId + '.cursorExprRight';
  const cursorExprRight = () => jumpExpr(+1);

  context.subscriptions.push(vscode.commands.registerCommand(cursorExprLeftId, cursorExprLeft));
  context.subscriptions.push(vscode.commands.registerCommand(cursorExprRightId, cursorExprRight));
}
