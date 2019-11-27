import { by, element } from 'protractor';
import { BasePage } from '../base-page';
import { Button, InputField, Popup } from '../../widgets';


export class LoginPage extends BasePage {
    public appName = BasePage.NOT_RETRIEVED;
    public appDescription = BasePage.NOT_RETRIEVED;
    public appVersion = BasePage.NOT_RETRIEVED;
    public appCopyright = BasePage.NOT_RETRIEVED;

    constructor() {
        super('systelab-login');
    }

    public retrieveAppParams(object: LoginPage) {
        this.current.all(by.className('slab-text')).get(0).getText().then(inText => object.appName = inText.trim());
        this.current.all(by.className('slab-text')).get(1).getText().then(inText => object.appDescription = inText.trim());
        this.current.all(by.className('slab-text')).get(2).getText().then(inText => object.appVersion = inText.trim());
        this.current.all(by.className('slab-text')).get(4).getText().then(inText => object.appCopyright = inText.trim());
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

    public getPopupMessage(): Popup {
        return new Popup(element(by.id('popup-message')));
    }
}
