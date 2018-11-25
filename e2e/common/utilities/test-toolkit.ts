import { browser } from 'protractor';
import { JSConsole } from './js-console';

declare const allure: any;

export class TestToolkit {

	private static console = new JSConsole();

	public static init(tms: string, feature: string, version: string, user: string) {
		allure.addLabel('tms', tms);
		allure.addLabel('feature', feature);
		browser.driver.getCapabilities()
			.then((caps) => {
				browser.browserName = caps.get('browserName');
				allure.addLabel('browser', browser.browserName);
			});
		if (version) {
			allure.addLabel('appVersion', version);
		}
		if (user) {
			allure.addLabel('tester', user);
		}
		allure.addLabel('testExecutionDateTime', new Date().toLocaleString());
	}

	public static clearConsole() {
		return this.console.clear();
	}

	public static hasErrorsInConsole() {
		return this.console.hasErrors();
	}
}
