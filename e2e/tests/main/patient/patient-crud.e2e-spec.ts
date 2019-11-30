import { browser } from 'protractor';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { PatientDialog } from '../../../page-objects/main/patient/patient-detail/patient-dialog';
import { PatientMaintenanceDialog } from '../../../page-objects/main/patient/patient-maintenance';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormService } from 'systelab-components-test/lib/services';


declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    let maintenanceDialog: PatientMaintenanceDialog;

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage, false);
        maintenanceDialog=MainNavigationService.navigateToPatientMaintenancePage(new MainPage());
        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
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

        maintenanceDialog.getButtonAdd().click();
        FormService.checkDialogTitleAndButtons(maintenanceDialog.getPatientDialog(), title, buttons);
        TestUtil.checkForm(maintenanceDialog.getPatientDialog().getFormData(), 'Patient Creation is empty');
        maintenanceDialog.getPatientDialog().getButtonClose().click();
        allure.createStep('Dialog is closed', () => {
            TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
        })();
    });

    it('Create Patients', () => {
        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            allure.createStep('Action: Create the patient ' + i, () => {

                maintenanceDialog.getButtonAdd().click();
                let patientDetail=maintenanceDialog.getPatientDialog();
                TestUtil.checkWidgetPresentAndDisplayed(patientDetail, 'Patient Dialog');

                let formData=maintenanceDialog.getPatientDialog().getFormData(i);
                FormService.fillForm(formData, 'Patient Creation Form');
                TestUtil.checkForm(formData, 'Patient Creation is correct');

                patientDetail.getButtonSubmit().click();
                TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
                TestUtil.checkNumber(maintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);

                maintenanceDialog.getPatientsGrid().getRow(i-1)
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
                maintenanceDialog.getPatientsGrid().clickOnRowMenu(row);
                 await maintenanceDialog.getPatientsGrid().getMenu().getOptions().then( async (options)=>{
                     TestUtil.checkText(Promise.resolve(options[0]), 'First Option', menuItems[0]);
                     TestUtil.checkText(Promise.resolve(options[1]), 'Second Option', menuItems[1]);
                     await maintenanceDialog.getPatientsGrid().clickOnHeader();
                });
            })();
        }
    });

    it('The option Update opens Patient Detail', () => {
        const optionMenuUpdate = 0;
        maintenanceDialog.getPatientsGrid().clickOnRowMenu(0);
        maintenanceDialog.getPatientsGrid().getMenu().selectOption(optionMenuUpdate);
        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog.getPatientDialog(), 'Patient Dialog');

        maintenanceDialog.getPatientDialog().getButtonClose().click();
        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
    });

   it('Click on a row and open Patient Detail', () => {
        const tabs = PatientDialog.tabs;
        maintenanceDialog.getPatientsGrid().clickOnCell(0,'name');
        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog.getPatientDialog(), 'Patient Dialog');

        TestUtil.checkNumber(maintenanceDialog.getPatientDialog().getTabs().getNumberOfTabs(), 'Tabs number', tabs.length);
        tabs.forEach((tabElement, index) => {
           TestUtil.checkText(maintenanceDialog.getPatientDialog().getTabs().getTab(index).getText(), `Tab[${tabElement}]: ${tabElement}`, tabElement);
        });

       maintenanceDialog.getPatientDialog().getButtonClose().click();
       TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
    });

    it('Modify Patients', () => {
        maintenanceDialog.getPatientsGrid().clickOnCell(0,'name');
        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog.getPatientDialog(), 'Patient Dialog');

        TestUtil.checkForm(maintenanceDialog.getPatientDialog().getFormData(1), 'Patient Management is correct');

        FormService.removeValuesInForm(maintenanceDialog.getPatientDialog().getFormData(), 'Patient Management');

        FormService.fillForm(maintenanceDialog.getPatientDialog().getFormData(4), 'Patient Creation to update previous one');
        maintenanceDialog.getPatientDialog().getButtonSubmit().click();

        TestUtil.checkWidgetPresentAndDisplayed(maintenanceDialog,'Maintenance Dialog');
        TestUtil.checkNumber(maintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Rows in table of Patients', 3);
    });

    it('Delete all elements recently added to the grid', () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            allure.createStep(`Action: Delete the Patient at the row #${k}`, () => {
                maintenanceDialog.getPatientsGrid().clickOnRowMenu(k);
                maintenanceDialog.getPatientsGrid().getMenu().selectOption(optionMenuDelete);
                TestUtil.checkNumber(maintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
