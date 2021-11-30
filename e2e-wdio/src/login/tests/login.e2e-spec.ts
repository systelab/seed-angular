import { LoginPage} from '../page-objects/login.po';
import { MainPage } from '../../main/page-objects/main.po';
import { GeneralParameters } from '../../../general-parameters';
import { LoginActionService } from '../services/login-action.service';
import { ReportUtility, TestIdentification } from 'systelab-components-wdio-test';


describe('TC0002_LoginManagement_e2e', () => {
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

	it('Set a valid username and password', async () =>
	{
		await LoginActionService.login(loginPage);
		await mainPage.waitToBePresent();

		await ReportUtility.addExpectedResult('The logged user is Administrator', async () =>
		{
			expect(await mainPage.getFullUsernameField().getText()).toEqual('Administrator');
		});
	});

	it('Set an invalid username and password', async () =>
	{
		const wrongUser = {
			user: 'noUser',
			password: 'noPass'
		};
		await LoginActionService.login(loginPage, wrongUser.user, wrongUser.password);
	
		await ReportUtility.addExpectedResult('Invalid username or password message is displayed', async () =>
		{
			expect(await loginPage.getMessagePopup().getTextMessage()).toEqual('Invalid username or password');
		});
	});
});
