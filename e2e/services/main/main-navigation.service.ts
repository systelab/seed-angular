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
}
