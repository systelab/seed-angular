    import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { TestUtil } from '../common/utilities/test-util';
import { LoginNavigationService } from '../login/login.navigation.service';
import { MainNavigationService } from '../main/main.navigation.service';
import { GridService } from '../common/components/grid.service';
import { FormService } from '../common/components/form.service';
    import { TabService } from '../common/components/tab.service';
    import { ExpectsUtil } from '../common/utilities/expects-util';
    import { AllergyDetailPage } from '../allergy/allergy-detail/allergy-dialog.po';
    import { PatientDetailPage } from './patient-detail/patient-dialog.po';
    import { PatientAllergyDetailPage } from './patient-detail/patient-allergy-dialog.po';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const patientMaintenancePage = new PatientMaintenancePage();
    const allergyDetailPage = new AllergyDetailPage();
    const patientDetailPage = new PatientDetailPage();
    const patientAllergyDetailPage = new PatientAllergyDetailPage();

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage);
        MainNavigationService.navigateToPatientMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    function createAllergyItem(allergyData: string[]) {
        mainPage.getAllergyAddButton().click();
        allergyDetailPage.checkPresentAndDisplayed();
        allergyDetailPage.getNameInput().sendKeys(allergyData[0]);
        allergyDetailPage.getSignsInput().sendKeys(allergyData[1]);
        allergyDetailPage.getSymptomsInput().sendKeys(allergyData[2]);
        allergyDetailPage.getButtonSubmit().click();
        mainPage.checkConfSectionPresentAndDisplayed();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', 1);
    }

    function createPatientItem(patientData: string[]) {
        patientMaintenancePage.getButtonAdd().click();
        patientDetailPage.checkPresentAndDisplayed();
        patientDetailPage.getNameInput().sendKeys(patientData[0]);
        patientDetailPage.getSurnameInput().sendKeys(patientData[1]);
        patientDetailPage.getEmailInput().sendKeys(patientData[2]);
        patientDetailPage.getAddressStreetInput().sendKeys(patientData[3]);
        patientDetailPage.getAddressCityInput().sendKeys(patientData[4]);
        patientDetailPage.getAddressZipInput().sendKeys(patientData[5]);
        patientDetailPage.getAddressCoordinatesInput().sendKeys(patientData[6])
        patientDetailPage.getButtonSubmit().click();
        patientMaintenancePage.checkPresentAndDisplayed();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 1);
    }

    function assignAllegryToPatient(allergyNum: number) {
        patientDetailPage.getAddButton().click();
        patientAllergyDetailPage.checkPresentAndDisplayed();
        patientAllergyDetailPage.getAllergyCombobox().click();
        patientAllergyDetailPage.getAllergyList().get(0).click();
        /*
        patientAllergyDetailPage.getAssertedDateInput().sendKeys('01/01/2019'); // Error when sending these fields
        patientAllergyDetailPage.getAssertedDateInput().sendKeys(protractor.Key.TAB);
        patientAllergyDetailPage.getLastOccurrenceDateInput().sendKeys('02/02/2019'); // Error when sending these fields
        patientAllergyDetailPage.getLastOccurrenceDateInput().sendKeys(protractor.Key.TAB);
        */
        patientAllergyDetailPage.getAllergyNotes().sendKeys('aslhslkjhdsalkjah');
        patientAllergyDetailPage.getSubmitButton().click();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientDetailPage.getAllergyGrid()), 'Number of Allergies', 1);
    }

    it('Access to the Patient Management Dialog', () => {
        patientMaintenancePage.showNewPageAndCheckTitleAndButtons(patientMaintenancePage.title, patientMaintenancePage.buttons);
        const titles = ['', 'Name', 'Surname', 'Email']
        const grid = patientMaintenancePage.getPatientsGrid();
        GridService.checkGridHeaders(grid, titles);
    });

    it('Assign allergy to a patient', () => {
        patientMaintenancePage.getButtonClose()
            .click();
        MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
        createAllergyItem(['Name1', 'Signs1', 'Symptoms1']);

        MainNavigationService.navigateToPatientMaintenancePage(mainPage);
        createPatientItem(['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
        GridService.clickOnCell(patientMaintenancePage.getPatientsGrid(), 0, GridService.GRID_COLUMN_NAME);
        patientDetailPage.checkPresentAndDisplayed();
        TabService.getTab(patientDetailPage.getMainWindow(), 1)
            .click();
        assignAllegryToPatient(0);

        // allergy and patient deletion
        GridService.clickGridPopupMenuContentAtRow(patientDetailPage.getAllergyGrid(), 0, 1)
        patientDetailPage.getButtonClose()
            .click();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 1);
        GridService.clickGridPopupMenuContentAtRow(patientMaintenancePage.getPatientsGrid(), 0, 1);
        patientMaintenancePage.getButtonClose()
            .click();
        ExpectsUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', 1);
        GridService.clickGridPopupMenuContentAtRow(mainPage.getAllergyGrid(), 0, 1);
    });

    // Disabled because looking for a non-existent element is time-consuming
    /*xit('Validate that no patients are created yet', () => {
     allure.createStep('Action: No patients  the patient', () => {
     TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 0);
     })();
     });*/
});
