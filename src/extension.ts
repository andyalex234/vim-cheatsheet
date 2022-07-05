import * as vscode from "vscode";
import { getWebviewContent } from "./webviewContent";
import { join } from "path";
import { selectRandomQuize } from "./quize";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vim-cheatsheet.open", async () => {
      const styleRoot = vscode.Uri.file(join(context.extensionPath, "style"));
      const imagesRoot = vscode.Uri.file(join(context.extensionPath, "images"));

      //Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        "vim-cheatsheet",
        "Vim cheatsheet",
        vscode.ViewColumn.Beside,
        {
          localResourceRoots: [styleRoot, imagesRoot],
          enableScripts: true,
        }
      );

      const stylePath = panel.webview.asWebviewUri(styleRoot);
      const imagesPath = panel.webview.asWebviewUri(imagesRoot);
      const cspSource = panel.webview.cspSource;

      //And set its HTML content
      panel.webview.html = getWebviewContent(cspSource, stylePath, imagesPath);
      const quize = selectRandomQuize();
      const selectedAns = await vscode.window.showInformationMessage(
        quize.q,
        quize.opt1,
        quize.opt2
      );

      if (selectedAns) {
        if (selectedAns === quize.ans) {
          vscode.window.showInformationMessage(
            `You are correct! the answer is ${quize.ans}`
          );
        } else {
          vscode.window.showErrorMessage(
            `Wrong the the correct answer is ${quize.ans}`
          );
        }
      }
    })
  );
}

export function deactivate() {}
