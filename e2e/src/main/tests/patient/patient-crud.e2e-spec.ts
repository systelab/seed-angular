import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {PatientMaintenanceDialog} from '../../page-objects/patient/patient-maintenance';
import {PatientDialog} from '../../page-objects/patient/patient-detail/patient-dialog';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Grid} from 'systelab-components-test';
import {because, TestUtil} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
import {disableCSSAnimation, GeneralParameters} from '../../../../general-parameters';
import * as lodash from 'lodash';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let patientMaintenanceDialog: PatientMaintenanceDialog;
	let patientDialog: PatientDialog;
	let patientGrid: Grid;

	const patientData = {
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

	const updatedPatient = getUpdatePatient(), invalidPatient = getInvalidPatient();

	function getInvalidPatient() {
		const wrongPatient = lodash.cloneDeep(patientData);
		wrongPatient.name = '';
		return wrongPatient;
	}

	function getUpdatePatient() {
		const updatePatient = lodash.cloneDeep(patientData);
		updatePatient.name = 'Alternative name';
		return updatePatient;
	}

	beforeAll(async () => {
		await LoginActionService.login(loginPage);
		disableCSSAnimation();
		patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		patientDialog = patientMaintenanceDialog.getPatientDialog();
		patientGrid = patientMaintenanceDialog.getPatientsGrid();
		await patientGrid.waitToBePresent();
	});

	beforeEach(() => {
		TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			GeneralParameters.appVersion, GeneralParameters.USERNAME);
	});

	async function checkValuesInRow(row, p: any) {
		await expect(Promise.resolve(row[1])).toEqual(p.name);
		await expect(Promise.resolve(row[2])).toEqual(p.surname);
		await because('All fields are evaluated as expected').expect(Promise.resolve(row[3])).toEqual(p.email);
	}

	async function checkPatient(patient: any) {
		await because('Number of allergies 1')
			.expect(patientGrid.getNumberOfRows())
			.toBe(1);
		const values = await patientGrid.getValuesInRow(0);
		await checkValuesInRow(values, patient);
	}

	it(`Create a patient: [name: ${patientData.name}, surname: ${patientData.surname}, email: ${patientData.email}]`, async () => {
		await patientMaintenanceDialog.getButtonAdd().click();
		await patientDialog.set(patientData);
		await patientDialog.getButtonSubmit().click();
		await checkPatient(patientData);
	});

	it('Create a patient with invalid data', async () => {
		await patientMaintenanceDialog.getButtonAdd().click();
		await patientDialog.set(invalidPatient);
		await patientDialog.getButtonSubmit().click();
		await because('Invalid Patient').expect(patientDialog.getMessagePopup().getElement().isPresent()).toBeTruthy();
		await patientDialog.getMessagePopup().close();
		await patientDialog.close();
	});

	it('View a patient', async () => {
		await patientGrid.clickOnCell(0, 'name');
		await because('All Patient fields are evaluated as expected').expect(lodash.isEqual(patientData, await patientDialog.get())).toBeTruthy();
		await patientDialog.close();
	});

	it(`Modify a patient: [name: ${updatedPatient.name}, surname: ${updatedPatient.surname}, email: ${updatedPatient.email}]`, async () => {
		await patientGrid.clickOnCell(0, 'name');
		await patientDialog.clear();
		await patientDialog.set(updatedPatient);
		await patientDialog.getButtonSubmit().click();
		await checkPatient(updatedPatient);
	});

	it('Delete a patient', async () => {
		await patientGrid.clickOnRowMenu(0);
		await patientGrid.getMenu().selectOptionByNumber(1);
		await because('Number of Patients is 0').expect(patientGrid.getNumberOfRows()).toBe(0);
	});
});
