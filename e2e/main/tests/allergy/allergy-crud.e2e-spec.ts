import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {AllergyDetailDialog} from '../../page-objects/allergy/allergy-detail/allergy-dialog';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Grid} from 'systelab-components-test';
import {because, TestUtil} from 'systelab-components-test/lib/utilities';
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
		TestUtil.init('TC0004_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy', GeneralParameters.appVersion, GeneralParameters.USERNAME);
	});

	async function checkValuesInRow(row, a: any) {
		await expect(Promise.resolve(row[1])).toEqual(a.name);
		await expect(Promise.resolve(row[2])).toEqual(a.sign);
		await because('All fields are evaluated as expected').expect(Promise.resolve(row[3])).toEqual(a.symptom);
	}

	it('Show the allergies', async () => {
		await mainPage.getAllergyGrid().waitToBePresent();
		await because('The allergies grid is displayed').expect(allergyGrid.getGridHeader()).toEqual(['', 'Name', 'Signs', 'Symptoms']);
	});

	it(`Create an allergy: [name: ${allergy.name}, sign: ${allergy.sign}, symptom: ${allergy.symptom}]`, async () => {
		await mainPage.getAllergyAddButton().click();
		await allergyDialog.waitToBePresent();
		await allergyDialog.set(allergy);
		await allergyDialog.getButtonSubmit().click();
		await mainPage.waitToBePresent();
		await because('Number of allergies 1').expect(allergyGrid.getNumberOfRows()).toEqual(1);
		const values = await allergyGrid.getValuesInRow(0);
		await checkValuesInRow(values, allergy);
	});

	it('Create an allergy with invalid data', async () => {
		await mainPage.getAllergyAddButton().click();
		await allergyDialog.set(getInvalidAllergy());
		await allergyDialog.getButtonSubmit().click();
		await because('Invalid allergy').expect(allergyDialog.getMesssagePopup().getElement().isPresent()).toBeTruthy();
		await allergyDialog.getMesssagePopup().close();
		await allergyDialog.close();
	});

	it('View an allergy', async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await because('Displayed allergy equals to created allergy').expect(allergyDialog.get()).toEqual(allergy);
		await allergyDialog.close();
	});

	it(`Modify an allergy: [name: ${getUpdateAllergy().name}, sign: ${getUpdateAllergy().name}, symptom: ${getUpdateAllergy().symptom}]`, async () => {
		await allergyGrid.clickOnCell(0, 'name');
		await allergyDialog.clear();
		await allergyDialog.set(getUpdateAllergy());
		await allergyDialog.getButtonSubmit().click();
		await because('Number of allergies 1').expect(allergyGrid.getNumberOfRows()).toBe(1);
		const values = await allergyGrid.getValuesInRow(0);
		await checkValuesInRow(values, getUpdateAllergy());
	});

	it('Delete an allergy', async () => {
		await allergyGrid.clickOnRowMenu(0);
		await allergyGrid.getMenu().selectOptionByText('Delete');
		await because('Number of allergies 0').expect(allergyGrid.getNumberOfRows()).toBe(0);
	});
});
