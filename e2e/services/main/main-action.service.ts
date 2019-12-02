import { MainPage } from '../../page-objects/main/main.po';

declare const allure: any;

export class MainActionService {

	public static async createPatient(mainPage: MainPage, patientData: string[]) {
		await mainPage.getPatientButton().click();
		await mainPage.getPatientMaintenanceDialog().getButtonAdd().click();
		let patientDialog=await mainPage.getPatientMaintenanceDialog().getPatientDialog();
		await patientDialog.getNameInput().setText(patientData[0]);
		await patientDialog.getSurnameInput().setText(patientData[1]);
		await patientDialog.getEmailInput().setText(patientData[2]);
		await patientDialog.getAddressStreetInput().setText(patientData[3]);
		await patientDialog.getAddressCityInput().setText(patientData[4]);
		await patientDialog.getAddressZipInput().setText(patientData[5]);
		await patientDialog.getAddressCoordinatesInput().setText(patientData[6]);
		await patientDialog.getButtonSubmit().click();
		await mainPage.getPatientMaintenanceDialog().getButtonClose().click();
	}

	public static async createAllergy(mainPage: MainPage,allergyData: string[]) {
		await mainPage.getConfigIcon().click();
		await mainPage.getAllergyAddButton().click();
		let allergyDialog = await mainPage.getAllergyDetailDialog();
		await allergyDialog.getNameInput().setText(allergyData[0]);
		await allergyDialog.getSignsInput().setText(allergyData[1]);
		await allergyDialog.getSymptomsInput().setText(allergyData[2]);
		await allergyDialog.getButtonSubmit().click();
	}

	public static async deleteFirstAllergy(mainPage: MainPage) {
		const optionMenuDelete = 1;
		await mainPage.getConfigIcon().click();
		await mainPage.getAllergyGrid().clickOnRowMenu(0);
		await mainPage.getAllergyGrid().getMenu().selectOption(optionMenuDelete);
	}

	public static async deleteFirstPatient(mainPage: MainPage) {
		const optionMenuDelete = 1;
		await mainPage.getPatientButton().click();
		await mainPage.getPatientMaintenanceDialog().getPatientsGrid().clickOnRowMenu(0);
		await mainPage.getPatientMaintenanceDialog().getPatientsGrid().getMenu().selectOption(optionMenuDelete);
		await mainPage.getPatientMaintenanceDialog().getButtonClose().click();
	}

}
