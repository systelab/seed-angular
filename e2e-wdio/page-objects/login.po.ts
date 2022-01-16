import { BasePage, Button, InputField, Label, MessagePopup } from "systelab-components-wdio-test";


export class LoginPage extends BasePage {

    constructor() {
        super("systelab-login");
    }

    public getAppNameLabel(): Label {
        return new Label(this.allByCSS(".slab-text").get(0));
    }

    public getAppDescriptionLabel(): Label {
        return new Label(this.allByCSS(".slab-text").get(1));
    }

    public getAppVersionLabel(): Label {
        return new Label(this.allByCSS(".slab-text").get(2));
    }

    public getAppCopyrightLabel(): Label {
        return new Label(this.allByCSS(".slab-text").get(4));
    }

    public getUsernameField(): InputField {
        return new InputField(this.byId("inputUserName"));
    }

    public getPasswordField(): InputField {
        return new InputField(this.byId("inputPassword"));
    }

    public getEnterButton(): Button {
        return new Button(this.byButtonText("Enter")); // this depends on the system locale...
    }

    public getMessagePopup(): MessagePopup {
        return new MessagePopup();
    }
}
