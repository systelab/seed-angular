import { browser, by, element } from 'protractor';
import { BasePage } from '../common/components/base-page';

export class LoginPage extends BasePage {
	public appName = BasePage.NOT_RETRIEVED;
	public appDescription = BasePage.NOT_RETRIEVED;
	public appVersion = BasePage.NOT_RETRIEVED;
	public appCopyright = BasePage.NOT_RETRIEVED;

	constructor() {
		super('systelab-login');
	}

	private retrieveAppParams(object: LoginPage) {
		this.getMainWindow().all(by.className('slab-text')).get(0).getText().then((inText) => {
				object.appName = inText.trim();
			});
		this.getMainWindow().all(by.className('slab-text')).get(1).getText().then((inText) => {
				object.appDescription = inText.trim();
			});
		this.getMainWindow().all(by.className('slab-text')).get(2).getText().then((inText) => {
				object.appVersion = inText.trim();
			});
		this.getMainWindow().all(by.className('slab-text')).get(4).getText().then((inText) => {
				object.appCopyright = inText.trim();
			});
	}

	public navigateToHomePage() {
		browser.get('/');
		this.retrieveAppParams(this);
	}

	// TODO: Rename to LoginUserNameInput (systelab-login)
	public getUsernameField() {
		return element(by.id('inputUserName'));
	}

	// TODO: Rename to LoginPasswordInput (systelab-login)
	public getPasswordField() {
		return element(by.id('inputPassword'));
	}

	// TODO: Set id to the button and access by ID
	public getEnterButton() {
		return element(by.buttonText('Enter')); // this depends on the system locale...
	}

	public getPopupMessage() {
		return element(by.id('popup-message'));
	}

	// TODO: Move to a navigation utils
	public login() {
		this.getUsernameField().sendKeys(browser.params.login.user);
		this.getPasswordField().sendKeys(browser.params.login.password);
		this.getEnterButton().click();
	}
}
