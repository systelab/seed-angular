import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();

	beforeAll(async () => {
		await LoginNavigationService.login(loginPage);
		await MainNavigationService.createAllergy(mainPage, ['Name1', 'Signs1', 'Symptoms1']);
		await MainNavigationService.createPatient(mainPage, ['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
	});

	afterAll(async () => {
		await MainNavigationService.deleteFirstPatient(mainPage);
		await MainNavigationService.deleteFirstAllergy(mainPage);
	});

	beforeEach(async () => {
		await TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'userName');
	});

	it('Assign and remove allergy to a patient', async () => {
		await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
		let patientMaintenanceDialog = mainPage.getPatientMaintenanceDialog();
		await patientMaintenanceDialog.getPatientsGrid().clickOnCell(0, 'name');
		let patientDialog = patientMaintenanceDialog.getPatientDialog();

		await patientDialog.getTabs().selectTab(1);

		// Add an allergy to the patient
		await patientDialog.getAddButton().click();
		let patientAllergyDialog = patientDialog.getPatientAllergyDialog();
		await patientAllergyDialog.getAllergyCombobox().click();
		await patientAllergyDialog.getAllergyCombobox().selectOption(0);

		//		patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
		//		patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');

		await patientAllergyDialog.getAllergyNotes().setText('aslhslkjhdsalkjah');
		await patientAllergyDialog.getSubmitButton().click();

		await TestUtil.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 1);

		// Remove an allergy to the patient
		await patientDialog.getAllergyGrid().clickOnRowMenu(0);
		await patientDialog.getAllergyGrid().getMenu().selectOption(1);
		await TestUtil.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 0);

		// Close the detail and maintenance dialog.
		await patientDialog.getTabs().selectTab(0);
		await patientDialog.getButtonClose().click();
		await patientMaintenanceDialog.getButtonClose().click();
  });

});
