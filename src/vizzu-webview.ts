import * as vscode from 'vscode';
import Result from './result';
import VizzuDataFormatter from './vizzu-dataset';

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
	static _data: any;
	static _mainPage: String = '';

	public static async createOrShow(extensionUri: vscode.Uri, result: Result[]) {
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
		const formatter = new VizzuDataFormatter();
		formatter.makeDataTable(result);
		this._data = formatter.getDataTable();
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
					case 'showinfo':
						vscode.window.showInformationMessage(message.text);
						return;
					case 'showerror':
						vscode.window.showErrorMessage(message.text);
						return;
					case 'datarequest':
						this._panel.webview.postMessage(
							{ command: 'dataready', data: CodeCountVizzuPanel._data });
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

	private _generatePage() {
		let webview = this._panel.webview;
		const pathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media');
		const scriptPathOnDisk = vscode.Uri.joinPath(pathOnDisk, 'main.js');
		// @ts-ignore
		const scriptUri = (scriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
		// @ts-ignore
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		// @ts-ignore
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
		let content = CodeCountVizzuPanel._mainPage;
		content = content.replace('${stylesResetUri}', stylesResetUri.toString());
		content = content.replace('${stylesMainUri}', stylesMainUri.toString());
		content = content.replace('${scriptUri}', scriptUri.toString());
		this._panel.webview.html = content.valueOf();
	}
}
