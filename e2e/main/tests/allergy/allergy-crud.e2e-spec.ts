import { browser } from 'protractor';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormInputService } from 'systelab-components-test/lib/services';
import { Grid } from 'systelab-components-test';
import { LoginPage } from '../../../login/page-objects/login.po';
import { MainPage } from '../../page-objects/main.po';
import { AllergyDetailDialog } from '../../page-objects/allergy/allergy-detail/allergy-dialog';
import { LoginNavigationService } from '../../../login/services/login-navigation.service';
import { MainNavigationService } from '../../services/main-navigation.service';

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

	async function checkGridValues(row, formData) {
		await TestUtil.checkText(Promise.resolve(row[1]), 'Col Name', formData[0].value);
		await TestUtil.checkText(Promise.resolve(row[2]), 'Col Signs', formData[1].value);
		await TestUtil.checkText(Promise.resolve(row[3]), 'Col Symptoms', formData[2].value);
	}

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
		await TestUtil.checkDialogTitleAndButtons(allergyDialog, title, buttons);
		await TestUtil.checkForm(allergyDialog.getInputElements(), 'Allergy Creation is empty');
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
				let formData = allergyDialog.getInputElements(i);

				await FormInputService.fillValues(formData, 'Allergy Creation Form');
				await TestUtil.checkForm(formData, 'Allergy Creation is correct');

				await allergyDialog.getButtonSubmit().click();
				await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
				await TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', i);

				let row=await allergyGrid.getRow(i - 1);
				await checkGridValues(row,formData);
			})();
		}
	});

	it('Contextual menu at the allergies grid', async () => {
		const menuItems = ['Update', 'Delete'];
		await allure.createStep('Action: Access to the contextual menu and check that the options: ' + JSON.stringify(menuItems)+ ' are available', async () => {
			await allergyGrid.clickOnRowMenu(0);
			expect(await allergyGrid.getMenu().getOptions()).toEqual(menuItems);
			await allergyGrid.clickOnHeader();
		})();
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
		await FormInputService.removeValues(allergyDialog.getInputElements(), 'Allergy Management');

		let elementsToUpdate=allergyDialog.getInputElements(4)
		await FormInputService.fillValues(elementsToUpdate, 'Allergy Creation to update previous one');
		await allergyDialog.getButtonSubmit().click();

		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		await TestUtil.checkNumber(allergyGrid.getNumberOfRows(), 'Rows in table of Allergies', 3);

		let row=await allergyGrid.getRow(2);
		await checkGridValues(row,elementsToUpdate);

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
