import { LoginPage, MainPage, PatientDialog, PatientMaintenanceDialog } from '@e2e-pages';
import { LoginActionService, MainActionService, MainNavigationService } from '@e2e-services';
import { CSSAnimationUtility, GeneralParameters} from '@e2e-utils';
import { Allergy, Patient, PatientAllergy } from "@e2e-model";

import { because } from "systelab-components-test/lib/utilities";
import { AssertionUtility, ReportUtility, TestIdentification } from "systelab-components-wdio-test";


describe('TC0003_PatientManagement_Allergy_e2e', () => {

    let loginPage;
    let mainPage;
    let patientMaintenanceDialog: PatientMaintenanceDialog;
    let patientDialog: PatientDialog;

    const patientData: Patient = {
        name: 'John',
        surname: 'Smith',
        email: 'jsmith@yahoo.com',
        address: {
            street: 'Main Street',
            city: 'Toronto',
            zip: '08001',
            coordinates: '11212, 1212'
        }
    };
    const allergyData: Allergy = {
        name: 'Insect Bites',
        signs: 'Skin rashes',
        symptoms: 'Cough, itching and fever'
    };
    const allergyForPatientData: PatientAllergy = {
        allergy: 'Insect Bites',
        assertedDate: '01/01/2019',
        lastOccurrence: '02/02/2019',
        comments: 'Comments should go here'
    };
    const invalidAllergyForPatientData: PatientAllergy = { ...allergyForPatientData, allergy: '' };

    beforeAll(async () => {
        loginPage = new LoginPage();
        mainPage = new MainPage();

        await LoginActionService.login(loginPage);
        await CSSAnimationUtility.disable();

        await MainActionService.createAllergy(mainPage, allergyData);
        await MainActionService.createPatient(mainPage, patientData);

        patientMaintenanceDialog = await MainNavigationService.navigateToPatientMaintenancePage(mainPage);
        patientDialog = await MainNavigationService.navigateToPatientDialog(patientMaintenanceDialog, 0);
        patientDialog.waitToBePresent();
    });

    afterAll(async () => {
        await patientDialog.close();
        await patientMaintenanceDialog.close();
        await MainActionService.deleteFirstPatient(mainPage);
        await MainActionService.deleteFirstAllergy(mainPage);
    });

    beforeEach(async () => {
        TestIdentification.setTmsLink("TC0003_PatientManagement_Allergy_e2e");
        TestIdentification.setDescription("Goal: The purpose of this test case is to verify the CRUD of a Patient Allergy");
        TestIdentification.setAppVersion(GeneralParameters.appVersion);
        TestIdentification.captureEnvironment();
    });

    async function expectPatientAllergiesGridRowCount(expectedRowCount: number): Promise<void> {
        await ReportUtility.addExpectedResult(`Patient allergies grid has ${expectedRowCount} rows`, async () => {
            AssertionUtility.expectEqual(await patientDialog.getAllergyGrid().getNumberOfRows(), expectedRowCount);
        });
    }

    async function expectPatientAllergiesRowValues(rowIndex: number, expectedPatientAllergy: PatientAllergy) {
        const rowValues: string[] = await patientDialog.getAllergyGrid().getValuesInRow(rowIndex);
        await ReportUtility.addExpectedResult(`Value of 'Name' for row ${rowIndex} of patient allergies grid is '${expectedPatientAllergy.allergy}'`, async () => {
            AssertionUtility.expectEqual(rowValues[1], expectedPatientAllergy.allergy);
        });

        await ReportUtility.addExpectedResult(`Value of 'Asserted Date' for row ${rowIndex} of patient allergies grid is '${expectedPatientAllergy.assertedDate}'`, async () => {
            AssertionUtility.expectEqual(rowValues[2], expectedPatientAllergy.assertedDate);
        });

        await ReportUtility.addExpectedResult(`Value of 'Comments' for row ${rowIndex} of patient allergies grid is '${expectedPatientAllergy.comments}'`, async () => {
            AssertionUtility.expectEqual(rowValues[3], expectedPatientAllergy.comments);
        });
    }

    it(`Assign an allergy to a patient: [name: ${allergyForPatientData.allergy}, ` +
       `asserted date: ${allergyForPatientData.assertedDate}, comments: ${allergyForPatientData.comments}]`, async () => {
        await patientDialog.getAddButton().click();
        await patientDialog.getPatientAllergyDialog().waitToBePresent();
        await patientDialog.getPatientAllergyDialog().set(allergyForPatientData);
        await patientDialog.getPatientAllergyDialog().getSubmitButton().click();

        await expectPatientAllergiesGridRowCount(1);
        await expectPatientAllergiesRowValues(0, allergyForPatientData);
    });

    it('Try to assign an allergy with invalid data to a patient (no allergy selected)', async () => {
        await patientDialog.getAddButton().click();
        await patientDialog.getPatientAllergyDialog().waitToBePresent();
        await patientDialog.getPatientAllergyDialog().set(invalidAllergyForPatientData);
        await patientDialog.getPatientAllergyDialog().getSubmitButton().click();

        await ReportUtility.addExpectedResult("Error message popup is shown", async () => {
            AssertionUtility.expectTrue(await patientDialog.getPatientAllergyDialog().getMessagePopup().isPresent());
        });

        await patientDialog.getPatientAllergyDialog().getMessagePopup().close();
        await patientDialog.getPatientAllergyDialog().close();
        await patientDialog.waitToBePresent();
    });

    it('Remove an allergy from a patient', async () => {
        await patientDialog.getAllergyGrid().clickOnRowMenu(0);
        await patientDialog.getAllergyGrid().getMenu().selectOptionByNumber(1);
        await patientDialog.getAllergyGrid().getMenu().waitToBeNotPresent();

        await expectPatientAllergiesGridRowCount(0);
    });
});
