import {by, element} from 'protractor';
import { Button, InputField, Label, MessagePopup } from 'systelab-components-test';
import {BasePage} from 'systelab-components-test/lib/page-objects/base-page';

export class LoginPage extends BasePage {

	constructor() {
		super('systelab-login');
	}

	public getAppNameLabel(): Label {
		return new Label(this.current.all(by.className('slab-text'))
			.get(0));
	}

	public getAppDescriptionLabel(): Label {
		return new Label(this.current.all(by.className('slab-text'))
			.get(1));
	}

	public getAppVersionLabel(): Label {
		return new Label(this.current.all(by.className('slab-text'))
			.get(2));
	}

	public getAppCopyrightLabel(): Label {
		return new Label(this.current.all(by.className('slab-text'))
			.get(4));
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

	public getMesssagePopup(): MessagePopup {
		return new MessagePopup();
	}
}
