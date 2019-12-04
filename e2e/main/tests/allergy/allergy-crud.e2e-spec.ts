import { LoginPage } from '../../../login/page-objects/login.po';
import { MainPage } from '../../page-objects/main.po';
import { AllergyDetailDialog } from '../../page-objects/allergy/allergy-detail/allergy-dialog';
import { LoginNavigationService } from '../../../login/services/login-navigation.service';
import { MainNavigationService } from '../../services/main-navigation.service';
import { Grid } from 'systelab-components-test';
import { Check } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormInputService } from 'systelab-components-test/lib/services';
import { GeneralParameters } from '../../../general-parameters';

declare const allure: any;

describe('TC0004_AllergyManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let allergyDialog: AllergyDetailDialog;
	let allergyGrid: Grid;

	beforeAll(async () => {
		await LoginNavigationService.login(loginPage);
		await MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
		allergyDialog = mainPage.getAllergyDetailDialog();
		allergyGrid = mainPage.getAllergyGrid();
	});

	beforeEach(() => {
		Check.init('TC0004_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
			loginPage.appVersion, 'userName');
	});

	async function checkGridValues(row, formData) {
		await Check.checkText(Promise.resolve(row[1]), 'Col Name', formData[0].value);
		await Check.checkText(Promise.resolve(row[2]), 'Col Signs', formData[1].value);
		await Check.checkText(Promise.resolve(row[3]), 'Col Symptoms', formData[2].value);
	}

	it('Access to the Allergy Screen', async () => {
		const tabs = ['Allergies'];
		const titles = ['', 'Name', 'Signs', 'Symptoms']
		await Check.checkNumber(mainPage.getConfigTabs().getNumberOfTabs(), 'Number of Tabs', 1);
		await Check.checkText(mainPage.getConfigTabs().getTab(0).getText(), `First tab title ${tabs[0]}`, tabs[0]);
		expect(await mainPage.getAllergyGrid().getGridHeader()).toEqual(titles);
	});

	it('Open Allergy Creation dialog', async () => {
		const title = 'Create Allergy';
		const buttons: FormButtonElement[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		await mainPage.wait();
		await mainPage.getAllergyAddButton().click();
		await Check.checkDialogTitleAndButtons(allergyDialog, title, buttons);
		await Check.checkForm(allergyDialog.getInputElements(), 'Allergy Creation');
		await allure.createStep('Action: Close the Allergy Creation dialog', async () => {
			await allergyDialog.back();
			await mainPage.wait();
			await allure.createStep('The dialog is closed', () => {
			})();
		})();
	});

	it('Create Allergies', async () => {
		for (let i = 1; i <= GeneralParameters.REPETEABILITY_NUMBER_PASSES; i++) {

			await allure.createStep('Action: Create the allergy ' + i, async () => {

				await mainPage.getAllergyAddButton().click();
				await allergyDialog.wait();
				const formData = allergyDialog.getInputElements(i);

				await FormInputService.fillValues(formData, 'Allergy Creation Form');
				await Check.checkForm(formData, 'Allergy Creation is correct');

				await allergyDialog.getButtonSubmit().click();
				await mainPage.wait();
				await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', i);

				const row = await allergyGrid.getRow(i - 1);
				await checkGridValues(row, formData);
			})();
		}
	});

	it('Contextual menu at the allergies grid', async () => {
		const menuItems = ['Update', 'Delete'];
		await allure.createStep('Action: Access to the contextual menu and check that the options: ' + JSON.stringify(menuItems) + ' are available', async () => {
			await allergyGrid.clickOnRowMenu(0);
			expect(await allergyGrid.getMenu().getOptions()).toEqual(menuItems);
			await allergyGrid.clickOnHeader();
			await allure.createStep('The contextual menu is in the correct status', () => {
			})();
		})();
	});

	it('The option Update opens Allergy Detail', async () => {
		const optionMenuUpdate = 0;
		await allergyGrid.clickOnRowMenu(0);
		await allergyGrid.getMenu().selectOption(optionMenuUpdate);
		await allergyDialog.wait();

		await allergyDialog.back();
		await mainPage.wait();
		await allure.createStep('The option works as intended', () => {
		})();
	});

	it('Click on a row and open Allergy Detail', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await allergyDialog.wait();
		await allergyDialog.back();
		await mainPage.wait();
		await allure.createStep('The option works as intended', () => {
		})();
	});

	it('Modify Allergies', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await allergyDialog.wait();
		await FormInputService.removeValues(allergyDialog.getInputElements(), 'Allergy Management');

		const elementsToUpdate = allergyDialog.getInputElements(4)
		await FormInputService.fillValues(elementsToUpdate, 'Allergy Creation to update previous one');
		await allergyDialog.getButtonSubmit().click();

		await mainPage.wait();
		await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Rows in table of Allergies', 3);

		const row = await allergyGrid.getRow(2);
		await checkGridValues(row, elementsToUpdate);

	});

	it('Delete all elements recently added to the grid', async () => {
		const optionMenuDelete = 1;
		for (let k = (GeneralParameters.REPETEABILITY_NUMBER_PASSES - 1); k >= 0; k--) {
			await allure.createStep(`Action: Delete the Allergy at the row #${k}`, async () => {
				await allergyGrid.clickOnRowMenu(0);
				await allergyGrid.getMenu().selectOption(optionMenuDelete);
				await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Number of Allergies', k);
			})();
		}
	});
});
