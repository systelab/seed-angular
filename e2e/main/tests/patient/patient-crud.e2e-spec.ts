import {LoginPage} from '../../../login/page-objects/login.po';
import {MainPage} from '../../page-objects/main.po';
import {PatientMaintenanceDialog} from '../../page-objects/patient/patient-maintenance';
import {PatientDialog} from '../../page-objects/patient/patient-detail/patient-dialog';
import {MainNavigationService} from '../../services/main-navigation.service';
import {Grid} from 'systelab-components-test';
import {Check} from 'systelab-components-test/lib/utilities';
import {LoginActionService} from '../../../login/services/login-action.service';
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
		Check.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient', loginPage.appVersion, 'userName');
	});

	async function checkValuesInRow(row, p: any) {
		await Check.checkText(Promise.resolve(row[1]), 'Col Name', p.name);
		await Check.checkText(Promise.resolve(row[2]), 'Col Surname', p.surname);
		await Check.checkText(Promise.resolve(row[3]), 'Col Email', p.email);
	}

	it('Should show patients', async () => {
		await patientGrid.waitToBePresent();
		await expect(patientGrid.getGridHeader()).toEqual(['', 'Name', 'Surname', 'Email']);
	});

	it('Should create patients', async () => {
		await allure.createStep('Action: Create a patient', async () => {
			await patientMaintenanceDialog.getButtonAdd().click();
			await patientDialog.set(patient);
			await patientDialog.getButtonSubmit().click();
			await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', 1);
			const values = await patientGrid.getValuesInRow(0);
			await checkValuesInRow(values, patient);
		})();
	});

	it('Should show a message on patient invalid data', async () => {
		await allure.createStep('Action: Create a patient', async () => {
			await patientMaintenanceDialog.getButtonAdd().click();
			await patientDialog.set(getInvalidPatient());
			await patientDialog.getButtonSubmit().click();
			await Check.checkIsPresent(patientDialog.getMesssagePopup().getElement(), 'Invalid patient');
			await patientDialog.getMesssagePopup().close();
			await patientDialog.close();
		})();
	});

	it('Should view patients', async () => {
		await allure.createStep('Action: View a patient', async () => {
			await patientGrid.clickOnCell(0, 'name');
			expect(await lodash.isEqual(patient, await patientDialog.get())).toBeTruthy();
			await patientDialog.close();
		})();
	});

	it('Should modify patients', async () => {
		await patientGrid.clickOnCell(0, 'name');
		await patientDialog.clear();
		await patientDialog.set(getUpdatePatient());
		await patientDialog.getButtonSubmit().click();
		await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', 1);
		const values = await patientGrid.getValuesInRow(0);
		await checkValuesInRow(values, getUpdatePatient());
	});

	it('Should delete patients', async () => {
		await allure.createStep(`Action: Delete the Patient at row 0`, async () => {
			await patientGrid.clickOnRowMenu(0);
			await patientGrid.getMenu().selectOptionByText('Delete');
			await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', 0);
		})();
	});
});
