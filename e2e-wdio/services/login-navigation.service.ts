import { LoginPage } from "@e2e-pages";
import { LoginActionService } from "@e2e-services";
import { Browser } from "systelab-components-wdio-test";


export class LoginNavigationService {
    public static async navigateToHomePage(loginPage: LoginPage) {
        await Browser.navigateToURL("/#/login");
        await LoginActionService.setAppParams(loginPage);
    }
}
