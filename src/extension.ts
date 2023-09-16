import * as vscode from 'vscode';
import * as child_process from 'child_process';

async function toggleGitProxy() {
	// Check if the Git proxy is currently set
	const currentProxyUrl = getCurrentProxyUrl();

	if (currentProxyUrl) {
		// Git proxy is set
		const choice = await vscode.window.showQuickPick(['Unset Git Proxy', 'Cancel'], {
			placeHolder: `Git proxy is currently set to ${currentProxyUrl}`,
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

		// Get the default proxy URL from extension settings
		const config = vscode.workspace.getConfiguration('gitProxyToggler');
		const defaultProxyUrl = config.get<string>('defaultProxyUrl');

		// Prompt user for custom proxy URL or show default
		const customProxyUrl = await vscode.window.showInputBox({
			prompt: `Enter the custom proxy URL (Default: ${defaultProxyUrl})`,
			placeHolder: 'Proxy URL',
			value: defaultProxyUrl // Show the default value in the input box if set
		});

		if (!customProxyUrl) {
			vscode.window.showInformationMessage('Git proxy not changed.');
			return;
		}

		// Set Git proxy
		child_process.execSync(`git config --global http.proxy ${customProxyUrl}`);
		child_process.execSync(`git config --global https.proxy ${customProxyUrl}`);
		vscode.window.showInformationMessage(`Git proxy set to ${customProxyUrl}.`);
	}
}

function getCurrentProxyUrl(): string {
	try {
		return child_process.execSync('git config --global --get http.proxy').toString().trim();
	} catch (error) {
		return '';
	}
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.toggleGitProxy', toggleGitProxy);
	context.subscriptions.push(disposable);
}

export function deactivate() { }
