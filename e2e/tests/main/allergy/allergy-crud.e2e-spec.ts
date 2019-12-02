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

describe('TC0004_AllergyManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let allergyDialog: AllergyDetailDialog;
	let allergyGrid : Grid;

	beforeAll(async () => {
		await LoginNavigationService.login(loginPage);
		await MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
		allergyDialog = mainPage.getAllergyDetailDialog();
		allergyGrid = mainPage.getAllergyGrid();
	});

	beforeEach(() => {
		TestUtil.init('TC0004_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
			loginPage.appVersion, 'userName');
	});

	it('Access to the allergy screen', async () => {
		const tabs = ['Allergies'];
		const titles = ['', 'Name', 'Signs', 'Symptoms']
		await TestUtil.checkNumber(mainPage.getConfigTabs().getNumberOfTabs(), 'tabs', 1);
		await TestUtil.checkText(mainPage.getConfigTabs().getTab(0).getText(), `Tab[0]: ${tabs[0]}`, tabs[0]);
		expect(await mainPage.getAllergyGrid().getGridHeader()).toEqual(titles);
	});

	it('Open allergy creation dialog', async () => {
		const title = 'Create Allergy';
		const buttons: FormButtonElement[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		await mainPage.getAllergyAddButton().click();
		await FormService.checkDialogTitleAndButtons(allergyDialog, title, buttons);
		await TestUtil.checkForm(allergyDialog.getFormData(), 'Allergy Creation is empty');
		await allergyDialog.getButtonClose().click();
		await allure.createStep('Dialog is closed', async () => {
			await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		})();
	});

	it('Create Allergies', async () => {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			await allure.createStep('Action: Create the allergy ' + i, async () => {

				await mainPage.getAllergyAddButton().click();
				await TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');
				let formData = allergyDialog.getFormData(i);

				await FormService.fillForm(formData, 'Allergy Creation Form');
				await TestUtil.checkForm(formData, 'Allergy Creation is correct');

				await allergyDialog.getButtonSubmit().click();
				await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
				await TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', i);

				let row=await allergyGrid.getRow(i - 1);
				await TestUtil.checkText(Promise.resolve(row[1]), 'Col Name', formData[0].value);
				await TestUtil.checkText(Promise.resolve(row[2]), 'Col Signs', formData[1].value);
				await TestUtil.checkText(Promise.resolve(row[3]), 'Col Symptoms', formData[2].value);

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

	it('The option Update opens Allergy Detail', async () => {
		const optionMenuUpdate = 0;
		await allergyGrid.clickOnRowMenu(0);
		await allergyGrid.getMenu().selectOption(optionMenuUpdate);
		await TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');

		await allergyDialog.getButtonClose().click();
		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Click on a row and open Allergy Detail', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');
		await allergyDialog.getButtonClose().click();
		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
	});

	it('Modify Allergies', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await TestUtil.checkWidgetPresentAndDisplayed(allergyDialog, 'Allergy Dialog');

		await TestUtil.checkForm(allergyDialog.getFormData(1), 'Allergy Management is correct');

		await FormService.removeValuesInForm(allergyDialog.getFormData(), 'Allergy Management');

		await FormService.fillForm(allergyDialog.getFormData(4), 'Allergy Creation to update previous one');
		await allergyDialog.getButtonSubmit().click();

		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		await TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Rows in table of Allergies', 3);
	});

	it('Delete all elements recently added to the grid', async () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			await allure.createStep(`Action: Delete the Allergy at the row #${k}`, async () => {
				await allergyGrid.clickOnRowMenu(0);
				await allergyGrid.getMenu().selectOption(optionMenuDelete);
				await TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', k);
			})();
		}
	});
});
