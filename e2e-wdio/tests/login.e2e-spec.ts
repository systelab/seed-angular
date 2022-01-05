import { AssertionUtility, ReportUtility, TestIdentification } from "systelab-components-wdio-test";

import { LoginPage, MainPage } from "@e2e-pages";
import { GeneralParameters } from "@e2e-utils";
import { LoginActionService } from "@e2e-services";


describe("TC0002_LoginManagement_e2e", () => {
    let loginPage: LoginPage;
    let mainPage: MainPage;

    beforeEach(async () => {
        TestIdentification.setTmsLink("TC0002_LoginManagement_e2e");
        TestIdentification.setDescription("Goal: The purpose of this test case is to verify the login and log out functionalities");
        TestIdentification.setAppVersion(GeneralParameters.appVersion);
        TestIdentification.captureEnvironment();

        loginPage = new LoginPage();
        mainPage = new MainPage();
    });

    it("Fill in the login form with a valid username and password", async () =>
    {
        await LoginActionService.login(loginPage);
        await mainPage.waitToBePresent();

        await ReportUtility.addExpectedResult("The logged user is 'Administrator'", async () => {
            AssertionUtility.expectEqual(await mainPage.getFullUsernameField().getText(), "Administrator");
        });
    });

    it("Fill in the login form with an invalid username and password", async () =>
    {
        const wrongUser = {
            user: "noUser",
            password: "noPass"
        };
        await LoginActionService.login(loginPage, wrongUser.user, wrongUser.password);

        await ReportUtility.addExpectedResult("Message popup with 'Invalid username or password' text is displayed", async () => {
            AssertionUtility.expectEqual(await loginPage.getMessagePopup().getTextMessage(), "Invalid username or password");
        });
    });
});
