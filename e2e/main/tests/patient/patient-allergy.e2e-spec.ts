import { LoginPage } from '../../../login/page-objects/login.po';
import { MainPage } from '../../page-objects/main.po';
import { PatientMaintenanceDialog } from '../../page-objects/patient/patient-maintenance';
import { PatientDialog } from '../../page-objects/patient/patient-detail/patient-dialog';
import { LoginNavigationService } from '../../../login/services/login-navigation.service';
import { MainActionService } from '../../services/main-action.service';
import { MainNavigationService } from '../../services/main-navigation.service';
import { Check } from 'systelab-components-test/lib/utilities';

declare const allure: any;

describe('TC0003_PatientManagement_Allergy_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	let patientMaintenanceDialog: PatientMaintenanceDialog;
	let patientDialog: PatientDialog;


	beforeAll(async () => {
		await LoginNavigationService.login(loginPage);
		await MainActionService.createAllergy(mainPage, ['Name1', 'Signs1', 'Symptoms1']);
		await MainActionService.createPatient(mainPage, ['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
		patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		patientDialog = await MainNavigationService.navigateToPatientDialog(patientMaintenanceDialog,0);
	});

	afterAll(async () => {
		await patientDialog.back();
		await patientMaintenanceDialog.back();
		await MainActionService.deleteFirstPatient(mainPage);
		await MainActionService.deleteFirstAllergy(mainPage);
	});

	beforeEach(async () => {
		await Check.init('TC0003_PatientManagement_Allergy_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'userName');
	});

	it('Assign and remove allergy to a patient', async () => {

		// Add an allergy to the patient
		await allure.createStep('Action: Add an allergy to the patient', async () => {
			await patientDialog.getAddButton().click();
			const patientAllergyDialog = patientDialog.getPatientAllergyDialog();
			await patientAllergyDialog.getAllergyCombobox().click();
			await patientAllergyDialog.getAllergyCombobox().selectOptionByText('Name1');

			//		patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
			//		patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');

			await patientAllergyDialog.getAllergyNotes().setText('aslhslkjhdsalkjah');
			await patientAllergyDialog.getSubmitButton().click();
		})();

		await Check.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 1);

		await allure.createStep('Action: Remove an allergy to the patient', async () => {
			await patientDialog.getAllergyGrid().clickOnRowMenu(0);
			await patientDialog.getAllergyGrid().getMenu().selectOptionByText('Delete');
		})();
		await Check.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 0);
  });

});
