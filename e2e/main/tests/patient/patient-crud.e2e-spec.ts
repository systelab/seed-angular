import { LoginPage } from '../../../login/page-objects/login.po';
import { MainPage } from '../../page-objects/main.po';
import { PatientMaintenanceDialog } from '../../page-objects/patient/patient-maintenance';
import { PatientDialog } from '../../page-objects/patient/patient-detail/patient-dialog';
import { LoginNavigationService } from '../../../login/services/login-navigation.service';
import { MainNavigationService } from '../../services/main-navigation.service';
import { GeneralParameters } from '../../../general-parameters';
import { Grid } from 'systelab-components-test';
import { Check } from 'systelab-components-test/lib/utilities';
import { FormInputService } from 'systelab-components-test/lib/services';

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

    it('Access to the Patient Creation Dialog', async () => {
        await patientMaintenanceDialog.getButtonAdd().click();
        await Check.checkDialogTitleAndButtons(patientDialog, patientDialog.title, patientDialog.buttons);
        await Check.checkForm(patientDialog.getInputElements(), 'Patient Creation');
        await patientDialog.back();
        await allure.createStep('Action: Close the Patient Creation dialog', async () => {
            await patientMaintenanceDialog.wait();
            await allure.createStep('The dialog is closed', () => {
            })();
        })();
    });

    it('Create Patients', async () => {
        for (let i = 1; i <= GeneralParameters.REPETEABILITY_NUMBER_PASSES; i++) {
            await allure.createStep('Action: Create the patient ' + i, async () => {
                // Open the dialog
                await patientMaintenanceDialog.getButtonAdd().click();
                await patientDialog.wait();
                // Enter the Patient information
                const formData = patientDialog.getInputElements(i);
                await FormInputService.fillValues(formData, 'Patient Creation Form');
                await Check.checkForm(formData, 'Patient Creation');
                // Click on Submit
                await patientDialog.getButtonSubmit().click();
                await patientMaintenanceDialog.wait();
                // Check the number of patients
                await Check.checkNumber(patientMaintenanceDialog.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);
                // Check the Patient is properly created
                const row = await patientGrid.getRow(i - 1);
                await checkGridValues(row, formData);
            })();
        }
    });

    it('Contextual menu at the patients grid', async () => {
        for (let row = 0; row < GeneralParameters.REPETEABILITY_NUMBER_PASSES; row++) {
            await allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(patientMaintenanceDialog.patientGridMenuItems), async () => {
                await patientGrid.clickOnRowMenu(row);
                expect(await patientGrid.getMenu().getOptions()).toEqual(patientMaintenanceDialog.patientGridMenuItems);
                await patientGrid.clickOnHeader();
                await allure.createStep('The contextual menu is in the correct status', () => {
                })();
            })();
        }
    });

    it('The option Update opens Patient Detail', async () => {
        const optionMenuUpdate = 0;

        await patientGrid.clickOnRowMenu(0);
        await patientGrid.getMenu().selectOptionByNumber(optionMenuUpdate);
        await patientDialog.wait();

        await patientDialog.back();
        await patientMaintenanceDialog.wait();
        await allure.createStep('The option works as intended', () => {
        })();
    });

   it('Click on a row and open Patient Detail', async () => {
       await patientGrid.clickOnCell(0, 'name');
       await patientDialog.wait();

       await Check.checkTabs(patientDialog.getTabs(), patientDialog.patientTabTitles);

       await patientDialog.back();
       await patientMaintenanceDialog.wait();
    });

    it('Modify Patients', async () => {
        await patientGrid.clickOnCell(0, 'name');
        await patientDialog.wait();

        await FormInputService.removeValues(patientDialog.getInputElements(), '');
        const elementsToUpdate = patientDialog.getInputElements(4);
        await FormInputService.fillValues(elementsToUpdate, 'Patient Creation to modify the patient');
        await patientDialog.getButtonSubmit().click();

        await patientMaintenanceDialog.wait();
        await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', 3);

        const row = await patientGrid.getRow(2);
        await checkGridValues(row, elementsToUpdate);
    });

    it('Delete all elements recently added to the grid', async () => {
        const optionMenuDelete = 1;
        for (let k = (GeneralParameters.REPETEABILITY_NUMBER_PASSES - 1); k >= 0; k--) {
            await allure.createStep(`Action: Delete the Patient at the row #${k}`, async () => {
                await patientGrid.clickOnRowMenu(k);
                await patientGrid.getMenu().selectOptionByNumber(optionMenuDelete);
                await Check.checkNumber(patientGrid.getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
