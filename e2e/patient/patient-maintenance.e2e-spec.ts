import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { TestUtil } from '../common/utilities/test-util';
import { LoginNavigationService } from '../login/login.navigation.service';
import { MainNavigationService } from '../main/main.navigation.service';
import { GridService } from '../common/components/grid.service';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const patientMaintenancePage = new PatientMaintenancePage();

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage);
        MainNavigationService.navigateToPatientMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    it('Access to the Patient Management Dialog', () => {
        patientMaintenancePage.showNewPageAndCheckTitleAndButtons(patientMaintenancePage.title, patientMaintenancePage.buttons);
        const titles = ['', 'Name', 'Surname', 'Email']
        const grid = patientMaintenancePage.getPatientsGrid();
        GridService.checkGridHeaders(grid, titles);
    });

    // Disabled because looking for a non-existent element is time-consuming
    /*xit('Validate that no patients are created yet', () => {
     allure.createStep('Action: No patients  the patient', () => {
     TestUtil.checkCount(GridService.getGridInnerComponent(patientMaintenancePage.getPatientsGrid()), 'Number of Patients', 0);
     })();
     });*/
});
