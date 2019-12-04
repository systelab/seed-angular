import { LoginPage } from '../../../login/page-objects/login.po';
import { MainPage } from '../../page-objects/main.po';
import { PatientMaintenanceDialog } from '../../page-objects/patient/patient-maintenance';
import { PatientDialog } from '../../page-objects/patient/patient-detail/patient-dialog';
import { LoginNavigationService } from '../../../login/services/login-navigation.service';
import { MainNavigationService } from '../../services/main-navigation.service';
import { GeneralParameters } from '../../../general-parameters';
import { Grid } from 'systelab-components-test';
import { Check } from 'systelab-components-test/lib/utilities';
import { FormButtonElement, FormInputService } from 'systelab-components-test/lib/services';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    let patientMaintenanceDialog: PatientMaintenanceDialog;
    let patientDialog: PatientDialog;
    let patientGrid: Grid;

    beforeAll(async () => {
        // Login and navigation
        await LoginNavigationService.login(loginPage);
        await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
        patientMaintenanceDialog = mainPage.getPatientMaintenanceDialog();
        patientDialog = patientMaintenanceDialog.getPatientDialog();
        patientGrid = patientMaintenanceDialog.getPatientsGrid();
        await patientMaintenanceDialog.wait();
    });

    beforeEach(() => {
        Check.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    async function checkGridValues(row, formData) {
        await Check.checkText(Promise.resolve(row[2]), 'Row Name', formData[0].value);
        await Check.checkText(Promise.resolve(row[1]), 'Row Surname', formData[1].value);
        await Check.checkText(Promise.resolve(row[3]), 'Row Email', formData[2].value);
    }

    it('Access to the Patient Management Dialog', async () => {
        await Check.checkDialogTitleAndButtons(patientMaintenanceDialog, patientMaintenanceDialog.title, patientMaintenanceDialog.buttons);
    });

    it('Review Patient Management Table', async () => {
        const gridHeader = await Promise.resolve(patientMaintenanceDialog.getPatientsGrid().getGridHeader());
        await Check.checkArray(gridHeader, patientMaintenanceDialog.patientGridHeaderTitles, 'table headers');
    });

    it('Open Patient Creation Dialog', async () => {
        const title = 'Create Patient';
        const buttons: FormButtonElement[] = [{
            name:   'Create',
            exist:  true,
            enable: true
        }];
        await patientMaintenanceDialog.getButtonAdd().click();
        await Check.checkDialogTitleAndButtons(patientDialog, title, buttons);
        await Check.checkForm(patientDialog.getInputElements(), 'Patient Creation');
        await patientDialog.back();
        await allure.createStep('Action: Close the Allergy Creation dialog', async () => {
            await patientMaintenanceDialog.wait();
            await allure.createStep('The dialog is closed', () => {
            })();
        })();
    });

    it('Create Patients', async () => {

        for (let i = 1; i <= GeneralParameters.REPETEABILITY_NUMBER_PASSES; i++) {

            await allure.createStep('Action: Create the patient ' + i, async () => {

                await patientMaintenanceDialog.getButtonAdd().click();
                await patientDialog.wait();

                const formData = patientDialog.getInputElements(i);
                await FormInputService.fillValues(formData, 'Patient Creation Form');
                await Check.checkForm(formData, 'Patient Creation is correct');

                await patientDialog.getButtonSubmit().click();

                await patientMaintenanceDialog.wait();
                await Check.checkNumber(patientMaintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);

                const row = await patientGrid.getRow(i - 1);
                await checkGridValues(row, formData);
            })();
        }
    });

    it('Contextual menu at the patients grid', async () => {
        const menuItems = ['Update', 'Delete'];

        for (let row = 0; row < GeneralParameters.REPETEABILITY_NUMBER_PASSES; row++) {
            await allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), async () => {
                await patientGrid.clickOnRowMenu(row);
                expect(await patientGrid.getMenu().getOptions()).toEqual(menuItems);
                await patientGrid.clickOnHeader();
                await allure.createStep('The contextual menu is in the correct status', () => {
                })();
            })();
        }
    });

    it('The option Update opens Patient Detail', async () => {
        const optionMenuUpdate = 0;

        await patientGrid.clickOnRowMenu(0);
        await patientGrid.getMenu().selectOption(optionMenuUpdate);
        await patientDialog.wait();

        await patientDialog.getButtonClose().click();
        await patientMaintenanceDialog.wait();
        await allure.createStep('The option works as intended', () => {
        })();
    });

   it('Click on a row and open Patient Detail', async () => {
        const tabNames = ['General', 'Allergies'];

        await patientGrid.clickOnCell(0, 'name');
        await patientDialog.wait();

        await Check.checkNumber(patientDialog.getTabs().getNumberOfTabs(), 'Tabs number', tabNames.length);
        for (let i = 0 ; i < tabNames.length; i++) {
            await Check.checkText(patientDialog.getTabs().getTab(i).getText(), `Tab[${tabNames[i]}]: ${tabNames[i]}`, tabNames[i]);
        }

       await patientDialog.back();
        await patientMaintenanceDialog.wait();
       await allure.createStep('The option works as intended', () => {
       })();
    });

    it('Modify Patients', async () => {
        await patientGrid.clickOnCell(0, 'name');
        await patientDialog.wait();

        await FormInputService.removeValues(patientDialog.getInputElements(), 'Patient Management');
        const elementsToUpdate = patientDialog.getInputElements(4);
        await FormInputService.fillValues(elementsToUpdate, 'Patient Creation to update previous one');
        await patientDialog.getButtonSubmit().click();

        await patientMaintenanceDialog.wait();
        await Check.checkNumber(patientGrid.getNumberOfRows(), 'Rows in table of Patients', 3);

        const row = await patientGrid.getRow(2);
        await checkGridValues(row, elementsToUpdate);
    });

    it('Delete all elements recently added to the grid', async () => {
        const optionMenuDelete = 1;
        for (let k = (GeneralParameters.REPETEABILITY_NUMBER_PASSES - 1); k >= 0; k--) {
            await allure.createStep(`Action: Delete the Patient at the row #${k}`, async () => {
                await patientGrid.clickOnRowMenu(k);
                await patientGrid.getMenu().selectOption(optionMenuDelete);
                await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
