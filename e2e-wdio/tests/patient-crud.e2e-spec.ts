import { AssertionUtility, Grid, ReportUtility, TestIdentification } from "systelab-components-wdio-test";

import { LoginPage, MainPage, PatientMaintenanceDialog } from '@e2e-pages';
import { LoginActionService, MainNavigationService } from '@e2e-services';
import { CSSAnimationUtility, GeneralParameters } from '@e2e-utils';
import { Patient } from "@e2e-model";


describe('TC0001_PatientManagement_e2e', () => {

    let loginPage: LoginPage;
    let mainPage: MainPage;
    let patientMaintenanceDialog: PatientMaintenanceDialog;

    const patientData: Patient = {
        name: 'John',
        surname: 'Smith',
        email: 'jsmith@yahoo.com',
        address: {
            street: 'Main Street',
            city: 'Toronto',
            zip: '12345',
            coordinates: '11212, 1212'
        }
    };
    const updatedPatientData: Patient = { ...patientData, name: "Peter" };
    const invalidPatientData: Patient = { ...patientData, name: "" };


    beforeAll(async () => {
        loginPage = new LoginPage();
        mainPage = new MainPage();

        await LoginActionService.login(loginPage);
        await CSSAnimationUtility.disable();

        patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
        await patientMaintenanceDialog.getPatientsGrid().waitToBePresent();
    });

    beforeEach(() => {
        TestIdentification.setTmsLink("TC0001_PatientManagement_e2e");
        TestIdentification.setDescription("Goal: The purpose of this test case is to verify the CRUD of a Patient");
        TestIdentification.setAppVersion(GeneralParameters.appVersion);
        TestIdentification.captureEnvironment();
    });

    async function expectPatientsGridRowCount(expectedRowCount: number): Promise<void> {
        await ReportUtility.addExpectedResult(`Patients grid has ${expectedRowCount} rows`, async () => {
            AssertionUtility.expectEqual(await patientMaintenanceDialog.getPatientsGrid().getNumberOfRows(), expectedRowCount);
        });
    }

    async function expectPatientsGridRowValues(rowIndex: number, expectedPatient: Patient) {
        const rowValues: string[] = await patientMaintenanceDialog.getPatientsGrid().getValuesInRow(rowIndex);
        await ReportUtility.addExpectedResult(`Value of 'Name' for row ${rowIndex} of patients grid is '${expectedPatient.name}'`, async () => {
            AssertionUtility.expectEqual(rowValues[1], expectedPatient.name);
        });

        await ReportUtility.addExpectedResult(`Value of 'Surname' for row ${rowIndex} of patients grid is '${expectedPatient.surname}'`, async () => {
            AssertionUtility.expectEqual(rowValues[2], expectedPatient.surname);
        });

        await ReportUtility.addExpectedResult(`Value of 'Email' for row ${rowIndex} of patients grid is '${expectedPatient.email}'`, async () => {
            AssertionUtility.expectEqual(rowValues[3], expectedPatient.email);
        });
    }

    it(`Create a patient with the following data: [name: ${patientData.name}, surname: ${patientData.surname}, email: ${patientData.email}]`, async () => {
        await patientMaintenanceDialog.getButtonAdd().click();
        await patientMaintenanceDialog.getPatientDialog().waitToBePresent();
        await patientMaintenanceDialog.getPatientDialog().set(patientData);
        await patientMaintenanceDialog.getPatientDialog().getButtonSubmit().click();
        await patientMaintenanceDialog.waitUntil(async () => (await patientMaintenanceDialog.getPatientsGrid().getNumberOfRows()) > 0);

        await expectPatientsGridRowCount(1);
        await expectPatientsGridRowValues(0, patientData);
    });

    it('Try to create another patient with invalid data (empty name)', async () => {
        await patientMaintenanceDialog.getButtonAdd().click();
        await patientMaintenanceDialog.getPatientDialog().set(invalidPatientData);
        await patientMaintenanceDialog.getPatientDialog().getButtonSubmit().click();

        await ReportUtility.addExpectedResult("Error message popup is shown", async () => {
            AssertionUtility.expectTrue(await patientMaintenanceDialog.getPatientDialog().getMessagePopup().isPresent());
        });

        await patientMaintenanceDialog.getPatientDialog().getMessagePopup().close();
        await patientMaintenanceDialog.getPatientDialog().close();
        await patientMaintenanceDialog.waitToBePresent();
    });

    it('Click on first row of patients grid to view details of just created patient', async () => {
        await patientMaintenanceDialog.getPatientsGrid().clickOnCell(0, 'name');
        await patientMaintenanceDialog.getPatientDialog().expectData(patientData);
        await patientMaintenanceDialog.getPatientDialog().close();
        await patientMaintenanceDialog.waitToBePresent();
    });

    it(`Edit name of existing patient and set it to '${updatedPatientData.name}'`, async () => {
        await patientMaintenanceDialog.getPatientsGrid().clickOnCell(0, 'name');
        await patientMaintenanceDialog.getPatientDialog().clear();
        await patientMaintenanceDialog.getPatientDialog().set(updatedPatientData);
        await patientMaintenanceDialog.getPatientDialog().getButtonSubmit().click();

        await expectPatientsGridRowCount(1);
        await expectPatientsGridRowValues(0, updatedPatientData);
    });

    it('Delete a patient', async () => {
        await patientMaintenanceDialog.getPatientsGrid().clickOnRowMenu(0);
        await patientMaintenanceDialog.getPatientsGrid().getMenu().selectOptionByNumber(1);
        await patientMaintenanceDialog.getPatientsGrid().getMenu().waitToBeNotPresent();
        await expectPatientsGridRowCount(0);
    });
});
