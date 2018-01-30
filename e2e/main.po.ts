import { browser, by, element } from 'protractor';

export class MainPage {

	getFullUsernameField() {
		return element(by.cssContainingText('.d-block .text-truncate', 'Administrador'));

	}
}
