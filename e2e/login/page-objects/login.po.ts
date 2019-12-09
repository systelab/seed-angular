import {by, element} from 'protractor';
import {Button, InputField, MesssagePopup} from 'systelab-components-test';
import {BasePage} from 'systelab-components-test/lib/page-objects/base-page';
import {GeneralParameters} from '../../general-parameters';

export class LoginPage extends BasePage {

	constructor() {
		super('systelab-login');
	}

	public retrieveAppParams() {
		this.current.all(by.className('slab-text')).get(0).getText().then(inText => GeneralParameters.appName = inText.trim());
		this.current.all(by.className('slab-text')).get(1).getText().then(inText => GeneralParameters.appDescription = inText.trim());
		this.current.all(by.className('slab-text')).get(2).getText().then(inText => GeneralParameters.appVersion = inText.trim());
		this.current.all(by.className('slab-text')).get(4).getText().then(inText => GeneralParameters.appCopyright = inText.trim());
	}

	public getUsernameField(): InputField {
		return new InputField(element(by.id('inputUserName')));
	}

	public getPasswordField(): InputField {
		return new InputField(element(by.id('inputPassword')));
	}

	public getEnterButton(): Button {
		return new Button(element(by.buttonText('Enter'))); // this depends on the system locale...
	}

	public getMesssagePopup(): MesssagePopup {
		return new MesssagePopup();
	}

	public async set(username: string, password: string) {
		await this.getUsernameField().setText(username);
		await this.getPasswordField().setText(password);
	}
}
