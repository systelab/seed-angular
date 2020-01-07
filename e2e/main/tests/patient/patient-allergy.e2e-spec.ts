import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {PatientMaintenanceDialog} from '../../page-objects/patient/patient-maintenance';
import {PatientDialog} from '../../page-objects/patient/patient-detail/patient-dialog';
import {MainActionService} from '../../services/main-action.service';
import {MainNavigationService} from '../../services/main-navigation.service';
import {because, Check, TestUtil} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
import {GeneralParameters} from '../../../general-parameters';

import {browser} from 'protractor';
import * as lodash from 'lodash';

declare const allure: any;

describe('TC0003_PatientManagement_Allergy_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let patientMaintenanceDialog: PatientMaintenanceDialog;
	let patientDialog: PatientDialog;

	const patient = {
		name: 'Name',
		surname: 'Surname',
		email: 'name@yahoo.com',
		address: {
			street: 'Street',
			city: 'City',
			zip: '08001',
			coordinates: '11212, 1212'
		}
	};

	const allergy = {
		name: 'Name',
		sign: 'Sign',
		symptom: 'Symptom'
	};

	const allergyForPatient = {
		allergy: 'Name',
		assertedDate: '01/01/2019',
		lastOccurrenceDate: '02/02/2019',
		comments: 'Comments'
	};

	function getInvalidAllergyForPatient() {
		const wrongAllergyForPatient = lodash.cloneDeep(allergyForPatient);
		wrongAllergyForPatient.name = '';
		return wrongAllergyForPatient;
	}

	beforeAll(async () => {
		await LoginActionService.login(loginPage);
		await MainActionService.createAllergy(mainPage, allergy);
		await MainActionService.createPatient(mainPage, patient);
		patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		patientDialog = await MainNavigationService.navigateToPatientDialog(patientMaintenanceDialog, 0);
	});

	afterAll(async () => {
		await patientDialog.close();
		await patientMaintenanceDialog.close();
		await MainActionService.deleteFirstPatient(mainPage);
		await MainActionService.deleteFirstAllergy(mainPage);
	});

	beforeEach(async () => {
		await TestUtil.init('TC0003_PatientManagement_Allergy_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient', GeneralParameters.appVersion, 'userName');
	});

	async function checkValuesInRow(row, a) {
		await expect(Promise.resolve(row[1])).toEqual(a.allergy);
		await expect(Promise.resolve(row[2])).toEqual(a.assertedDate);
		await because('All fields are evaluated as expected').expect(Promise.resolve(row[3])).toEqual(a.comments);
	}

	it('Show allergies for patient', async () => {
		await browser.sleep(1000);
		await because('The patient-allergies grid is displayed').expect(patientDialog.getAllergyGrid().getGridHeader()).toEqual(['', 'Name', 'Asserted Date', 'Comments']);
	});

	it(`Assign an allergy to a patient: [name: ${allergyForPatient.allergy}, assertedDate: ${allergyForPatient.assertedDate}, comments: ${allergyForPatient.comments}]`, async () => {
		await patientDialog.getAddButton().click();
		const patientAllergyDialog = patientDialog.getPatientAllergyDialog();
		await patientAllergyDialog.set(allergyForPatient);
		await patientAllergyDialog.getSubmitButton().click();
		await because('Number of allergies from patient 1').expect(patientDialog.getAllergyGrid().getNumberOfRows()).toBe(1);
		const values = await patientDialog.getAllergyGrid().getValuesInRow(0);
		await checkValuesInRow(values, allergyForPatient);
	});

	it('Assign an allergy with invalid data to a patient', async () => {
		let patientAllergyDialog;
		await patientDialog.getAddButton().click();
		patientAllergyDialog = patientDialog.getPatientAllergyDialog();
		await patientAllergyDialog.set(getInvalidAllergyForPatient());
		await patientAllergyDialog.getSubmitButton().click();
		await because('Invalid allergy').expect(patientAllergyDialog.getMesssagePopup().getElement().isPresent()).toBeTruthy();
		await patientAllergyDialog.getMesssagePopup().close();
		await patientAllergyDialog.close();
	});

	it('Remove an allergy from a patient', async () => {
		await patientDialog.getAllergyGrid().clickOnRowMenu(0);
		await patientDialog.getAllergyGrid().getMenu().selectOptionByText('Delete');
		await because('Number of Allergies from patient 0').expect(patientDialog.getAllergyGrid().getNumberOfRows()).toBe(0);
	});

});
