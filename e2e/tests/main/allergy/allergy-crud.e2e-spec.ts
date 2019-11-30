import { browser } from 'protractor';
import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login-navigation.service';
import { TestUtil } from '../../../utilities/test-util';
import { ButtonState, FormService } from '../../../services/form.service';
import { MainNavigationService } from '../../../services/main-navigation.service';

declare const allure: any;

describe('TC0002_AllergyManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();

	beforeAll(() => {
		LoginNavigationService.navigateToHomePage(loginPage);
		LoginNavigationService.login(loginPage);
		MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
	});

	beforeEach(() => {
		TestUtil.init('TC0002_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
			loginPage.appVersion, 'userName');
	});

	it('Open allergy creation dialog', () => {
		const title = 'Create Allergy';
		const buttons: ButtonState[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		mainPage.getAllergyAddButton().click();
		FormService.checkDialogTitleAndButtons(mainPage.getAllergyDetailDialog(), title, buttons);
		TestUtil.checkForm(mainPage.getAllergyDetailDialog().getFormData(), 'Allergy Creation is empty');
	});

	it('Close the dialog', () => {
		mainPage.getAllergyDetailDialog().getButtonClose().click();
		allure.createStep('Dialog is closed', () => {
			TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		})();
	});

	it('Create Allergies', () => {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			allure.createStep('Action: Create the allergy ' + i, () => {

				mainPage.getAllergyAddButton().click();
				TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyDetailDialog(), 'Allergy Dialog');
				let formData = mainPage.getAllergyDetailDialog().getFormData(i);

				FormService.fillForm(mainPage.getAllergyDetailDialog().getFormData(i), 'Allergy Creation Form');
				TestUtil.checkForm(formData, 'Allergy Creation is correct');

				mainPage.getAllergyDetailDialog().getButtonSubmit().click();
				TestUtil.checkPageIsPresentAndDisplayed(mainPage);
				TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', i);

				mainPage.getAllergyGrid()
					.getRow(i - 1)
					.then((cellValues) => {
						TestUtil.checkText(Promise.resolve(cellValues[1]), 'Col Name', formData[0].value);
						TestUtil.checkText(Promise.resolve(cellValues[2]), 'Col Signs', formData[1].value);
						TestUtil.checkText(Promise.resolve(cellValues[3]), 'Col Symptoms', formData[2].value);
					});
			})();
		}
	});

	it('Contextual menu at the allergies grid', async () => {

		const menuItems = ['Update', 'Delete'];
		for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
			await allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), async () => {
				await mainPage.getAllergyGrid().clickOnRowMenu(row);
				await mainPage.getAllergyGrid().getMenu().getOptions().then(async (options) => {
						TestUtil.checkText(Promise.resolve(options[0]), 'First Option', menuItems[0]);
						TestUtil.checkText(Promise.resolve(options[1]), 'Second Option', menuItems[1]);
						await mainPage.getAllergyGrid().clickOnHeader();
					});
			})();
		}
	});

	it('The option Update opens Allergy Detail', () => {
		const optionMenuUpdate = 0;
		mainPage.getAllergyGrid().clickOnRowMenu(0);
		mainPage.getAllergyGrid().getMenu().selectOption(optionMenuUpdate);
		TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyDetailDialog(), 'Allergy Dialog');

		mainPage.getAllergyDetailDialog().getButtonClose().click();
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Click on a row and open Allergy Detail', () => {
		mainPage.getAllergyGrid().clickOnCell(0, 'name');
		TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyDetailDialog(), 'Allergy Dialog');
		mainPage.getAllergyDetailDialog().getButtonClose().click();
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Modify Allergies', () => {
		mainPage.getAllergyGrid().clickOnCell(0, 'name');
		TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyDetailDialog(), 'Allergy Dialog');

		TestUtil.checkForm(mainPage.getAllergyDetailDialog().getFormData(1), 'Allergy Management is correct');

		FormService.removeValuesInForm(mainPage.getAllergyDetailDialog().getFormData(), 'Allergy Management');

		FormService.fillForm(mainPage.getAllergyDetailDialog().getFormData(4), 'Allergy Creation to update previous one');
		mainPage.getAllergyDetailDialog().getButtonSubmit().click();

		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		TestUtil.checkNumber(mainPage.getAllergyGrid()
			.getNumberOfRows(), 'Rows in table of Allergies', 3);
	});

	it('Delete all elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Delete the Allergy at the row #${k}`, () => {
				mainPage.getAllergyGrid().clickOnRowMenu(0);
				mainPage.getAllergyGrid().getMenu().selectOption(optionMenuDelete);
				TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', k);
			})();
		}
	});
});
