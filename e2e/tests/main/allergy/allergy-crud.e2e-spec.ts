import { browser } from 'protractor';
import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormService } from 'systelab-components-test/lib/services';
import { AllergyDetailDialog } from '../../../page-objects/main/allergy/allergy-detail/allergy-dialog';
import { Grid } from 'systelab-components-test';

declare const allure: any;

describe('TC0002_AllergyManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let allergyDialog: AllergyDetailDialog;
	let allergyGrid : Grid;

	beforeAll(() => {
		LoginNavigationService.login(loginPage);
		MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
		allergyDialog = mainPage.getAllergyDetailDialog();
		allergyGrid = mainPage.getAllergyGrid();
	});

	beforeEach(() => {
		TestUtil.init('TC0002_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
			loginPage.appVersion, 'userName');
	});

	it('Open allergy creation dialog', () => {
		const title = 'Create Allergy';
		const buttons: FormButtonElement[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		mainPage.getAllergyAddButton().click();
		FormService.checkDialogTitleAndButtons(allergyDialog, title, buttons);
		TestUtil.checkForm(allergyDialog.getFormData(), 'Allergy Creation is empty');
	});

	it('Close the dialog', () => {
		allergyDialog.getButtonClose().click();
		allure.createStep('Dialog is closed', () => {
			TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		})();
	});

	it('Create Allergies', () => {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			allure.createStep('Action: Create the allergy ' + i, () => {

				mainPage.getAllergyAddButton().click();
				TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');
				let formData = allergyDialog.getFormData(i);

				FormService.fillForm(allergyDialog.getFormData(i), 'Allergy Creation Form');
				TestUtil.checkForm(formData, 'Allergy Creation is correct');

				allergyDialog.getButtonSubmit().click();
				TestUtil.checkPageIsPresentAndDisplayed(mainPage);
				TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', i);

				allergyGrid
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
				await allergyGrid.clickOnRowMenu(row);
				expect(await allergyGrid.getMenu().getOptions()).toEqual(menuItems);
				await allergyGrid.clickOnHeader();
			})();
		}
	});

	it('The option Update opens Allergy Detail', () => {
		const optionMenuUpdate = 0;
		allergyGrid.clickOnRowMenu(0);
		allergyGrid.getMenu().selectOption(optionMenuUpdate);
		TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');

		allergyDialog.getButtonClose().click();
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Click on a row and open Allergy Detail', () => {
		allergyGrid.clickOnCell(0, 'name');
		TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');
		allergyDialog.getButtonClose().click();
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Modify Allergies', () => {
		allergyGrid.clickOnCell(0, 'name');
		TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');

		TestUtil.checkForm(allergyDialog.getFormData(1), 'Allergy Management is correct');

		FormService.removeValuesInForm(allergyDialog.getFormData(), 'Allergy Management');

		FormService.fillForm(allergyDialog.getFormData(4), 'Allergy Creation to update previous one');
		allergyDialog.getButtonSubmit().click();

		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Rows in table of Allergies', 3);
	});

	it('Delete all elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Delete the Allergy at the row #${k}`, () => {
				allergyGrid.clickOnRowMenu(0);
				allergyGrid.getMenu().selectOption(optionMenuDelete);
				TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', k);
			})();
		}
	});
});
