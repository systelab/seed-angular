import { MainPage } from '../../page-objects/main/main.po';
import { PatientMaintenanceDialog } from '../../page-objects/main/patient/patient-maintenance';
import { AllergyDetailDialog } from '../../page-objects/main/allergy/allergy-detail/allergy-dialog';
import { TestUtil } from 'systelab-components-test/lib/utilities/test-util';

export class MainNavigationService {

	public static navigateToPatientMaintenancePage(mainPage: MainPage): PatientMaintenanceDialog {
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		mainPage.getPatientButton().click();
		return mainPage.getPatientMaintenanceDialog();
	}

	public static navigateToAllergyMaintenancePage(mainPage: MainPage): AllergyDetailDialog {
		TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		mainPage.getConfigIcon().click();
		return mainPage.getAllergyDetailDialog();
	}

	public static createPatient(mainPage: MainPage, patientData: string[]) {
		mainPage.getPatientButton().click();
		mainPage.getPatientMaintenanceDialog().getButtonAdd().click();
		let patientDialog=mainPage.getPatientMaintenanceDialog().getPatientDialog();
		patientDialog.getNameInput().setText(patientData[0]);
		patientDialog.getSurnameInput().setText(patientData[1]);
		patientDialog.getEmailInput().setText(patientData[2]);
		patientDialog.getAddressStreetInput().setText(patientData[3]);
		patientDialog.getAddressCityInput().setText(patientData[4]);
		patientDialog.getAddressZipInput().setText(patientData[5]);
		patientDialog.getAddressCoordinatesInput().setText(patientData[6]);
		patientDialog.getButtonSubmit().click();
		mainPage.getPatientMaintenanceDialog().getButtonClose().click();
	}

	public static createAllergy(mainPage: MainPage,allergyData: string[]) {
		mainPage.getConfigIcon().click();
		mainPage.getAllergyAddButton().click();
		let allergyDialog = mainPage.getAllergyDetailDialog();
		allergyDialog.getNameInput().setText(allergyData[0]);
		allergyDialog.getSignsInput().setText(allergyData[1]);
		allergyDialog.getSymptomsInput().setText(allergyData[2]);
		allergyDialog.getButtonSubmit().click();
	}

	public static deleteFirstAllergy(mainPage: MainPage) {
		const optionMenuDelete = 1;
		mainPage.getConfigIcon().click();
		mainPage.getAllergyGrid().clickOnRowMenu(0);
		mainPage.getAllergyGrid().getMenu().selectOption(optionMenuDelete);
	}

	public static deleteFirstPatient(mainPage: MainPage) {
		const optionMenuDelete = 1;
		mainPage.getPatientButton().click();
		mainPage.getPatientMaintenanceDialog().getPatientsGrid().clickOnRowMenu(0);
		mainPage.getPatientMaintenanceDialog().getPatientsGrid().getMenu().selectOption(optionMenuDelete);
		mainPage.getPatientMaintenanceDialog().getButtonClose().click();

	}

}
