import { browser } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { ButtonState, TestToolkit } from '../common/utilities/test-toolkit';
import { TestUtil } from '../common/utilities/test-util';

declare const allure: any;

describe('Instrument Selector Case: TC0001_PatientManagement_e2e ', () => {
	const expectedWindowTitlePatientManagement = 'patient management';
	const expectedWindowTitlePatientCreate = 'create patient';

	const patientManagementButtons: ButtonState[] = [{
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

	const patientEditCreateButtons: ButtonState[] = [{
		name:   'Create',
		exist:  true,
		enable: true
	}];

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

		allure.addLabel('tms', 'TC0001_PatientManagement_e2e');
		allure.addLabel('feature', 'Purpose: This TC is intended to verify the CRUD of a Patient');
		browser.driver.getCapabilities()
			.then((caps) => {
				browser.browserName = caps.get('browserName');
				allure.addLabel('browser', browser.browserName);
			});
		allure.addLabel('appVersion', loginPage.appVersion);
		allure.addLabel('tester', 'xcalvo');
		allure.addLabel('testExecutionDateTime', currentDate + ' ' + currentTime);
	});

	afterEach(() => {
		expect(TestToolkit.hasErrorsInConsole())
			.toBe(false, 'Some identified errors were present in the javascript console at the end of the test.');
	});

	it('Access to the "Patient Management" Dialog', () => {
		TestToolkit.checkPresentAndDisplayed(mainPage);
		allure.createStep('Action: Click on the "Patient" button', () => {
			mainPage.getPatientButtton().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientMaintenancePage, expectedWindowTitlePatientManagement, patientManagementButtons);
		})()
	});

	it('Patient Management: Click on the "Add" button', () => {
		allure.createStep('Action: Click on the "Add" button', () => {
			patientMaintenancePage.getButtonAdd().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientDetailPage, expectedWindowTitlePatientCreate, patientEditCreateButtons);
		})()
	});

	it('Create Patient: Validate the default values for all the fields', () => {
		TestUtil.checkField(patientDetailPage.getSurnameInput(), 'Surname', '');
		TestUtil.checkField(patientDetailPage.getNameInput(), 'Name', '');
		TestUtil.checkField(patientDetailPage.getEmailInput(), 'Email', '');
		TestUtil.checkField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', '');
		TestUtil.checkField(patientDetailPage.getAddressCityInput(), 'Address -> City', '');
		TestUtil.checkField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', '');
		TestUtil.checkField(patientDetailPage.getAddressCoordinatesInput(), 'Field "Address -> Coordinates', '');
	});

	it('Create Patient: Close the "Create Patient" dialog opened by the "Add" button', () => {
		allure.createStep('Action: Click on the button X to close the "Add" Window Dialog', () => {
			patientDetailPage.getButtonClose().click();
			TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
		})();
	});

	it('Create Patient: Test the Creation of Patients', () => {
		const patientEditCreateNewValues = ['Aparicio', 'José Luis', 'jlaparicio@werfen.com', 'Plaza de Europa, 21-23, 18th Floor', 'Barcelona', '08908', '41.356439, 2.127791'];
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {
			patientMaintenancePage.getButtonAdd().click();

			TestToolkit.fillField(patientDetailPage.getSurnameInput(), 'Surname', 'Try #' + i + ': ' + patientEditCreateNewValues[0]);
			TestToolkit.fillField(patientDetailPage.getNameInput(), 'Name', 'Try #' + i + ': ' + patientEditCreateNewValues[1]);
			TestToolkit.fillField(patientDetailPage.getEmailInput(), 'Email', 'try_' + i + '_' + patientEditCreateNewValues[2]);

			TestToolkit.fillField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', 'Try #' + i + ': ' + patientEditCreateNewValues[3]);
			TestToolkit.fillField(patientDetailPage.getAddressCityInput(), 'Address -> City', 'Try #' + i + ': ' + patientEditCreateNewValues[4]);
			TestToolkit.fillField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', 'Try #' + i + ': ' + patientEditCreateNewValues[5]);
			TestToolkit.fillField(patientDetailPage.getAddressCoordinatesInput(), 'Address -> Coordinates', 'Try #' + i + ': ' + patientEditCreateNewValues[6]);

			patientDetailPage.getButtonSubmit().click();
		}
	});

	it('Patient Management: Validate the contextual menu at the patients grid', () => {
		const menuitems = ['Update', 'Delete'];
		for (let k = 0; k < browser.params.repeatabilityNumberPasses; k++) {
			TestToolkit.checkGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, menuitems);
		}
	});

	it('Patient Management: Delete the elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: #${k}: Click on the three button contextual menu at a row on the grid area to open the menu and select option Delete`, () => {
				TestToolkit.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, optionMenuDelete);
			})();
		}
	});
});
