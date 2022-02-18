import * as vscode from 'vscode';
import Result from './result';
import VizzuDataPreprocessor from './vizzu-dataset';

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		enableScripts: true,
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

export default class CodeCountVizzuPanel {
	public static currentPanel: CodeCountVizzuPanel | undefined;
	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];
	static _data: VizzuDataPreprocessor | undefined;
	static _mainPage: String = '';
	static _dateString: String = '';
	static _rootDirString: String = '';

	public static async createOrShow(extensionUri: vscode.Uri, result: Result[], dateStr: String, dirStr: String) {
		CodeCountVizzuPanel._dateString = dateStr;
		CodeCountVizzuPanel._rootDirString = dirStr;
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		
		if (CodeCountVizzuPanel.currentPanel) {
			CodeCountVizzuPanel.currentPanel._panel.reveal(column);
			return;
		}
		
		const panel = vscode.window.createWebviewPanel(
			'detailed', 'Code count vizualization',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri)
		);

		if (CodeCountVizzuPanel._mainPage.length == 0) {
			const htmlPathOnDisk = vscode.Uri.joinPath(extensionUri, 'media', 'main.html');
			let doc = await vscode.workspace.openTextDocument(htmlPathOnDisk);
			CodeCountVizzuPanel._mainPage = doc.getText();
		}

		CodeCountVizzuPanel.currentPanel = new CodeCountVizzuPanel(panel, extensionUri);
		this._data = new VizzuDataPreprocessor();
		let sorted = this._data.sortByLanguagesAndLinesCount(result);
		this._data.makeDataTable(sorted);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		CodeCountVizzuPanel.currentPanel = new CodeCountVizzuPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._generatePage();
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._generatePage();
				}
			},
			null,
			this._disposables
		);

		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'showlog':
						console.log('Vizzu web view: ' + message.text);
						return;
					case 'showinfo':
						vscode.window.showInformationMessage(message.text);
						return;
					case 'showerror':
						vscode.window.showErrorMessage(message.text);
						return;
					case 'datarequest':
						if (CodeCountVizzuPanel._data != undefined) {
							let data = CodeCountVizzuPanel._data.getDataTable();
							this._panel.webview.postMessage(
								{ command: 'dataready', data: data });
							}
						return;
					case 'inforequest':
						if (CodeCountVizzuPanel._data != undefined) {
							let info = {
								rootDir: CodeCountVizzuPanel._rootDirString,
								files: CodeCountVizzuPanel._data.fileCount,
								date: CodeCountVizzuPanel._dateString,
								commentCount: CodeCountVizzuPanel._data.commentLinesCount,
								blankCount: CodeCountVizzuPanel._data.blankLinesCount,
								codeCount: CodeCountVizzuPanel._data.codeLinesCount,
								depth: CodeCountVizzuPanel._data.dirStructureDepth
							};
							this._panel.webview.postMessage(
								{ command: 'infoready', data: info });
							}
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public refreshCodeCountData() {
		this._panel.webview.postMessage({ command: 'refresh' });
	}

	public dispose() {
		CodeCountVizzuPanel.currentPanel = undefined;
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _collectAnimationScripts(dir: String) {
		let result: String = '';
		const fs = require('fs');
		const dirPath = fs.readdirSync(dir);
		dirPath.map((item: String) => {
			let pathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media');
			pathOnDisk = vscode.Uri.joinPath(pathOnDisk, 'animations');
			pathOnDisk = vscode.Uri.joinPath(pathOnDisk, item.toString());
			const scriptUri = pathOnDisk.with({ 'scheme': 'vscode-resource' });
			result += '<script src="' + scriptUri.toString() + '"></script>\n';
		});
		return result;
	}

	private _generatePage() {
		let webview = this._panel.webview;
		const pathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media');
		const scriptPathOnDisk = vscode.Uri.joinPath(pathOnDisk, 'main.js');
		const scriptUri = (scriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
		const stylesControlPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'controls.css');
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
		const stylesCtrlUri = webview.asWebviewUri(stylesControlPath);
		let content = CodeCountVizzuPanel._mainPage;
		content = content.replace('${stylesResetUri}', stylesResetUri.toString());
		content = content.replace('${stylesMainUri}', stylesMainUri.toString());
		content = content.replace('${stylesCtrlUri}', stylesCtrlUri.toString());
		content = content.replace('${scriptUri}', '<script src="' + scriptUri.toString() + '"></script>');
		const animScripts = this._collectAnimationScripts(vscode.Uri.joinPath(pathOnDisk, 'animations').path);
		content = content.replace('${scriptAnim}', animScripts.toString());
		this._panel.webview.html = content.valueOf();
	}
}
