import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios'; // Asegúrate de tener axios instalado

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (document.languageId === 'css' && document.fileName.endsWith('.css')) {
            minifyCSS(document.fileName);
        }
    });
}

async function minifyCSS(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    try {
        const response = await axios.post('https://www.toptal.com/developers/cssminifier/api/raw', {
            css: fileContent
        });

        const minifiedCSS = response.data.minifiedCss;
        const newFilePath = filePath.replace('.css', '.min.css');
        fs.writeFileSync(newFilePath, minifiedCSS);

        vscode.window.showInformationMessage(`Archivo minificado guardado en: ${newFilePath}`);
    } catch (error) {
        vscode.window.showErrorMessage('Error al minificar el CSS: ' + error.message);
    }
}

export function deactivate() {}
