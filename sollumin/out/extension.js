"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios")); // Asegúrate de tener axios instalado
function activate(context) {
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'css' && document.fileName.endsWith('.css')) {
            minifyCSS(document.fileName);
        }
    });
}
async function minifyCSS(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    try {
        const response = await axios_1.default.post('https://www.toptal.com/developers/cssminifier/api/raw', {
            css: fileContent
        });
        const minifiedCSS = response.data.minifiedCss;
        const newFilePath = filePath.replace('.css', '.min.css');
        fs.writeFileSync(newFilePath, minifiedCSS);
        vscode.window.showInformationMessage(`Archivo minificado guardado en: ${newFilePath}`);
    }
    catch (error) {
        vscode.window.showErrorMessage('Error al minificar el CSS: ' + error.message);
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map