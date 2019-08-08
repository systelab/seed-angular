import { browser, protractor } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { TestUtil } from '../common/utilities/test-util';
import { GridService } from '../common/components/grid.service';
import { ButtonState } from '../common/components/button.service';
import { FormService, FormData } from '../common/components/form.service';
import { LoginNavigationService } from '../login/login.navigation.service';
import { MainNavigationService } from '../main/main.navigation.service';
import { AllergyDetailPage } from '../allergy/allergy-detail/allergy-dialog.po';
import { ExpectsUtil } from '../common/utilities/expects-util';
import { TabService } from '../common/components/tab.service';
import { PatientAllergyDetailPage } from './patient-detail/patient-allergy-dialog.po';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const patientMaintenancePage = new PatientMaintenancePage();
    const patientDetailPage = new PatientDetailPage();
    const allergyDetailPage = new AllergyDetailPage();
    const patientAllergyDetailPage = new PatientAllergyDetailPage();

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage, false);
        MainNavigationService.navigateToPatientMaintenancePage(mainPage);
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

    xit('Open Patient Creation Dialog', () => {
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

    xit('Close the dialog', () => {
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

    xit('Create Patients', () => {
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

    xit('Contextual menu at the patients grid', () => {
        const menuItems = ['Update', 'Delete'];
        for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
            allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), () => {
                GridService.checkGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), row, menuItems);
            })();
        }
    });

    xit('The option Update opens Patient Detail', () => {
        const optionMenuUpdate = 0;
        GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), 0, optionMenuUpdate);
        patientDetailPage.checkPresentAndDisplayed();

        patientDetailPage.getButtonClose()
            .click();
        patientMaintenancePage.checkPresentAndDisplayed();
    });

    xit('Click on a row and open Patient Detail', () => {
        const tabs = PatientDetailPage.tabs;
        GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, GridService.GRID_COLUMN_NAME);
        patientDetailPage.checkPresentAndDisplayed();

        TestUtil.checkCount(patientDetailPage.getAllTabs(), 'Tabs number', tabs.length);
        tabs.forEach((tabElement, index) => {
            TestUtil.checkText(patientDetailPage.getAllTabs().get(index), `Tab[${tabElement}]: ${tabElement}`, tabElement);
        });

        patientDetailPage.getButtonClose()
            .click();
        patientMaintenancePage.checkPresentAndDisplayed();
    });

    xit('Modify Patients', () => {
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

    xit('Delete all elements recently added to the grid', () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            allure.createStep(`Action: Delete the Patient at the row #${k}`, () => {
                GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), k, optionMenuDelete);
                TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', k);
            })();
        }
    });

    it('Assign allergy to a patient', () => {
        // patient management page. -> go to Allergy management
        patientMaintenancePage.getButtonClose()
            .click();
        mainPage.checkPresentAndDisplayed();
        mainPage.getConfigIcon()
            .click();
        mainPage.checkConfSectionPresentAndDisplayed();
        // Insert new Allergy and check
        mainPage.getAllergyAddButton().click();
        allergyDetailPage.checkPresentAndDisplayed();
        allergyDetailPage.getNameInput().sendKeys('Name1');
        allergyDetailPage.getSignsInput().sendKeys('Signs1');
        allergyDetailPage.getSymptomsInput().sendKeys('Symptoms1');
        allergyDetailPage.getButtonSubmit().click();
        mainPage.checkConfSectionPresentAndDisplayed();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', 1);
        // Go to patient
        mainPage.getPatientButton().click();
        patientMaintenancePage.checkPresentAndDisplayed();
        // Create patient
        patientMaintenancePage.getButtonAdd().click();
        patientDetailPage.checkPresentAndDisplayed();
        patientDetailPage.getNameInput().sendKeys('Patient1');
        patientDetailPage.getSurnameInput().sendKeys('Surname1');
        patientDetailPage.getEmailInput().sendKeys('email@kk.com');
        patientDetailPage.getAddressStreetInput().sendKeys('Sample St');
        patientDetailPage.getAddressCityInput().sendKeys('Khartum');
        patientDetailPage.getAddressZipInput().sendKeys('112234');
        patientDetailPage.getAddressCoordinatesInput().sendKeys('12.123456 32.15246')
        patientDetailPage.getButtonSubmit().click();
        patientMaintenancePage.checkPresentAndDisplayed();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 1);
        // Assign allergy
        GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, GridService.GRID_COLUMN_NAME);
        patientDetailPage.checkPresentAndDisplayed();
        TabService.getTab(patientDetailPage.getMainWindow(), 1).click();
        patientDetailPage.getAddButton().click();
        patientAllergyDetailPage.checkPresentAndDisplayed();
        patientAllergyDetailPage.getAllergyCombobox().click();
        patientAllergyDetailPage.getAllergyList().get(0).click();
        /*
        patientAllergyDetailPage.getAssertedDateInput().sendKeys('01/01/2019');
        patientAllergyDetailPage.getAssertedDateInput().sendKeys(protractor.Key.TAB);
        patientAllergyDetailPage.getLastOccurrenceDateInput().sendKeys('02/02/2019');
        patientAllergyDetailPage.getLastOccurrenceDateInput().sendKeys(protractor.Key.TAB);
        */
        patientAllergyDetailPage.getAllergyNotes().sendKeys('aslhslkjhdsalkjah');
        patientAllergyDetailPage.getSubmitButton().click();
        // Check all
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientDetailPage.getAllergyGrid()), 'Number of Allergies', 1);
        // delete patient-allergy
        GridService.clickGridPopupMenuContentAtRow(patientDetailPage.getAllergyGrid(), 0, 1)
        // ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientDetailPage.getAllergyGrid()), 'Number of Allergies', 0);
        expect(GridService.gridHasData(patientDetailPage.getAllergyGrid())).toBe(false);
        // delete patient
        patientDetailPage.getButtonClose().click();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 1);
        GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), 0, 1);
        // ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 0);
        expect(GridService.gridHasData(patientMaintenancePage.getPatientsGrid())).toBe(false);
        patientMaintenancePage.getButtonClose().click();
        // Delete allergy
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', 1);
        GridService.clickGridPopupMenuContentAtRow(mainPage.getAllergyGrid(), 0, 1);
        // ExpectsUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', 0);
        expect(GridService.gridHasData(mainPage.getAllergyGrid())).toBe(false);
    });
});
