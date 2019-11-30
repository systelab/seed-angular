import { MainPage } from '../page-objects/main/main.po';
import { TestUtil } from '../utilities/test-util';
import { PatientMaintenanceDialog } from '../page-objects/main/patient/patient-maintenance';
import { AllergyDetailDialog } from '../page-objects/main/allergy/allergy-detail/allergy-dialog';

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
}
