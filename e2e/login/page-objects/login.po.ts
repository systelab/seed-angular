import { by, element } from 'protractor';
import { Button, InputField, Popup } from 'systelab-components-test';
import { BasePage } from 'systelab-components-test/lib/page-objects/base-page';


export class LoginPage extends BasePage {
    public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';

    public appName = LoginPage.NOT_RETRIEVED;
    public appDescription = LoginPage.NOT_RETRIEVED;
    public appVersion = LoginPage.NOT_RETRIEVED;
    public appCopyright = LoginPage.NOT_RETRIEVED;

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
