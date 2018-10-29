import { browser, ExpectedConditions as EC } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { JSConsole } from '../common/utilities/js-console';
import { ComponentUtilService } from '../common/utilities/component.util.service';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { ButtonState, TestToolkit } from '../common/utilities/test-toolkit';
import { TestUtil } from '../common/utilities/test-util';

declare const allure: any;

describe('Instrument Selector Case: TC0001_PatientManagement_e2e ', () => {
	const expectedWindowTitlePatientManagement = 'patient management';
	const contextualMenuPatientManagementGrid = ['update', 'delete'];
	const expectedWindowTitlePatientCreate = 'create patient';
	// TODO: It would be better to create a JSON structure to manage button information such as button text or status (enabled/disabled)

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
	}
	];

	const patientEditCreateButtons: ButtonState[] = [{
		name:   'Create',
		exist:  true,
		enable: true
	}
	];

	const patientEditCreateNewValues = ['Aparicio', 'José Luis', 'jlaparicio@werfen.com', 'Plaza de Europa, 21-23, 18th Floor', 'Barcelona', '08908', '41.356439, 2.127791'];
	const patientEditUpdateButtons = ['update'];
	const msTimeOutWaitForDialogWindow = 30000;   // in milliseconds

	let currentDate = '';
	let currentTime = '';

	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	const jsConsole = new JSConsole();
	const patientMaintenancePage = new PatientMaintenancePage();
	const patientDetailPage = new PatientDetailPage();

	beforeAll(() => {
		currentDate = ComponentUtilService.getCurrentDate();
		currentTime = ComponentUtilService.getCurrentTime();
		// TODO: move to a NavigationUtil
		loginPage.navigateToHomePage();
		browser.wait(EC.presenceOf(loginPage.getMainWindow()), msTimeOutWaitForDialogWindow, 'Login Dialog Window is taking too long to appear in the DOM (timeout: ' + msTimeOutWaitForDialogWindow + ' ms).');
		loginPage.login();
	});

	beforeEach(() => {
		jsConsole.clear();

		allure.addLabel('tms', 'TC0001_PatientManagement_e2e');
		allure.addLabel('feature', 'Purpose: This TC is intended to verify the CRUD of a Patient');
		browser.driver.getCapabilities()
			.then(function(caps) {
				browser.browserName = caps.get('browserName');
				allure.addLabel('browser', browser.browserName);
			});
		allure.addLabel('appVersion', loginPage.appVersion);
		allure.addLabel('tester', 'xcalvo');
		allure.addLabel('testExecutionDateTime', currentDate + ' ' + currentTime);
	});

	afterEach(() => {
		expect(jsConsole.hasErrors())
			.toBe(false, 'Some identified errors were present in the javascript console at the end of the test.');
	});

	it('Access to the "Patient Management" Dialog', () => {
		TestToolkit.checkPresentAndDisplayed(mainPage);
		allure.createStep('Action: Click on the "Patient" button', () => {
			mainPage.getPatientButtton().click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientMaintenancePage, expectedWindowTitlePatientManagement, patientManagementButtons);
		})()
	});

	it('Patient Management: Click on the "Add" button', function() {
		allure.createStep('Action: Click on the "Add" button', () => {
			patientMaintenancePage.getButtonAdd()
				.click();
			TestToolkit.showNewPageAndCheckTitleAndButtons(patientDetailPage, expectedWindowTitlePatientCreate, patientEditCreateButtons);
		})()
	});

	// TODO: Move to a TestUtil class with all the expects documented with Allure

	it('Create Patient: Validate the default values for all the fields', function() {

		TestUtil.checkField(patientDetailPage.getSurnameInput(), 'Surname', '');
		TestUtil.checkField(patientDetailPage.getNameInput(), 'Name', '');
		TestUtil.checkField(patientDetailPage.getEmailInput(), 'Email', '');
		TestUtil.checkField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', '');
		TestUtil.checkField(patientDetailPage.getAddressCityInput(), 'Address -> City', '');
		TestUtil.checkField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', '');
		TestUtil.checkField(patientDetailPage.getAddressCoordinatesInput(), 'Field "Address -> Coordinates', '');
	});

	// Close the window dialog so the Create Patiant that follows are consistent
	it('Create Patient: Close the "Create Patient" dialog opened by the "Add" button', () => {
		allure.createStep('Action: Click on the button X to close the "Add" Window Dialog', function() {
			// Close the window
			patientDetailPage.getButtonClose()
				.click();
			// Expect the previous window to be Present and Displayed
			TestToolkit.checkPresentAndDisplayed(patientMaintenancePage);
		})();
	});

	it('Create Patient: Test the Creation of Patients', function() {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {
			// Open the window
			patientMaintenancePage.getButtonAdd()
				.click();

			// Fill the values
			TestToolkit.fillField(patientDetailPage.getSurnameInput(), 'Surname', 'Try #' + i + ': ' + patientEditCreateNewValues[0]);
			TestToolkit.fillField(patientDetailPage.getNameInput(), 'Name', 'Try #' + i + ': ' + patientEditCreateNewValues[1]);
			TestToolkit.fillField(patientDetailPage.getEmailInput(), 'Email', 'try_' + i + '_' + patientEditCreateNewValues[2]);

			TestToolkit.fillField(patientDetailPage.getAddressStreetInput(), 'Address -> Street', 'Try #' + i + ': ' + patientEditCreateNewValues[3]);
			TestToolkit.fillField(patientDetailPage.getAddressCityInput(), 'Address -> City', 'Try #' + i + ': ' + patientEditCreateNewValues[4]);
			TestToolkit.fillField(patientDetailPage.getAddressZipInput(), 'Address -> Zip', 'Try #' + i + ': ' + patientEditCreateNewValues[5]);
			TestToolkit.fillField(patientDetailPage.getAddressCoordinatesInput(), 'Address -> Coordinates', 'Try #' + i + ': ' + patientEditCreateNewValues[6]);

			patientDetailPage.getButtonSubmit()
				.click();

			// The "Create Patient" window closes itself when the record was added
		}
	});
	/*
		it('Main Window: Patient Management: Validate the contextual menu at the patients grid', () => {
			let arrBooleans = contextualMenuPatientManagementGrid.map(a => {
				return true;
			});

			for (let k = 0; k < browser.params.repeatabilityNumberPasses; k++) {
				allure.createStep(`Pass #${k}: Click on the three button contextual menu at a row on the grid area`, () => {
					ComponentUtilService.getGridData(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
						.click();

					ComponentUtilService.getContextMenu(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
						.isDisplayed()
						.then((isDisplayed) => {
							// console.log("flag 1:", isDisplayed);
							allure.createStep('The item on the menu match', () => {
								expect(isDisplayed)
									.toEqual(arrBooleans)
							})()
						});

					ComponentUtilService.getContextMenu(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
						.isDisplayed()
						.then((inisDisplayed) => {
							if (inisDisplayed) {
								ComponentUtilService.getContextMenu(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
									.map((el) => {
										return el.getText();
									})
									.then((arrayElements) => {
										// console.log("arrayElements: ", arrayElements);
										allure.createStep('The item on the menu match', () => {
											expect(arrayElements.map(x => (String.prototype.toLowerCase.call(
												String.prototype.toLowerCase.call(x)))))
												.toEqual(contextualMenuPatientManagementGrid);
										})()
									});
							} else {
								fail('The contextual menu could not be displayed');
							}
						});
				})();

				allure.createStep(`Pass #${k}: Click on the three button contextual menu again to close the contextual menu`, function() {
					ComponentUtilService.getGridData(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
						.click();

					// ComponentUtilService.getContextMenu(patientMaintenancePage.getPatientsGrid(), patientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k).isDisplayed().then((isDisplayed) => {
					// expect(isDisplayed).toEqual([]);
					// });
				})();
			}
		});
	*/
	it('Patient Management: Delete the elements recently added to the grid', () => {
		const optionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Pass #${k}: Click on the three button contextual menu at a row on the grid area to open the menu`, function() {
				ComponentUtilService.getGridData(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k)
					.click();

				allure.createStep(`Action: Pass #${k}: Click on the "Delete" option`, function() {
					ComponentUtilService.getContextMenu(patientMaintenancePage.getPatientsGrid(), PatientMaintenancePage.GRID_COLUMN_CONTEXTMENU, k, optionMenuDelete)
						.click();
				})();
			})();
		}
	});
});
