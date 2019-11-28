import { LoginPage } from '../../page-objects/login/login.po';
import { MainPage } from '../../page-objects/main/main.po';
import { PatientMaintenancePage } from '../../page-objects/patient/patient-maintenance.po';
import { AllergyDetailPage } from '../../page-objects/allergy/allergy-detail/allergy-dialog.po';
import { PatientDetailPage } from '../../page-objects/patient/patient-detail/patient-dialog.po';
import { PatientAllergyDetailPage } from '../../page-objects/patient/patient-detail/patient-allergy-dialog.po';
import { NavigationService } from '../../services/navigation.service';
import { TestUtil } from '../../utilities/test-util';

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
        NavigationService.checkPageIsPresentAndDisplayed(allergyDetailPage);
        allergyDetailPage.getNameInput().setText(allergyData[0]);
        allergyDetailPage.getSignsInput().setText(allergyData[1]);
        allergyDetailPage.getSymptomsInput().setText(allergyData[2]);
        allergyDetailPage.getButtonSubmit().click();

        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getConfigTabs(), 'Config. tabs');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyAddButton(), 'Allergy Add button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyRefreshButton(), 'Allergy Refresh button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyOptionsButton(), 'Allergy Options button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyGrid(), 'Allergy grid');

        TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    function createPatientItem(patientData: string[]) {
        patientMaintenancePage.getButtonAdd().click();
        NavigationService.checkPageIsPresentAndDisplayed(patientDetailPage);
        patientDetailPage.getNameInput().setText(patientData[0]);
        patientDetailPage.getSurnameInput().setText(patientData[1]);
        patientDetailPage.getEmailInput().setText(patientData[2]);
        patientDetailPage.getAddressStreetInput().setText(patientData[3]);
        patientDetailPage.getAddressCityInput().setText(patientData[4]);
        patientDetailPage.getAddressZipInput().setText(patientData[5]);
        patientDetailPage.getAddressCoordinatesInput().setText(patientData[6])
        patientDetailPage.getButtonSubmit().click();
        NavigationService.checkPageIsPresentAndDisplayed(patientMaintenancePage);
        TestUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);
    }

    function assignAllegryToPatient(allergyNum: number) {
        patientDetailPage.getAddButton().click();
        NavigationService.checkPageIsPresentAndDisplayed(patientAllergyDetailPage);
        patientAllergyDetailPage.getAllergyCombobox().click();
        patientAllergyDetailPage.getAllergyList().get(0).click();

/*
        patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
        patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');
*/
        patientAllergyDetailPage.getAllergyNotes().setText('aslhslkjhdsalkjah');
        patientAllergyDetailPage.getSubmitButton().click();
        TestUtil.checkNumber(patientDetailPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    it('Access to the Patient Management Dialog', () => {
        NavigationService.checkPageTitleAndButtons(patientMaintenancePage,patientMaintenancePage.title, patientMaintenancePage.buttons);
        const titles = ['', 'Name', 'Surname', 'Email'];
        expect(patientMaintenancePage.getPatientsGrid().getGridHeader()).toEqual(titles);
    });

    it('Assign allergy to a patient', () => {
        const optionMenuDelete = 1;

        patientMaintenancePage.getButtonClose().click();
        NavigationService.navigateToAllergyMaintenancePage(mainPage);
        createAllergyItem(['Name1', 'Signs1', 'Symptoms1']);

        NavigationService.navigateToPatientMaintenancePage(mainPage);
        createPatientItem(['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
        patientMaintenancePage.getPatientsGrid().clickOnCell(0, 'name');
        NavigationService.checkPageIsPresentAndDisplayed(patientDetailPage);
        patientDetailPage.getTabs().selectTab(1);

        TestUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);

        assignAllegryToPatient(0);

        // allergy and patient deletion
        patientDetailPage.getAllergyGrid().clickOnRowMenu(0);
        patientDetailPage.getAllergyGrid().getMenu().selectOption(1);

        patientDetailPage.getButtonClose().click();

        patientMaintenancePage.getPatientsGrid().clickOnRowMenu(0);
        patientMaintenancePage.getPatientsGrid().getMenu().selectOption(optionMenuDelete);

        patientMaintenancePage.getButtonClose().click();
        TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);

        // Delete the created allergy
        mainPage.getAllergyGrid().clickOnRowMenu(0);
        mainPage.getAllergyGrid().getMenu().selectOption(1);
    });

});
