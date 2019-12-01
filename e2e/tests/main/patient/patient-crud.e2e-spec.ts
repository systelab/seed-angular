import { browser } from 'protractor';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { PatientMaintenanceDialog } from '../../../page-objects/main/patient/patient-maintenance';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormService } from 'systelab-components-test/lib/services';
import { Grid } from 'systelab-components-test';
import { PatientDialog } from '../../../page-objects/main/patient/patient-detail/patient-dialog';


declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    let patientMaintenanceDialog: PatientMaintenanceDialog;
    let patientDialog : PatientDialog;
    let patientGrid : Grid;

    beforeAll(() => {
        LoginNavigationService.login(loginPage);
        patientMaintenanceDialog=MainNavigationService.navigateToPatientMaintenancePage(new MainPage());
        patientDialog = patientMaintenanceDialog.getPatientDialog();
        patientGrid = patientMaintenanceDialog.getPatientsGrid();

        TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    it('Open Patient Creation Dialog', () => {
        const title = 'Create Patient';
        const buttons: FormButtonElement[] = [{
            name:   'Create',
            exist:  true,
            enable: true
        }];

        patientMaintenanceDialog.getButtonAdd().click();
        FormService.checkDialogTitleAndButtons(patientDialog, title, buttons);
        TestUtil.checkForm(patientDialog.getFormData(), 'Patient Creation is empty');
        patientDialog.getButtonClose().click();
        allure.createStep('Dialog is closed', () => {
            TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
        })();
    });

    it('Create Patients', () => {
        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            allure.createStep('Action: Create the patient ' + i, () => {

                patientMaintenanceDialog.getButtonAdd().click();
                TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

                let formData=patientDialog.getFormData(i);
                FormService.fillForm(formData, 'Patient Creation Form');
                TestUtil.checkForm(formData, 'Patient Creation is correct');

                patientDialog.getButtonSubmit().click();
                TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
                TestUtil.checkNumber(patientMaintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);

                patientGrid.getRow(i-1)
                    .then((cellValues) => {
                        TestUtil.checkText(Promise.resolve(cellValues[2]), 'Row Name', formData[0].value);
                        TestUtil.checkText(Promise.resolve(cellValues[1]), 'Row Surname', formData[1].value);
                        TestUtil.checkText(Promise.resolve(cellValues[3]), 'Row Email', formData[2].value);
                    });
            })();
        }
    });

    it('Contextual menu at the patients grid', async () => {
        const menuItems = ['Update', 'Delete'];

        for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
            await allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), async () => {
                await patientGrid.clickOnRowMenu(row);
                expect(await patientGrid.getMenu().getOptions()).toEqual(menuItems);
                await patientGrid.clickOnHeader();
            })();
        }
    });

    it('The option Update opens Patient Detail', () => {
        const optionMenuUpdate = 0;

        patientGrid.clickOnRowMenu(0);
        patientGrid.getMenu().selectOption(optionMenuUpdate);
        TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        patientDialog.getButtonClose().click();
        TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

   it('Click on a row and open Patient Detail', () => {
        const tabNames = ['General', 'Allergies'];

       patientGrid.clickOnCell(0,'name');
        TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        TestUtil.checkNumber(patientDialog.getTabs().getNumberOfTabs(), 'Tabs number', tabNames.length);
        tabNames.forEach((tabElement, index) => {
           TestUtil.checkText(patientDialog.getTabs().getTab(index).getText(), `Tab[${tabElement}]: ${tabElement}`, tabElement);
        });

       patientDialog.getButtonClose().click();
       TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

    it('Modify Patients', () => {
        patientGrid.clickOnCell(0,'name');
        TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        TestUtil.checkForm(patientDialog.getFormData(1), 'Patient Management is correct');
        FormService.removeValuesInForm(patientDialog.getFormData(), 'Patient Management');
        FormService.fillForm(patientDialog.getFormData(4), 'Patient Creation to update previous one');
        patientDialog.getButtonSubmit().click();

        TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
        TestUtil.checkNumber(patientGrid.getNumberOfRows(), 'Rows in table of Patients', 3);
    });

    it('Delete all elements recently added to the grid', () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            allure.createStep(`Action: Delete the Patient at the row #${k}`, () => {
                patientGrid.clickOnRowMenu(k);
                patientGrid.getMenu().selectOption(optionMenuDelete);
                TestUtil.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
