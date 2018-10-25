import { browser, ExpectedConditions as EC } from 'protractor';
import {} from 'jasmine';

declare const allure: any;

import { LoginPage }                                          from '../login/login.po';
import { MainPage }                                           from '../main/main.po';
import { JSConsole }                                          from '../common/utilities/js-console';
import { ComponentUtilService }                                from '../common/utilities/component.util.service';
import { DialogView }                                            from '../common/utilities/dialog-view';
import { PatientManagementPage }                              from "./patient-maintenance.po";
import { PatientEditPage }                                    from "./patient-detail/patient-dialog.po";

describe('Instrument Selector Case: TC0001_PatientManagement_e2e ', () => {
	//  This test: version, email of the "last modified by" developer & tester
	//const BUTTON_STATE_ISDISABLED                      = 'true';
	const BUTTON_STATE_ISNOTDISABLED = null;
	const expectedWindowTitlePatientManagement = 'patient management';
	const contextualMenuPatientManagementGrid = ['update', 'delete'];
	const expectedWindowTitlePatientCreate = 'create patient';
	//const expectedWindowTitlePatientUpdate             = 'update patient';
	//TODO: It would be better to create a JSON structure to manage button information such as button text or status (enabled/disabled)
	const PatientManagementButtons = ['options', 'add', 'refresh'];
	const PatientEditCreateButtons = ['create'];
	const PatientEditCreateNewValues = ['Aparicio', 'José Luis', 'jlaparicio@werfen.com', 'Plaza de Europa, 21-23, 18th Floor', 'Barcelona', '08908', '41.356439, 2.127791'];
	const PatientEditUpdateButtons = ['update'];
	const msTimeOutWaitForDialogWindow = 30000;   // in milliseconds

	let currentDate: string = "";
	let currentTime: string = "";

	let loginPage = new LoginPage();
	let mainPage = new MainPage();
	let jsConsole = new JSConsole();
	let dialogView = new DialogView();
	let PatientMgmtPage = new PatientManagementPage();
	let PatientEditionPage = new PatientEditPage();

	beforeAll(() => {
		currentDate = ComponentUtilService.getCurrentDate();
		currentTime = ComponentUtilService.getCurrentTime();
		//TODO: move to a NavigationUtil
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

		expect(mainPage.getMainWindow()
			.isPresent())
			.toBe(true, 'Window should be present on the DOM');

		expect(mainPage.getMainWindow()
			.isDisplayed())
			.toBe(true, 'Window should be displayed');

		allure.createStep('Action: Click on the "Patient" button', () => {
			mainPage.getPatientButtton()
				.click();

			// TODO: It could be useful to move the lines below to an util to be reused in all the screens. Parameters: Page, title
			browser.wait(EC.presenceOf(PatientMgmtPage.getMainWindow()), msTimeOutWaitForDialogWindow, 'Patient Management Dialog Window is taking too long to appear in the DOM (timeout: ' + msTimeOutWaitForDialogWindow + ' ms).');

			expect(PatientMgmtPage.getMainWindow()
				.isPresent())
				.toBe(true, 'Window should be present on the DOM');

			expect(PatientMgmtPage.getMainWindow()
				.isDisplayed())
				.toBe(true, 'Window should be displayed');

			allure.createStep('The title is valid', () => {
				PatientMgmtPage.getTitle()
					.getText()
					.then(function(inText) {
						expect(inText.toLowerCase())
							.toEqual(expectedWindowTitlePatientManagement, 'The title of the window is not the same');
					});
			});
		})()
	});

	it('Patient Management: Validate the caption and count for the predefined buttons', function() {
		allure.createStep('Action: Get all the buttons', () => {
			// TODO: It could be useful to move the lines below to an util to be reused in all the screens
			PatientManagementButtons.forEach(function(buttonElem) {
				PatientMgmtPage.existButton(buttonElem)
					.then(function(existButton) {
						allure.createStep(`Button ${buttonElem} is present`, () => {
							expect(existButton)
								.toBe(true, `Button ${buttonElem} should be present`);
						})()
					});
			});

			PatientMgmtPage.getAllButtons()
				.count()
				.then(function(inCount) {
					allure.createStep(`Buttons count should be equal to ${PatientManagementButtons.length}`, () => {
						expect(inCount)
							.toBe(PatientManagementButtons.length, "Buttons count");
					})()
				});
		})()
	});

	it('Patient Management: Validate the state of the buttons', function() {
		allure.createStep('Action: Get the state of the buttons', () => {
			// TODO: It could be useful to move the lines below to an util to be reused in all the screens. It would be better to have just an util to manage button text and status (disableD/enabled)
			PatientMgmtPage.getbtnOptions()
				.getAttribute('disabled')
				.then(function(isDisabled) {
					expect(isDisabled)
						.toBe(BUTTON_STATE_ISNOTDISABLED, 'Button Options should be enabled');
				});

			PatientMgmtPage.getbtnAdd()
				.getAttribute('disabled')
				.then(function(isDisabled) {
					expect(isDisabled)
						.toBe(BUTTON_STATE_ISNOTDISABLED, 'Button Add should be enabled');
				});

			PatientMgmtPage.getbtnRefresh()
				.getAttribute('disabled')
				.then(function(isDisabled) {
					expect(isDisabled)
						.toBe(BUTTON_STATE_ISNOTDISABLED, 'Button Refresh should be enabled');
				});
		})()
	});

	it('Patient Management: Click on the "Add" button', function() {
		allure.createStep('Action: Click on the "Add" button', () => {
			PatientMgmtPage.getbtnAdd()
				.click();

			// TODO: It could be useful to move the lines below to an util to be reused in all the screens. Parameters: Page, title
			browser.wait(EC.presenceOf(PatientEditionPage.getMainWindow()), msTimeOutWaitForDialogWindow, 'Patient Edit Dialog Window is taking too long to appear in the DOM (timeout: ' + msTimeOutWaitForDialogWindow + ' ms).');
			expect(PatientEditionPage.getMainWindow()
				.isPresent())
				.toBe(true, 'Window should be present on the DOM');

			expect(PatientEditionPage.getMainWindow()
				.isDisplayed())
				.toBe(true, 'Window should be displayed');

			allure.createStep('The title is valid', () => {
				PatientEditionPage.getTitle()
					.getText()
					.then(function(inText) {
						expect(inText.toLowerCase())
							.toEqual(expectedWindowTitlePatientCreate, 'The title of the window is not the same');
					});
			});
		})()
	});

	it('Create Patient: Validate the caption and count for the predefined buttons', function() {
		allure.createStep('Action: Get all the buttons', () => {
			// TODO: It could be useful to move the lines below to an util to be reused in all the screens
			PatientEditCreateButtons.forEach(function(buttonElem) {
				PatientEditionPage.existButton(buttonElem)
					.then(function(existButton) {
						allure.createStep(`Button ${buttonElem} is present`, () => {
							expect(existButton)
								.toBe(true, `Button ${buttonElem} should be present`);
						})()
					});
			});

			PatientEditionPage.getAllButtons()
				.count()
				.then(function(inCount) {
					allure.createStep(`Buttons count should be equal to ${PatientEditCreateButtons.length}`, () => {
						expect(inCount)
							.toBe(PatientEditCreateButtons.length, "Buttons count");
					})()
				});
		})()
	});

	it('Create Patient: Validate the state of the buttons', function() {
		allure.createStep('Action: Get the state of the buttons', () => {
			PatientEditionPage.getbtnSubmit()
				.getAttribute('disabled')
				.then(function(isDisabled) {
					expect(isDisabled)
						.toBe(BUTTON_STATE_ISNOTDISABLED, 'Button Create should be enabled');
				});
		})()
	});

	//TODO: Move to a TestUtil class with all the expects documented with Allure
	/*public 	checkField(field:string, expectedValue: string, returnedValue:string)
	 {
	 allure.createStep('Field field is equals to returnedValue, () => {
	 expect(expectedValue)
	 .toBe(returnedValue, '');
	 })();
	 }*/

	it('Create Patient: Validate the default values for all the fields', function() {
		PatientEditionPage.getSurnameInput()
			.getAttribute('value')
			.then(function(inValue) {
				//this.checkField('Surname', '',inValue);
				allure.createStep('Action: Get the default value of the field "Surname"', () => {
					expect(inValue)
						.toBe("", 'Field "Surname" should be empty');
				})();
			});

		allure.createStep('Action: Get the default value of the field "Name"', () => {
			PatientEditionPage.getNameInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Name" should be empty');
				});
		})();

		allure.createStep('Action: Get the default value of the field "Email"', () => {
			PatientEditionPage.getEmailInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Email" should be empty');
				});
		})();

		allure.createStep('Action: Get the default value of the field "Address -> Street"', () => {
			PatientEditionPage.getAddressStreetInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Address -> Street" should be empty');
				});
		})();

		allure.createStep('Action: Get the default value of the field "Address -> City"', () => {
			PatientEditionPage.getAddressCityInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Address -> City" should be empty');
				});
		})();

		allure.createStep('Action: Get the default value of the field "Address -> Zip"', () => {
			PatientEditionPage.getAddressZipInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Address -> Zip" should be empty');
				});
		})();

		allure.createStep('Action: Get the default value of the field "Address -> Coordinates"', () => {
			PatientEditionPage.getAddressCoordinatesInput()
				.getAttribute('value')
				.then(function(inValue) {
					expect(inValue)
						.toBe("", 'Field "Address -> Coordinates" should be empty');
				});
		})()
	});

	// Close the window dialog so the Create Patiant that follows are consistent
	it('Main Window: Create Patient: Close the "Create Patient" dialog opened by the "Add" button', () => {
		allure.createStep('Action: Click on the button X to close the "Add" Window Dialog', function() {
			// Close the window
			PatientEditionPage.getbtnClose()
				.click();

			// Expect the previous window to be Present and Displayed
			allure.createStep('The window dialog is present', () => {
				expect(PatientMgmtPage.getMainWindow()
					.isPresent())
					.toBe(true);
			})();

			allure.createStep('The window dialog is displayed', () => {
				expect(PatientMgmtPage.getMainWindow()
					.isDisplayed())
					.toBe(true);
			})()
		})();
	});

	it('Main Window: Create Patient: Test the Creation of Patients', function() {
		for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {
			// Open the window
			PatientMgmtPage.getbtnAdd()
				.click();

			// Fill the values
			allure.createStep('Action: Fill "Surname"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[0]);
				PatientEditionPage.getSurnameInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Surname" has the filled value', () => {
							PatientEditionPage.getSurnameInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Surname" was not properly filled');
								});
						})()
					});
			})();
			//TODO: Move to a TextField util
			allure.createStep('Action: Fill "Name"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[1]);
				PatientEditionPage.getNameInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Name" has the filled value', () => {
							PatientEditionPage.getNameInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Name" was not properly filled');
								});
						})()
					});
			})();

			allure.createStep('Action: Fill "Email"', () => {
				let textToInsert = new String('try_' + i + '_' + PatientEditCreateNewValues[2]);
				PatientEditionPage.getEmailInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Email" has the filled value', () => {
							PatientEditionPage.getEmailInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Email" was not properly filled');
								});
						})()
					});
			})();

			allure.createStep('Action: Fill "Address -> Street"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[3]);
				PatientEditionPage.getAddressStreetInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Address -> Street" has the filled value', () => {
							PatientEditionPage.getAddressStreetInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Address -> Street" was not properly filled');
								});
						})()
					});
			})();

			allure.createStep('Action: Fill "Address -> City"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[4]);
				PatientEditionPage.getAddressCityInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Address -> City" has the filled value', () => {
							PatientEditionPage.getAddressCityInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Address -> City" was not properly filled');
								});
						})()
					});
			})();

			allure.createStep('Action: Fill "Address -> Zip"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[5]);
				PatientEditionPage.getAddressZipInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Address -> Zip" has the filled value', () => {
							PatientEditionPage.getAddressZipInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Address -> Zip" was not properly filled');
								});
						})()
					});
			})();

			allure.createStep('Action: Fill "Address -> Coordinates"', () => {
				let textToInsert = new String('Try #' + i + ': ' + PatientEditCreateNewValues[6]);
				PatientEditionPage.getAddressCoordinatesInput()
					.sendKeys(textToInsert.valueOf())
					.then(function() {
						allure.createStep('"Address -> Coordinates" has the filled value', () => {
							PatientEditionPage.getAddressCoordinatesInput()
								.getAttribute('value')
								.then(function(inValue) {
									expect(inValue)
										.toBe(textToInsert.valueOf(), 'Field "Address -> Coordinates" was not properly filled');
								});
						})()
					});
			})();

			// Click on Create
			PatientEditionPage.getbtnSubmit()
				.click();

			// The "Create Patient" window closes itself when the record was added
		}
	});

	it('Main Window: Patient Management: Validate the contextual menu at the patients grid', () => {
		let arrBooleans = [];
		for (let h = 0; h < contextualMenuPatientManagementGrid.length; h++) {
			arrBooleans.push(true);
		}

		for (let k = 0; k < browser.params.repeatabilityNumberPasses; k++) {
			allure.createStep(`Pass #${k}: Click on the three button contextual menu at a row on the grid area`, function() {
				ComponentUtilService.getGridData(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
					.click();

				ComponentUtilService.getContextMenu(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
					.isDisplayed()
					.then((isDisplayed) => {
						//console.log("flag 1:", isDisplayed);
						allure.createStep('The item on the menu match', () => {
							expect(isDisplayed)
								.toEqual(arrBooleans)
						})()
					});

				ComponentUtilService.getContextMenu(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
					.isDisplayed()
					.then(function(inisDisplayed) {
						if (inisDisplayed) {
							ComponentUtilService.getContextMenu(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
								.map(function(el) {
									return el.getText();
								})
								.then(function(arrayElements) {
									//console.log("arrayElements: ", arrayElements);
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
				ComponentUtilService.getGridData(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
					.click();

				/*ComponentUtilService.getContextMenu(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k).isDisplayed().then((isDisplayed) => {
				 expect(isDisplayed).toEqual([]);
				 });*/
			})();
		}
	});

	it('Main Window: Patient Management: Delete the elements recently added to the grid', () => {
		const OptionMenuDelete = 1;
		for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
			allure.createStep(`Action: Pass #${k}: Click on the three button contextual menu at a row on the grid area to open the menu`, function() {
				ComponentUtilService.getGridData(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k)
					.click();

				allure.createStep(`Action: Pass #${k}: Click on the "Delete" option`, function() {
					ComponentUtilService.getContextMenu(PatientMgmtPage.getPatientsGrid(), PatientMgmtPage.GRID_COLUMN_CONTEXTMENU, k, OptionMenuDelete)
						.click();
				})();
			})();
		}
	});
});
