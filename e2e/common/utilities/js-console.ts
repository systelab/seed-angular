import { browser, promise } from 'protractor';

export class JSConsole {

	public clear() {
		if (browser.params.searchJavascriptConsoleErrors.toString().toLowerCase() === 'true') {
			browser.manage().logs().get('browser');
		}
	}

	public hasErrors(): promise.Promise<any> {
		return new promise.Promise((resolve, reject) => {
			let consoleMessages = '';
			let hasErrors = false;

			if (browser.params.searchJavascriptConsoleErrors.toString().toLowerCase() === 'true') {
				browser.manage().logs().get('browser').then(
						(browserLog) => {
							consoleMessages = require('util').inspect(browserLog).toString();
							hasErrors = !(browser.params.javascriptConsoleErrors.map(x => (consoleMessages.indexOf(x) === -1)).every(x => x));
							resolve(hasErrors);
						},
						(err) => {
							reject(err);
						}
					);
			} else {
				resolve(hasErrors);
			}
		})
	}
}
