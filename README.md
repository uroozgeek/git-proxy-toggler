# Git Proxy Toggler Extension for Visual Studio Code

![GitHub](https://img.shields.io/github/license/uroozgeek/git-proxy-toggler)
![Install Count](https://img.shields.io/visual-studio-marketplace/i/uroozgeek.git-proxy-toggler?label=Installs)
![Rating](https://img.shields.io/visual-studio-marketplace/r/uroozgeek.git-proxy-toggler?label=Rating)
![Version](https://img.shields.io/visual-studio-marketplace/v/uroozgeek.git-proxy-toggler?label=Version)
![VS Code Compatibility](https://img.shields.io/badge/VS%20Code%20Compatibility-Compatible-brightgreen)

## Overview

The Git Proxy Toggler extension for Visual Studio Code allows you to easily toggle the Git HTTP proxy settings right from within your code editor. It simplifies the process of enabling or disabling the Git proxy, making it convenient for development in various network environments.

## Features

- Toggle Git HTTP proxy settings with a single click using extension's status bar icon.
- Shows current proxy status in convenient status bar icon
- Set and unset the proxy URL as needed by launching the extension.
- Provides quick access to proxy configuration.

## Installation

You can install this extension via the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=uroozgeek.git-proxy-toggler).

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "Git Proxy Toggler" in the Extensions Marketplace.
4. Click the Install button for the extension.

## Usage

1. Open a project in Visual Studio Code.
2. Use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
3. Type "Set/Unset Git Proxy" and select the command to run.
4. Follow the prompts to set or unset the Git proxy as needed.
5. Also you can quickly toggle(either set the default or unset) the git proxy url by clicking the icon in status bar. 

## Configuration

By default, the extension uses the proxy URL `"http://127.0.0.1:8080"`. You can customize this URL by launching the extension settings and modifying the proxy url or directly modifying `"gitProxyToggler.defaultProxyUrl"` in settings.json file to your desired value.

## License

This extension is licensed under the [MIT License](LICENSE).

## Issues and Feedback

If you encounter any issues, have questions, or would like to provide feedback, please open an issue on the [GitHub repository](https://github.com/uroozgeek/git-proxy-toggler/issues).

## Contribution

Contributions are welcome! If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for details on recent updates and changes.

## Acknowledgments

Thank you to the open-source community and contributors for making this extension possible.

## Author

- [Urooz Ali](https://github.com/uroozgeek)

## Enjoy!

We hope you find this extension useful for your development workflow. Happy coding!
