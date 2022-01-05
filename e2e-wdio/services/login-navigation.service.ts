import { LoginPage } from "@e2e-pages";
import { LoginActionService } from "@e2e-services";


export class LoginNavigationService {
    public static async navigateToHomePage(loginPage: LoginPage) {
        await browser.url("/#/login");
        await LoginActionService.setAppParams(loginPage);
    }
}
