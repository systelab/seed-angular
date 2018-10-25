import { browser, by, element } from 'protractor';

export class LoginPage {
	public appName: string = "<not retrieved yet, available after calling navigateToHomePage()>";
	public appDescription: string = "<not retrieved yet, available after calling navigateToHomePage()>";
	public appVersion: string = "<not retrieved yet, available after calling navigateToHomePage()>";
	public appCopyright: string = "<not retrieved yet, available after calling navigateToHomePage()>";

	private retrieveAppParams(object: LoginPage) {
		this.getMainWindow()
			.all(by.className('slab-text'))
			.get(0)
			.getText()
			.then(function(inText) {
				object.appName = inText.trim();
			});
		this.getMainWindow()
			.all(by.className('slab-text'))
			.get(1)
			.getText()
			.then(function(inText) {
				object.appDescription = inText.trim();
			});
		this.getMainWindow()
			.all(by.className('slab-text'))
			.get(2)
			.getText()
			.then(function(inText) {
				object.appVersion = inText.trim();
			});
		this.getMainWindow()
			.all(by.className('slab-text'))
			.get(4)
			.getText()
			.then(function(inText) {
				object.appCopyright = inText.trim();
			});
	}

	navigateToHomePage() {
		browser.get('/');
		this.retrieveAppParams(this);
	}

	//TODO: Rename to LoginUserNameInput (systelab-login)
	getUsernameField() {
		return element(by.id('inputUserName'));
	}

	//TODO: Rename to LoginPasswordInput (systelab-login)
	getPasswordField() {
		return element(by.id('inputPassword'));
	}

	//TODO: Set id to the button and access by ID
	getEnterButton() {
		return element(by.buttonText('Enter')); // this depends on the system locale...
	}

	getPopupMessage() {
		return element(by.id('popup-message'));
	}

	getMainWindow() {
		return element(by.tagName('systelab-login'));
	}

	//TODO: Move to a navigation utils
	login() {
		this.getUsernameField()
			.sendKeys(browser.params.login.user);
		this.getPasswordField()
			.sendKeys(browser.params.login.password);
		this.getEnterButton()
			.click();
	}
}
