import { browser } from 'protractor';
import { MainNavigationService } from '../../../services/main/main-navigation.service';
import { LoginPage } from '../../../page-objects/login/login.po';
import { MainPage } from '../../../page-objects/main/main.po';
import { PatientMaintenanceDialog } from '../../../page-objects/main/patient/patient-maintenance';
import { LoginNavigationService } from '../../../services/login/login-navigation.service';
import { TestUtil } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormInputService } from 'systelab-components-test/lib/services';
import { Grid } from 'systelab-components-test';
import { PatientDialog } from '../../../page-objects/main/patient/patient-detail/patient-dialog';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    let patientMaintenanceDialog: PatientMaintenanceDialog;
    let patientDialog : PatientDialog;
    let patientGrid : Grid;


    beforeAll(async () => {
        await LoginNavigationService.login(loginPage);
        await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
        patientMaintenanceDialog = mainPage.getPatientMaintenanceDialog();
        patientDialog = patientMaintenanceDialog.getPatientDialog();
        patientGrid = patientMaintenanceDialog.getPatientsGrid();

        await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    async function checkGridValues(row,formData) {
        await TestUtil.checkText(Promise.resolve(row[2]), 'Row Name', formData[0].value);
        await TestUtil.checkText(Promise.resolve(row[1]), 'Row Surname', formData[1].value);
        await TestUtil.checkText(Promise.resolve(row[3]), 'Row Email', formData[2].value);
    }

    it('Access to the Patient Management Dialog', async () => {
        await TestUtil.checkDialogTitleAndButtons(patientMaintenanceDialog, patientMaintenanceDialog.title, patientMaintenanceDialog.buttons);
        const titles = ['', 'Name', 'Surname', 'Email'];
        expect(await patientMaintenanceDialog.getPatientsGrid().getGridHeader()).toEqual(titles);
    });

    it('Open Patient Creation Dialog', async () => {
        const title = 'Create Patient';
        const buttons: FormButtonElement[] = [{
            name:   'Create',
            exist:  true,
            enable: true
        }];
        await patientMaintenanceDialog.getButtonAdd().click();
        await TestUtil.checkDialogTitleAndButtons(patientDialog, title, buttons);
        await TestUtil.checkForm(patientDialog.getInputElements(), 'Patient Creation is empty');
        await patientDialog.getButtonClose().click();
        await allure.createStep('Dialog is closed', async () => {
            await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
        })();
    });

    it('Create Patients', async () => {

        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            await allure.createStep('Action: Create the patient ' + i, async () => {

                await patientMaintenanceDialog.getButtonAdd().click();
                await TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

                let formData=patientDialog.getInputElements(i);
                await FormInputService.fillValues(formData, 'Patient Creation Form');
                await TestUtil.checkForm(formData, 'Patient Creation is correct');

                await patientDialog.getButtonSubmit().click();

                await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
                await TestUtil.checkNumber(patientMaintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);

                let row=await patientGrid.getRow(i-1);
                await checkGridValues(row,formData);
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

    it('The option Update opens Patient Detail', async () => {
        const optionMenuUpdate = 0;

        await patientGrid.clickOnRowMenu(0);
        await patientGrid.getMenu().selectOption(optionMenuUpdate);
        await TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        await patientDialog.getButtonClose().click();
        await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

   it('Click on a row and open Patient Detail', async () => {
        const tabNames = ['General', 'Allergies'];

        await patientGrid.clickOnCell(0,'name');
        await TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        await TestUtil.checkNumber(patientDialog.getTabs().getNumberOfTabs(), 'Tabs number', tabNames.length);
        for(let i=0;i<tabNames.length; i++) {
            await TestUtil.checkText(patientDialog.getTabs().getTab(i).getText(), `Tab[${tabNames[i]}]: ${tabNames[i]}`, tabNames[i]);
        }

       await patientDialog.getButtonClose().click();
       await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
    });

    it('Modify Patients', async () => {
        await patientGrid.clickOnCell(0,'name');
        await TestUtil.checkWidgetPresentAndDisplayed(patientDialog, 'Patient Dialog');

        await FormInputService.removeValues(patientDialog.getInputElements(), 'Patient Management');
        let elementsToUpdate=patientDialog.getInputElements(4);
        await FormInputService.fillValues(elementsToUpdate, 'Patient Creation to update previous one');
        await patientDialog.getButtonSubmit().click();

        await TestUtil.checkWidgetPresentAndDisplayed(patientMaintenanceDialog,'Maintenance Dialog');
        await TestUtil.checkNumber(patientGrid.getNumberOfRows(), 'Rows in table of Patients', 3);

        let row=await patientGrid.getRow(2);
        await checkGridValues(row,elementsToUpdate);
    });

    it('Delete all elements recently added to the grid', async () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            await allure.createStep(`Action: Delete the Patient at the row #${k}`, async () => {
                await patientGrid.clickOnRowMenu(k);
                await patientGrid.getMenu().selectOption(optionMenuDelete);
                await TestUtil.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
