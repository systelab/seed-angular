import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {AllergyDetailDialog} from '../../page-objects/allergy/allergy-detail/allergy-dialog';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Grid} from 'systelab-components-test';
import {Check, TestUtil} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
import {GeneralParameters} from '../../../general-parameters';

import * as lodash from 'lodash';

declare const allure: any;

describe('TC0004_AllergyManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let allergyDialog: AllergyDetailDialog;
	let allergyGrid: Grid;

	const allergy = {
		name: 'Name',
		sign: 'Sign',
		symptom: 'Symptom'
	};

	function getInvalidAllergy() {
		const wrongAllergy = lodash.cloneDeep(allergy);
		wrongAllergy.name = '';
		return wrongAllergy;
	}

	function getUpdateAllergy() {
		const updateAllergy = lodash.cloneDeep(allergy);
		updateAllergy.name = 'Alternative name';
		return updateAllergy;
	}

	beforeAll(async () => {
		await LoginActionService.login(loginPage);
		await MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
		allergyDialog = mainPage.getAllergyDetailDialog();
		allergyGrid = mainPage.getAllergyGrid();
	});

	beforeEach(() => {
		TestUtil.init('TC0004_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy', GeneralParameters.appVersion, 'userName');
	});

	async function checkValuesInRow(row, a: any) {
		await Check.checkText(Promise.resolve(row[1]), 'Col Name', a.name);
		await Check.checkText(Promise.resolve(row[2]), 'Col Signs', a.sign);
		await Check.checkText(Promise.resolve(row[3]), 'Col Symptoms', a.symptom);
	}

	it('Should show allergies', async () => {
		await mainPage.getAllergyGrid().waitToBePresent();
		await expect(mainPage.getAllergyGrid().getGridHeader()).toEqual(['', 'Name', 'Signs', 'Symptoms']);
	});

	it('Should create allergies', async () => {
		await allure.createStep('Action: Create an allergy', async () => {
			await mainPage.getAllergyAddButton().click();
			await allergyDialog.waitToBePresent();
			await allergyDialog.set(allergy);
			await allergyDialog.getButtonSubmit().click();
			await mainPage.waitToBePresent();
			await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Number of allergies', 1);
			const values = await allergyGrid.getValuesInRow(0);
			await checkValuesInRow(values, allergy);
		})();
	});

	it('Should show a message on allergy invalid data', async () => {
		await allure.createStep('Action: Create an allergy', async () => {
			await mainPage.getAllergyAddButton().click();
			await allergyDialog.set(getInvalidAllergy());
			await allergyDialog.getButtonSubmit().click();
			await Check.checkIsPresent(allergyDialog.getMesssagePopup().getElement(), 'Invalid allergy');
			await allergyDialog.getMesssagePopup().close();
			await allergyDialog.close();
		})();
	});

	it('Should view allergies', async () => {
		await allure.createStep('Action: View an allergy', async () => {
			await allergyGrid.clickOnCell(0, 'name');
			expect(await lodash.isEqual(allergy, await allergyDialog.get())).toBeTruthy();
			await allergyDialog.close();
		})();
	});

	it('Should modify allergies', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await allergyDialog.clear();
		await allergyDialog.set(getUpdateAllergy());
		await allergyDialog.getButtonSubmit().click();
		await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Number of allergies', 1);
		const values = await allergyGrid.getValuesInRow(0);
		await checkValuesInRow(values, getUpdateAllergy());
	});

	it('Should delete allergies', async () => {
		await allure.createStep(`Action: Delete the Allergy at row 0`, async () => {
			await allergyGrid.clickOnRowMenu(0);
			await allergyGrid.getMenu().selectOptionByText('Delete');
			await Check.checkNumber(allergyGrid.getNumberOfRows(), 'Number of allergies', 0);
		})();
	});
});
