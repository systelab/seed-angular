import { browser } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { TestUtil } from '../common/utilities/test-util';
import { GridService } from '../common/components/grid.service';
import { ButtonState } from '../common/components/button.service';
import { FormService, FormData } from '../common/components/form.service';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	const patientMaintenancePage = new PatientMaintenancePage();
	const patientDetailPage = new PatientDetailPage();

	beforeAll(() => {
		loginPage.navigateToHomePage();
		loginPage.login();
	});

	beforeEach(() => {
		TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
			loginPage.appVersion, 'userName');
	});

	/* Base data to fill/check in form Create/Update patients*/
	function getFormData(i?: number): FormData[] {
		const basePatientValues = ['Surname', 'Name', 'email@werfen.com', 'Plaza de Europa, 21-23', 'Barcelona', '08908', '41.356439, 2.127791'];

		const empty = (i === undefined);
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

		mainPage.checkPresentAndDisplayed();
		mainPage.getPatientButtton()
			.click();
		patientMaintenancePage.showNewPageAndCheckTitleAndButtons(title, buttons);
	});

	it('Open Patient Creation Dialog', () => {
		const title = 'Create Patient';
		const buttons: ButtonState[] = [{
			name:   'Create',
			exist:  true,
			enable: true
		}];
		patientMaintenancePage.checkPresentAndDisplayed();
		patientMaintenancePage.getButtonAdd()
			.click();
		patientDetailPage.showNewPageAndCheckTitleAndButtons(title, buttons);
		TestUtil.checkForm(getFormData(), 'Patient Creation is empty');
	});

	it('Close the dialog', () => {
		patientDetailPage.getButtonClose()
			.click();
		allure.createStep('Dialog is closed', () => {
			patientMaintenancePage.checkPresentAndDisplayed();
		})();
	});

	// Disabled because looking for a non-existent element is time-consuming
	/*xit('Validate that no patients are created yet', () => {
	 allure.createStep('Action: No patients  the patient', () => {
	 TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 0);
	 })();
	 });*/

	it('Create Patients', () => {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			allure.createStep('Action: Create the patient ' + i, () => {

				patientMaintenancePage.getButtonAdd()
					.click();
				patientDetailPage.checkPresentAndDisplayed();

				FormService.fillForm(getFormData(i), 'Patient Creation Form');
				TestUtil.checkForm(getFormData(i), 'Patient Creation is correct');

				patientDetailPage.getButtonSubmit()
					.click();
				patientMaintenancePage.checkPresentAndDisplayed();
				TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', i);

				GridService.getRow(patientMaintenancePage.getPatientsGrid(), i - 1)
					.then(function(cellValues) {
						TestUtil.checkText(cellValues[2], 'Row Name', getFormData(i)[0].value);
						TestUtil.checkText(cellValues[1], 'Row Surname', getFormData(i)[1].value);
						TestUtil.checkText(cellValues[3], 'Row Email', getFormData(i)[2].value);

					});
			})();
		}
	});

	it('Contextual menu at the patients grid', () => {
		const menuItems = ['Update', 'Delete'];
		for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
			allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), () => {
				GridService.checkGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), row, menuItems);
			})();
		}
	});

	it('The option Update opens Patient Detail', () => {
		const optionMenuUpdate = 0;
		GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), 0, optionMenuUpdate);
		patientDetailPage.checkPresentAndDisplayed();

		patientDetailPage.getButtonClose()
			.click();
		patientMaintenancePage.checkPresentAndDisplayed();
	});

	it('Click on a row and open Patient Detail', () => {

		GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, GridService.GRID_COLUMN_NAME);
		patientDetailPage.checkPresentAndDisplayed();

		patientDetailPage.getButtonClose()
			.click();
		patientMaintenancePage.checkPresentAndDisplayed();
	});

	it('Modify Patients', () => {
		GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, GridService.GRID_COLUMN_NAME);
		patientDetailPage.checkPresentAndDisplayed();

		TestUtil.checkForm(getFormData(1), 'Patient Management is correct');

		FormService.removeValuesInForm(getFormData(), 'Patient Management');

		FormService.fillForm(getFormData(4), 'Patient Creation to update previous one');
		patientDetailPage.getButtonSubmit()
			.click();

		patientMaintenancePage.checkPresentAndDisplayed();
		TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Rows in table of Patients', 3);
	});

	it('Delete all elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Delete the Patient at the row #${k}`, () => {
				GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, optionMenuDelete);
				TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', k);
			})();
		}
	});

});
