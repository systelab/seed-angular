import { browser, by, element } from 'protractor';

export class LoginPage {
	public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';
	public appName = LoginPage.NOT_RETRIEVED;
	public appDescription = LoginPage.NOT_RETRIEVED;
	public appVersion = LoginPage.NOT_RETRIEVED;
	public appCopyright = LoginPage.NOT_RETRIEVED;

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

	public getMainWindow() {
		return element(by.tagName('systelab-login'));
	}

	// TODO: Move to a navigation utils
	public login() {
		this.getUsernameField()
			.sendKeys(browser.params.login.user);
		this.getPasswordField()
			.sendKeys(browser.params.login.password);
		this.getEnterButton()
			.click();
	}
}
