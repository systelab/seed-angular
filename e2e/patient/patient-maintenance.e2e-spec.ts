import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { TestUtil } from '../common/utilities/test-util';
import { ExpectsUtil } from '../common/utilities/expects-util';
import { AllergyDetailPage } from '../allergy/allergy-detail/allergy-dialog.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { PatientAllergyDetailPage } from './patient-detail/patient-allergy-dialog.po';
import { NavigationService } from '../common/utilities/navigation.service';
import { browser } from 'protractor';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const patientMaintenancePage = new PatientMaintenancePage();
    const allergyDetailPage = new AllergyDetailPage();
    const patientDetailPage = new PatientDetailPage();
    const patientAllergyDetailPage = new PatientAllergyDetailPage();

    beforeAll(() => {
        NavigationService.navigateToHomePage(loginPage);
        NavigationService.login(loginPage);
        NavigationService.navigateToPatientMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    function createAllergyItem(allergyData: string[]) {
        mainPage.getAllergyAddButton().click();
        allergyDetailPage.checkPresentAndDisplayed();
        allergyDetailPage.getNameInput().setText(allergyData[0]);
        allergyDetailPage.getSignsInput().setText(allergyData[1]);
        allergyDetailPage.getSymptomsInput().setText(allergyData[2]);
        allergyDetailPage.getButtonSubmit().click();

        ExpectsUtil.checkWidgetPresentAndDisplayed(mainPage.getConfigTabs(), 'Config. tabs');
        ExpectsUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyAddButton(), 'Allergy Add button');
        ExpectsUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyRefreshButton(), 'Allergy Refresh button');
        ExpectsUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyOptionsButton(), 'Allergy Options button');
        ExpectsUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyGrid(), 'Allergy grid');

        ExpectsUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    function createPatientItem(patientData: string[]) {
        patientMaintenancePage.getButtonAdd().click();
        patientDetailPage.checkPresentAndDisplayed();
        patientDetailPage.getNameInput().setText(patientData[0]);
        patientDetailPage.getSurnameInput().setText(patientData[1]);
        patientDetailPage.getEmailInput().setText(patientData[2]);
        patientDetailPage.getAddressStreetInput().setText(patientData[3]);
        patientDetailPage.getAddressCityInput().setText(patientData[4]);
        patientDetailPage.getAddressZipInput().setText(patientData[5]);
        patientDetailPage.getAddressCoordinatesInput().setText(patientData[6])
        patientDetailPage.getButtonSubmit().click();
        patientMaintenancePage.checkPresentAndDisplayed();
        ExpectsUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);
    }

    function assignAllegryToPatient(allergyNum: number) {
        patientDetailPage.getAddButton().click();
        patientAllergyDetailPage.checkPresentAndDisplayed();
        patientAllergyDetailPage.getAllergyCombobox().click();
        patientAllergyDetailPage.getAllergyList().get(0).click();

/*
        patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
        patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');
*/
        patientAllergyDetailPage.getAllergyNotes().setText('aslhslkjhdsalkjah');
        patientAllergyDetailPage.getSubmitButton().click();
        ExpectsUtil.checkNumber(patientDetailPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    it('Access to the Patient Management Dialog', () => {
        patientMaintenancePage.showNewPageAndCheckTitleAndButtons(patientMaintenancePage.title, patientMaintenancePage.buttons);
        const titles = ['', 'Name', 'Surname', 'Email']
        patientMaintenancePage.getPatientsGrid().checkGridHeaders(titles);
    });

    it('Assign allergy to a patient', () => {
        const optionMenuDelete = 1;

        patientMaintenancePage.getButtonClose().click();
        NavigationService.navigateToAllergyMaintenancePage(mainPage);
        createAllergyItem(['Name1', 'Signs1', 'Symptoms1']);

        NavigationService.navigateToPatientMaintenancePage(mainPage);
        createPatientItem(['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
        patientMaintenancePage.getPatientsGrid().clickOnCell(0, 'name');
        patientDetailPage.checkPresentAndDisplayed();
        patientDetailPage.getTabs().selectTab(1);

        ExpectsUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);

        assignAllegryToPatient(0);

        // allergy and patient deletion
        patientDetailPage.getAllergyGrid().clickOnRowMenu(0);
        patientDetailPage.getAllergyGrid().getMenu().selectOption(1);

        patientDetailPage.getButtonClose().click();


        patientMaintenancePage.getPatientsGrid().clickOnRowMenu(0);
        patientMaintenancePage.getPatientsGrid().getMenu().selectOption(optionMenuDelete);

        patientMaintenancePage.getButtonClose().click();
        ExpectsUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);

        // Delete the created allergy
        mainPage.getAllergyGrid().clickOnRowMenu(0);
        mainPage.getAllergyGrid().getMenu().selectOption(1);
    });

});
