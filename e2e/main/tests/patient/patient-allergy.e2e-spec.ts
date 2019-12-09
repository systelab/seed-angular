import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {PatientMaintenanceDialog} from '../../page-objects/patient/patient-maintenance';
import {PatientDialog} from '../../page-objects/patient/patient-detail/patient-dialog';
import {MainActionService} from '../../services/main-action.service';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Check} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
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
		assertedDate: '',
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
		await Check.init('TC0003_PatientManagement_Allergy_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient', loginPage.appVersion, 'userName');
	});

	async function checkValuesInRow(row, a) {
		await Check.checkText(Promise.resolve(row[1]), 'Col Name', a.allergy);
		await Check.checkText(Promise.resolve(row[2]), 'Col Asserted Date', a.assertedDate);
		await Check.checkText(Promise.resolve(row[3]), 'Col Comments', a.comments);
	}

	it('Should show allergies for patient', async () => {
		await browser.sleep(1000);
		expect(patientDialog.getAllergyGrid().getGridHeader()).toEqual(['', 'Name', 'Asserted Date', 'Comments']);
	});

	it('Should assign allergies to a patient', async () => {
		await allure.createStep('Action: Add an allergy to the patient', async () => {
			await patientDialog.getAddButton().click();
			const patientAllergyDialog = patientDialog.getPatientAllergyDialog();
			await patientAllergyDialog.set(allergyForPatient);
			await patientAllergyDialog.getSubmitButton().click();
		})();
		await Check.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 1);
		const values = await patientDialog.getAllergyGrid().getValuesInRow(0);
		await checkValuesInRow(values, allergyForPatient);
	});

	it('Should show a message on allergy for patient with invalid data', async () => {
		let patientAllergyDialog;
		await allure.createStep('Action: Add an allergy to the patient', async () => {
			await patientDialog.getAddButton().click();
			patientAllergyDialog = patientDialog.getPatientAllergyDialog();
			await patientAllergyDialog.set(getInvalidAllergyForPatient());
			await patientAllergyDialog.getSubmitButton().click();
		})();
		await Check.checkIsPresent(patientAllergyDialog.getMesssagePopup().getElement(), 'Invalid allergy');
		await patientAllergyDialog.getMesssagePopup().close();
		await patientAllergyDialog.close();
	});

	it('Should delete allergies from a patient', async () => {
		await allure.createStep('Action: Remove an allergy to the patient', async () => {
			await patientDialog.getAllergyGrid().clickOnRowMenu(0);
			await patientDialog.getAllergyGrid().getMenu().selectOptionByText('Delete');
		})();
		await Check.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 0);
	});

});
