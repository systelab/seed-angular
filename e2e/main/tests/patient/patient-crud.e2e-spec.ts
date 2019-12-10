import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {PatientMaintenanceDialog} from '../../page-objects/patient/patient-maintenance';
import {PatientDialog} from '../../page-objects/patient/patient-detail/patient-dialog';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Grid} from 'systelab-components-test';
import {because, Check, TestUtil} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
import {GeneralParameters} from '../../../general-parameters';
import * as lodash from 'lodash';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let patientMaintenanceDialog: PatientMaintenanceDialog;
	let patientDialog: PatientDialog;
	let patientGrid: Grid;

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

	function getInvalidPatient() {
		const wrongPatient = lodash.cloneDeep(patient);
		wrongPatient.name = '';
		return wrongPatient;
	}

	function getUpdatePatient() {
		const updatePatient = lodash.cloneDeep(patient);
		updatePatient.name = 'Alternative name';
		return updatePatient;
	}

	beforeAll(async () => {
		await LoginActionService.login(loginPage);
		patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		patientDialog = patientMaintenanceDialog.getPatientDialog();
		patientGrid = patientMaintenanceDialog.getPatientsGrid();
	});

	beforeEach(() => {
		TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient', GeneralParameters.appVersion, 'userName');
	});

	async function checkValuesInRow(row, p: any) {
		await expect(Promise.resolve(row[1])).toEqual(p.name);
		await expect(Promise.resolve(row[2])).toEqual(p.surname);
		await because('All fields are evaluated as expected').expect(Promise.resolve(row[3])).toEqual(p.email);
	}

	it('Show the patients', async () => {
		await patientGrid.waitToBePresent();
		await because('The Patient Grid is displayed').expect(patientGrid.getGridHeader()).toEqual(['', 'Name', 'Surname', 'Email']);
	});

	it('Create a patient', async () => {
		await patientMaintenanceDialog.getButtonAdd().click();
		await patientDialog.set(patient);
		await patientDialog.getButtonSubmit().click();
		await because('Number of Patients is 1').expect(patientGrid.getNumberOfRows()).toBe(1);
		const values = await patientGrid.getValuesInRow(0);
		await checkValuesInRow(values, patient);
	});

	it('Create a patient with invalid data', async () => {
		await patientMaintenanceDialog.getButtonAdd().click();
		await patientDialog.set(getInvalidPatient());
		await patientDialog.getButtonSubmit().click();
		await because('Invalid Patient').expect(patientDialog.getMesssagePopup().getElement().isPresent()).toBeTruthy();
		await patientDialog.getMesssagePopup().close();
		await patientDialog.close();
	});

	it('View a patient', async () => {
		await patientGrid.clickOnCell(0, 'name');
		await because('Displayed patient equals to created patient').expect(lodash.isEqual(patient, await patientDialog.get())).toBeTruthy();
		await patientDialog.close();
	});

	it('Modify a patient', async () => {
		await patientGrid.clickOnCell(0, 'name');
		await patientDialog.clear();
		await patientDialog.set(getUpdatePatient());
		await patientDialog.getButtonSubmit().click();
		await because('Number of Patients is 1').expect(patientGrid.getNumberOfRows()).toBe(1);
		const values = await patientGrid.getValuesInRow(0);
		await checkValuesInRow(values, getUpdatePatient());
	});

	it('Delete a patient', async () => {
		await patientGrid.clickOnRowMenu(0);
		await patientGrid.getMenu().selectOptionByText('Delete');
		await because('Number of Patients is 0').expect(patientGrid.getNumberOfRows()).toBe(0);
	});
});
