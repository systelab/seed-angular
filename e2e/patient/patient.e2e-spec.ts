import { browser } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { ButtonState, FormData, TestToolkit } from '../common/utilities/test-toolkit';
import { TestUtil } from '../common/utilities/test-util';
import { GridService } from '../common/components/grid.service';

declare const allure: any;

describe('Instrument Selector Case: TC0001_PatientManagement_e2e', () => {

	const currentDate = TestToolkit.getCurrentDate();
	const currentTime = TestToolkit.getCurrentTime();

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	const patientMaintenancePage = new PatientMaintenancePage();
	const patientDetailPage = new PatientDetailPage();

	beforeAll(() => {
		loginPage.navigateToHomePage();
		loginPage.login();
	});

	beforeEach(() => {
		TestToolkit.clearConsole();
		TestToolkit.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'xcalvo', currentDate, currentTime);
	});

	/* Base data to fill/check in form Create/Update patients*/
	function getPatientFormData(empty: boolean, i?: number): FormData[] {
		const basePatientValues = ['Aparicio', 'José Luis', 'jlaparicio@werfen.com', 'Plaza de Europa, 21-23, 18th Floor', 'Barcelona', '08908', '41.356439, 2.127791'];

		const formData: FormData[] = [{
			field: patientDetailPage.getSurnameInput(),
			name:  'Surname',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[0]
		}, {
			field: patientDetailPage.getNameInput(),
			name:  'Name',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[1]
		}, {
			field: patientDetailPage.getEmailInput(),
			name:  'Email',
			value: empty ? '' : 'try_' + i + '_' + basePatientValues[2]
		}, {
			field: patientDetailPage.getAddressStreetInput(),
			name:  'Address -> Street',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[3]
		}, {
			field: patientDetailPage.getAddressCityInput(),
			name:  'Address -> City',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[4]
		}, {
			field: patientDetailPage.getAddressZipInput(),
			name:  'Address -> Zip',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[5]
		}, {
			field: patientDetailPage.getAddressCoordinatesInput(),
			name:  'Address -> Coordinates',
			value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[6]
		}];
		return (formData);
	}


	it('Access to the Patient Management Dialog', () => {
		const title = 'Patient management';
		const buttons: ButtonState[] = [{
			name:   'Options',
			exist:  true,
			enable: true
		}, {
			name:   'Add',
			exist:  true,
			enable: true
		}, {
			name:   'Refresh',
			exist:  true,
			enable: true
		}];

		TestToolkit.checkPresentAndDisplayed(mainPage);
		allure.createStep('Action: Click on the button to view Patient Management Dialog', () => {
			mainPage.getPatientButtton().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientMaintenancePage, title, buttons);
		})();
	});

	it('Open Patient Creation Dialog', () => {
		const title = 'Create Patient';
		const buttons: ButtonState[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		patientMaintenancePage.getButtonAdd().click();
		TestToolkit.showNewPageAndCheckTitleAndButtons(patientDetailPage, title, buttons);
		TestUtil.checkForm(getPatientFormData(true), 'Patient Creation is empty');
	});

	it('Close the dialog', () => {
		allure.createStep('Action: Close Patient Management Dialog', () => {
			patientDetailPage.getButtonClose().click();
			allure.createStep('Dialog is closed', () => {
				TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
			})();
		})();
	});

	// Disabled because looking for a non-existent element is time-consuming
	xit('Validate that no patients are created yet', () => {
		allure.createStep('Action: No patients  the patient', () => {
			TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 0);
		})();
	});

	it('Create some patients', () => {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			allure.createStep('Action: Create the patient ' + i, () => {

			patientMaintenancePage.getButtonAdd().click();
			TestToolkit.checkPresentAndDisplayed(patientDetailPage);

			TestToolkit.fillForm(getPatientFormData(false, i), 'Patient Creation Form');
			TestUtil.checkForm(getPatientFormData(false, i), 'Patient Creation is correct');

			patientDetailPage.getButtonSubmit().click();
			TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
			TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', i);
			})();
		}

	});

	it('Validate the contextual menu at the patients grid', () => {
		const menuItems = ['Update', 'Delete'];
		for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
			allure.createStep(`Action: Access to each contextual menu`, () => {
				GridService.checkGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), row, menuItems);
			})();
		}
	});

	it('Validate that option Update opens Patient Maintenance', () => {

		GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), 0, PatientMaintenancePage.CONTEXTMENU_OPTION_UPDATE);
		TestToolkit.checkPresentAndDisplayed(patientDetailPage);

		patientDetailPage.getButtonClose().click();
		TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
	});

	it('Validate that clicking on a row opens Patient Maintenance', () => {

		GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, PatientMaintenancePage.GRID_COLUMN_NAME);
		TestToolkit.checkPresentAndDisplayed(patientDetailPage);

		patientDetailPage.getButtonClose().click();
		TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
	});


	it('Open modify patients and validate', () => {
		GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, PatientMaintenancePage.GRID_COLUMN_NAME);
		TestToolkit.checkPresentAndDisplayed(patientDetailPage);

		TestUtil.checkForm( getPatientFormData(false, 1), 'Patient Management is correct');

		TestToolkit.removeValuesInForm(getPatientFormData(true, ), 'Patient Management');

		TestToolkit.fillForm(getPatientFormData(false, 4), 'Patient Creation to update previous one');
		patientDetailPage.getButtonSubmit().click();

		TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
		TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Rows in table of Patients', 3);
	});

	it('Delete all elements recently added to the grid', () => {
		// const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Access to contextual menu at the row #${k} and select the option for delete`, () => {
				GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, PatientMaintenancePage.CONTEXTMENU_OPTION_DELETE);
				TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', k);
			})();
		}
	});
});
