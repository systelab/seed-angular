import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { PatientMaintenanceDialog } from '../../../page-objects/main/patient/patient-maintenance';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormService } from 'systelab-components-test/lib/services';
import { MainNavigationService } from '../../../services/main/main-navigation.service';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let patientMaintenanceDialog: PatientMaintenanceDialog;

	beforeAll(async () => {
		await LoginNavigationService.login(loginPage);
		await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		patientMaintenanceDialog = mainPage.getPatientMaintenanceDialog();
	});

	beforeEach(() => {
		TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'userName');
	});

	it('Access to the Patient Management Dialog', async () => {
		await FormService.checkDialogTitleAndButtons(patientMaintenanceDialog, patientMaintenanceDialog.title, patientMaintenanceDialog.buttons);
		const titles = ['', 'Name', 'Surname', 'Email'];
		expect(await patientMaintenanceDialog.getPatientsGrid().getGridHeader()).toEqual(titles);
	});

});
