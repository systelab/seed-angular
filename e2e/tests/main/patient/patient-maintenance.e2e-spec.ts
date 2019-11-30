import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { NavigationService } from '../../../services/navigation.service';
import { TestUtil } from '../../../utilities/test-util';
import { PatientMaintenanceDialog } from '../../../page-objects/main/patient/patient-maintenance';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    let maintenanceDialog: PatientMaintenanceDialog;

    beforeAll(() => {
        NavigationService.navigateToHomePage(loginPage);
        NavigationService.login(loginPage);
        maintenanceDialog= NavigationService.navigateToPatientMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    function createAllergyItem(allergyData: string[]) {
        mainPage.getAllergyAddButton().click();
        TestUtil.checkIsPresentAndDisplayed(mainPage.getAllergyDetailDialog());
        mainPage.getAllergyDetailDialog().getNameInput().setText(allergyData[0]);
        mainPage.getAllergyDetailDialog().getSignsInput().setText(allergyData[1]);
        mainPage.getAllergyDetailDialog().getSymptomsInput().setText(allergyData[2]);
        mainPage.getAllergyDetailDialog().getButtonSubmit().click();

        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getConfigTabs(), 'Config. tabs');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyAddButton(), 'Allergy Add button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyRefreshButton(), 'Allergy Refresh button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyOptionsButton(), 'Allergy Options button');
        TestUtil.checkWidgetPresentAndDisplayed(mainPage.getAllergyGrid(), 'Allergy grid');

        TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    function createPatientItem(patientData: string[]) {
        maintenanceDialog.getButtonAdd().click();
        let patientDialog=maintenanceDialog.getPatientDialog();
        TestUtil.checkIsPresentAndDisplayed(patientDialog);
        patientDialog.getNameInput().setText(patientData[0]);
        patientDialog.getSurnameInput().setText(patientData[1]);
        patientDialog.getEmailInput().setText(patientData[2]);
        patientDialog.getAddressStreetInput().setText(patientData[3]);
        patientDialog.getAddressCityInput().setText(patientData[4]);
        patientDialog.getAddressZipInput().setText(patientData[5]);
        patientDialog.getAddressCoordinatesInput().setText(patientData[6])
        patientDialog.getButtonSubmit().click();
        TestUtil.checkIsPresentAndDisplayed(maintenanceDialog);
        TestUtil.checkNumber(maintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);
    }

    function assignAllegryToPatient(allergyNum: number) {
        maintenanceDialog.getPatientDialog().getAddButton().click();
        TestUtil.checkIsPresentAndDisplayed(maintenanceDialog.getPatientDialog().getPatientAllergyDialog());
        maintenanceDialog.getPatientDialog().getPatientAllergyDialog().getAllergyCombobox().click();
        maintenanceDialog.getPatientDialog().getPatientAllergyDialog().getAllergyList().get(0).click();

/*
        patientAllergyDetailPage.getAssertedDate().setValue('01/01/2019');
        patientAllergyDetailPage.getLastOccurrenceDate().setValue('02/02/2019');
*/
        maintenanceDialog.getPatientDialog().getPatientAllergyDialog().getAllergyNotes().setText('aslhslkjhdsalkjah');
        maintenanceDialog.getPatientDialog().getPatientAllergyDialog().getSubmitButton().click();
        TestUtil.checkNumber(maintenanceDialog.getPatientDialog().getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);
    }

    it('Access to the Patient Management Dialog', () => {
        NavigationService.checkPageTitleAndButtons(maintenanceDialog,maintenanceDialog.title, maintenanceDialog.buttons);
        const titles = ['', 'Name', 'Surname', 'Email'];
        expect(maintenanceDialog.getPatientsGrid().getGridHeader()).toEqual(titles);
    });

    it('Assign allergy to a patient', () => {
        const optionMenuDelete = 1;

        maintenanceDialog.getButtonClose().click();
        NavigationService.navigateToAllergyMaintenancePage(mainPage);
        createAllergyItem(['Name1', 'Signs1', 'Symptoms1']);

        NavigationService.navigateToPatientMaintenancePage(mainPage);
        createPatientItem(['Patient1', 'Surname1', 'email@kk.com', 'Sample St', 'Khartum', '112234', '12.123456 32.15246']);
        maintenanceDialog.getPatientsGrid().clickOnCell(0, 'name');
        TestUtil.checkIsPresentAndDisplayed(maintenanceDialog.getPatientDialog());
        maintenanceDialog.getPatientDialog().getTabs().selectTab(1);

        TestUtil.checkNumber(maintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', 1);

        assignAllegryToPatient(0);

        // allergy and patient deletion
        maintenanceDialog.getPatientDialog().getAllergyGrid().clickOnRowMenu(0);
        maintenanceDialog.getPatientDialog().getAllergyGrid().getMenu().selectOption(1);

        maintenanceDialog.getPatientDialog().getButtonClose().click();

        maintenanceDialog.getPatientsGrid().clickOnRowMenu(0);
        maintenanceDialog.getPatientsGrid().getMenu().selectOption(optionMenuDelete);

        maintenanceDialog.getButtonClose().click();
        TestUtil.checkNumber(mainPage.getAllergyGrid().getNumberOfRows(), 'Number of Allergies', 1);

        // Delete the created allergy
        mainPage.getAllergyGrid().clickOnRowMenu(0);
        mainPage.getAllergyGrid().getMenu().selectOption(1);
    });

});
