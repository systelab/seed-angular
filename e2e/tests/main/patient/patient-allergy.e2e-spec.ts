import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();

	beforeAll(() => {
		LoginNavigationService.login(loginPage);
		MainNavigationService.createAllergy(mainPage, ['Name1', 'Signs1', 'Symptoms1']);
		MainNavigationService.createPatient(mainPage, ['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
	});

	afterAll(() => {
		MainNavigationService.deleteFirstPatient(mainPage);
		MainNavigationService.deleteFirstAllergy(mainPage);
	});

	beforeEach(() => {
		TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'userName');
	});

	it('Assign and remove allergy to a patient', () => {
		let patientMaintenanceDialog = MainNavigationService.navigateToPatientMaintenancePage(mainPage);

		patientMaintenanceDialog.getPatientsGrid().clickOnCell(0, 'name');
		let patientDialog = patientMaintenanceDialog.getPatientDialog();

		patientDialog.getTabs().selectTab(1);

		// Add an allergy to the patient
		patientDialog.getAddButton().click();
		let patientAllergyDialog = patientDialog.getPatientAllergyDialog();
		patientAllergyDialog.getAllergyCombobox().click();
		patientAllergyDialog.getAllergyCombobox().selectOption(0);

		//		patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
		//		patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');

		patientAllergyDialog.getAllergyNotes().setText('aslhslkjhdsalkjah');
		patientAllergyDialog.getSubmitButton().click();

		TestUtil.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 1);

		// Remove an allergy to the patient
		patientDialog.getAllergyGrid().clickOnRowMenu(0);
		patientDialog.getAllergyGrid().getMenu().selectOption(1);
		TestUtil.checkNumber(patientDialog.getAllergyGrid().getNumberOfRows(), 'Number of Allergies for patient', 0);

		// Close the detail and maintenance dialog.
		patientDialog.getTabs().selectTab(0);
		patientDialog.getButtonClose().click();
		patientMaintenanceDialog.getButtonClose().click();
  });

});
