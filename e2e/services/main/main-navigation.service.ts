import { MainPage } from '../../page-objects/main/main.po';
import { TestUtil } from 'systelab-components-test/lib/utilities/test-util';
import { PatientMaintenanceDialog } from '../../page-objects/main/patient/patient-maintenance';
import { PatientDialog } from '../../page-objects/main/patient/patient-detail/patient-dialog';

declare const allure: any;

export class MainNavigationService {

	public static async navigateToPatientMaintenancePage(mainPage: MainPage): Promise<PatientMaintenanceDialog> {
		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		await mainPage.getPatientButton().click();
		return mainPage.getPatientMaintenanceDialog();
	}

	public static async navigateToAllergyMaintenancePage(mainPage: MainPage): Promise<MainPage> {
		await TestUtil.checkPageIsPresentAndDisplayed(mainPage);
		await mainPage.getConfigIcon().click();
		return mainPage;
	}

	public static async navigateToPatientDialog(patientMaintenanceDialog: PatientMaintenanceDialog, row: number): Promise<PatientDialog> {
		await patientMaintenanceDialog.getPatientsGrid().clickOnCell(row, 'name');
		let patientDialog = await patientMaintenanceDialog.getPatientDialog();
		await patientDialog.getTabs().selectTab(1);
		return patientDialog;
	}
}
