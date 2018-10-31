import { browser } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { ButtonState, TestToolkit } from '../common/utilities/test-toolkit';
import { TestUtil } from '../common/utilities/test-util';

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

	afterEach(() => {
		expect(TestToolkit.hasErrorsInConsole())
			.toBe(false, 'Some identified errors were present in the javascript console at the end of the test.');
	});

	it('Access to the "Patient Management" Dialog', () => {
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
		allure.createStep('Action: Click on the "Patient" button', () => {
			mainPage.getPatientButtton().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientMaintenancePage, title, buttons);
		})()
	});

	it('Click on the "Add" button', () => {
			const title = 'Create Patient';
			const buttons: ButtonState[] = [{
				name:   'Create',
				exist:  true,
				enable: true
			}];
			patientMaintenancePage.getButtonAdd().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientDetailPage, title, buttons);
	});

	it('Validate the default values for all the fields', () => {
		TestUtil.checkField(patientDetailPage.getSurnameInput(), 'Surname', '');
		TestUtil.checkField(patientDetailPage.getNameInput(), 'Name', '');
		TestUtil.checkField(patientDetailPage.getEmailInput(), 'Email', '');
		TestUtil.checkField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', '');
		TestUtil.checkField(patientDetailPage.getAddressCityInput(), 'Address -> City', '');
		TestUtil.checkField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', '');
		TestUtil.checkField(patientDetailPage.getAddressCoordinatesInput(), 'Field "Address -> Coordinates', '');
	});

	it('Close the dialog', () => {
			patientDetailPage.getButtonClose().click();
			TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
	});

	it('Create some patients', () => {
		const patientEditCreateNewValues = ['Aparicio', 'José Luis', 'jlaparicio@werfen.com', 'Plaza de Europa, 21-23, 18th Floor', 'Barcelona', '08908', '41.356439, 2.127791'];
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

			allure.createStep('Action: Create the patient ' + i, () => {

				patientMaintenancePage.getButtonAdd().click();
				TestToolkit.checkPresentAndDisplayed(patientDetailPage);

				TestToolkit.fillField(patientDetailPage.getSurnameInput(), 'Surname', 'Try #' + i + ': ' + patientEditCreateNewValues[0]);
				TestToolkit.fillField(patientDetailPage.getNameInput(), 'Name', 'Try #' + i + ': ' + patientEditCreateNewValues[1]);
				TestToolkit.fillField(patientDetailPage.getEmailInput(), 'Email', 'try_' + i + '_' + patientEditCreateNewValues[2]);

				TestToolkit.fillField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', 'Try #' + i + ': ' + patientEditCreateNewValues[3]);
				TestToolkit.fillField(patientDetailPage.getAddressCityInput(), 'Address -> City', 'Try #' + i + ': ' + patientEditCreateNewValues[4]);
				TestToolkit.fillField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', 'Try #' + i + ': ' + patientEditCreateNewValues[5]);
				TestToolkit.fillField(patientDetailPage.getAddressCoordinatesInput(), 'Address -> Coordinates', 'Try #' + i + ': ' + patientEditCreateNewValues[6]);

				patientDetailPage.getButtonSubmit().click();
				TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
			})();
		}
	});

	it('Validate the contextual menu at the patients grid', () => {
		const menuitems = ['Update', 'Delete'];
		for (let k = 0; k < browser.params.repeatabilityNumberPasses; k++) {
			TestToolkit.checkGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, menuitems);
		}
	});

	it('Patient Management: Delete the elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Click on the three button contextual menu at the row #${k} in the grid. Select the option Delete`, () => {
				TestToolkit.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, optionMenuDelete);
			})();
		}
	});
});
