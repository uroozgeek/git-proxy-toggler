import * as vscode from 'vscode';
import * as child_process from 'child_process';

let statusBar: vscode.StatusBarItem;

async function setUnsetGitProxy() {
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
		//Unset Git proxy
		unsetGitProxy();
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
		//Set Git proxy
		setGitProxy(customProxyUrl);
		vscode.window.showInformationMessage(`Git proxy set to ${customProxyUrl}.`);
	}

	// Update StatusBar item after toggling Git proxy
	updateStatusBar();
}

function toggleGitProxy() {
	const currentProxyUrl = getCurrentProxyUrl();
	if (currentProxyUrl) {
		// Proxy is set
		unsetGitProxy();
		vscode.window.showInformationMessage('Git proxy unset.');
	} else {
		// Proxy is not set
		// Get the default proxy URL from extension settings
		const config = vscode.workspace.getConfiguration('gitProxyToggler');
		const defaultProxyUrl = config.get<string>('defaultProxyUrl') || '';
		setGitProxy(defaultProxyUrl);
		vscode.window.showInformationMessage(`Git proxy set to ${defaultProxyUrl}.`);
	}
	// Update StatusBar item after toggling Git proxy
	updateStatusBar();
}

function setGitProxy(proxyUrl: string) {
	child_process.execSync(`git config --global http.proxy ${proxyUrl}`);
	child_process.execSync(`git config --global https.proxy ${proxyUrl}`);
}

function unsetGitProxy() {
	child_process.execSync('git config --global --unset http.proxy');
	child_process.execSync('git config --global --unset https.proxy');
}

function getCurrentProxyUrl(): string {
	try {
		return child_process.execSync('git config --global --get http.proxy').toString().trim();
	} catch (error) {
		return '';
	}
}

function updateStatusBar() {
	const currentProxyUrl = getCurrentProxyUrl();
	if (currentProxyUrl) {
		// Proxy is set
		statusBar.text = `$(link) Git Proxy: ${currentProxyUrl}`;
		statusBar.tooltip = 'Click to unset Git Proxy';
	} else {
		// Proxy is not set
		statusBar.text = `$(circle-slash) Git Proxy: Not Set`;
		statusBar.tooltip = 'Click to set Git Proxy';
	}
	statusBar.show();
}

export function activate(context: vscode.ExtensionContext) {
	// Create a StatusBar item
	statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBar.command = 'extension.toggleGitProxy';
	context.subscriptions.push(statusBar);

	let statusBarCommand = vscode.commands.registerCommand('extension.toggleGitProxy', toggleGitProxy);
	context.subscriptions.push(statusBarCommand);

	let setUnsetProxyCommand = vscode.commands.registerCommand('extension.setUnsetGitProxy', setUnsetGitProxy);
	context.subscriptions.push(setUnsetProxyCommand);

	updateStatusBar();
}

export function deactivate() { }