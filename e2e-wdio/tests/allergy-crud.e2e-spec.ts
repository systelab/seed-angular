import { AssertionUtility, Grid, ReportUtility, TestIdentification } from "systelab-components-wdio-test";

import { LoginPage, MainPage, AllergyDetailDialog } from "@e2e-pages";
import { LoginActionService, MainNavigationService } from "@e2e-services";
import { CSSAnimationUtility, GeneralParameters } from "@e2e-utils";
import { Allergy } from "@e2e-model";


describe("TC0004_AllergyManagement_e2e", () => {

    let loginPage: LoginPage;
    let mainPage: MainPage;

    const allergyData: Allergy = { name: "Insect bites", signs: "Skin rashes", symptoms: "Cough, itching and fever" };
    const updatedAllergyData: Allergy = { ...allergyData, name: "Mosquito bites" };
    const invalidAllergyData: Allergy = { ...allergyData, name: "" };

    beforeAll(async () => {
        loginPage = new LoginPage();
        mainPage = new MainPage();

        await CSSAnimationUtility.disable();
        await LoginActionService.login(loginPage);
        await MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestIdentification.setTmsLink("TC0004_AllergyManagement_e2e");
        TestIdentification.setDescription("Goal: The purpose of this test case is to verify the CRUD of an Allergy");
        TestIdentification.setAppVersion(GeneralParameters.appVersion);
        TestIdentification.captureEnvironment();

    });

    async function expectAllergiesGridRowCount(expectedRowCount: number): Promise<void> {
        await ReportUtility.addExpectedResult(`Allergies grid has ${expectedRowCount} rows`, async () => {
            AssertionUtility.expectEqual(await mainPage.getAllergyGrid().getNumberOfRows(), expectedRowCount);
        });
    }

    async function expectAllergiesGridRowValues(rowIndex: number, expectedAllergy: Allergy) {
        const rowValues: string[] = await mainPage.getAllergyGrid().getValuesInRow(rowIndex);
        await ReportUtility.addExpectedResult(`Value of 'Name' for row ${rowIndex} of allergies grid is '${expectedAllergy.name}'`, async () => {
            AssertionUtility.expectEqual(rowValues[1], expectedAllergy.name);
        });

        await ReportUtility.addExpectedResult(`Value of 'Signs' for row ${rowIndex} of allergies grid is '${expectedAllergy.signs}'`, async () => {
            AssertionUtility.expectEqual(rowValues[2], expectedAllergy.signs);
        });

        await ReportUtility.addExpectedResult(`Value of 'Symptoms' for row ${rowIndex} of allergies grid is '${expectedAllergy.symptoms}'`, async () => {
            AssertionUtility.expectEqual(rowValues[3], expectedAllergy.symptoms);
        });
    }

    it(`Create an allergy with the following data: [name: '${allergyData.name}', sign: '${allergyData.signs}', symptom: '${allergyData.symptoms}']`, async () => {
        await mainPage.getAllergyAddButton().click();
        await mainPage.getAllergyDetailDialog().waitToBePresent();
        await mainPage.getAllergyDetailDialog().set(allergyData);
        await mainPage.getAllergyDetailDialog().getButtonSubmit().click();
        await mainPage.waitToBePresent();

        await expectAllergiesGridRowCount(1);
        await expectAllergiesGridRowValues(0, allergyData);
    });

    it("Try to create another allergy with invalid data (empty name)", async () => {
        await mainPage.getAllergyAddButton().click();
        await mainPage.getAllergyDetailDialog().set(invalidAllergyData);
        await mainPage.getAllergyDetailDialog().getButtonSubmit().click();

        await ReportUtility.addExpectedResult("Error message popup is shown", async () => {
            AssertionUtility.expectTrue(await mainPage.getAllergyDetailDialog().getMessagePopup().isPresent());
        });

        await mainPage.getAllergyDetailDialog().getMessagePopup().close();
        await mainPage.getAllergyDetailDialog().close();
        await mainPage.waitToBePresent();
    });

    it("Click on first row of allergies grid to view details of just created allergy", async () => {
        await mainPage.getAllergyGrid().clickOnCell(0, "name");
        await mainPage.getAllergyDetailDialog().expectData(allergyData);
        await mainPage.getAllergyDetailDialog().close();
        await mainPage.waitToBePresent();
    });

    it(`Edit name of existing allergy and set it to '${updatedAllergyData.name}'`, async () => {
        await mainPage.getAllergyGrid().clickOnCell(0, "name");
        await mainPage.getAllergyDetailDialog().clear();
        await mainPage.getAllergyDetailDialog().set(updatedAllergyData);
        await mainPage.getAllergyDetailDialog().getButtonSubmit().click();

        await expectAllergiesGridRowCount(1);
        await expectAllergiesGridRowValues(0, updatedAllergyData);
    });

    it("Delete an allergy", async () => {
        await mainPage.getAllergyGrid().clickOnRowMenu(0);
        await mainPage.getAllergyGrid().getMenu().selectOptionByNumber(1);
        await expectAllergiesGridRowCount(0);
    });
});
