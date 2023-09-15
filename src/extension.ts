import * as vscode from 'vscode';
import * as child_process from 'child_process';

let proxyUrl: string;

async function toggleGitProxy() {
	// Check if the Git proxy is currently set
	const isGitProxySet = gitProxyIsSet();

	if (isGitProxySet) {
		// Git proxy is set
		const choice = await vscode.window.showQuickPick(['Unset Git Proxy', 'Cancel'], {
			placeHolder: `Git proxy is currently set to ${proxyUrl}`,
		});

		if (!choice || choice === 'Cancel') {
			vscode.window.showInformationMessage('Git proxy not changed.');
			return;
		}

		// Unset Git proxy
		child_process.execSync('git config --global --unset http.proxy');
		child_process.execSync('git config --global --unset https.proxy');
		vscode.window.showInformationMessage('Git proxy unset.');
	} else {
		// Git proxy is not set
		const choice = await vscode.window.showQuickPick(['Set Git Proxy', 'Cancel'], {
			placeHolder: 'Git proxy is not set. Do you want to set it?',
		});

		if (!choice || choice === 'Cancel') {
			vscode.window.showInformationMessage('Git proxy not changed.');
			return;
		}

		// Prompt user for custom proxy URL
		const customProxyUrl = await vscode.window.showInputBox({
			prompt: 'Enter the custom proxy URL (e.g., http://yourproxyurl:port)',
			placeHolder: 'Proxy URL',
		});

		if (!customProxyUrl) {
			vscode.window.showInformationMessage('Git proxy not changed.');
			return;
		}

		// Set Git proxy
		child_process.execSync(`git config --global http.proxy ${customProxyUrl}`);
		child_process.execSync(`git config --global https.proxy ${customProxyUrl}`);
		vscode.workspace.getConfiguration('gitProxyToggler').update('proxyUrl', customProxyUrl, vscode.ConfigurationTarget.Global);
		proxyUrl = customProxyUrl; // Update the proxyUrl variable with the custom value
		vscode.window.showInformationMessage(`Git proxy set to ${customProxyUrl}.`);
	}
}

function gitProxyIsSet(): boolean {
	try {
		child_process.execSync('git config --global --get http.proxy');
		return true;
	} catch (error) {
		return false;
	}
}

export function activate(context: vscode.ExtensionContext) {
	// Get the proxy URL from user settings or use a default
	const config = vscode.workspace.getConfiguration('gitProxyToggler');
	proxyUrl = config.get<string>('proxyUrl') || "http://127.0.0.1:8080";

	let disposable = vscode.commands.registerCommand('extension.toggleGitProxy', toggleGitProxy);
	context.subscriptions.push(disposable);
}

export function deactivate() { }
