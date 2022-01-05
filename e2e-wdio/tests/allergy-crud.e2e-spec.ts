import { AssertionUtility, Grid, ReportUtility, TestIdentification } from "systelab-components-wdio-test";

import { LoginPage, MainPage, AllergyDetailDialog } from "@e2e-pages";
import { LoginActionService, MainNavigationService } from "@e2e-services";
import { CSSAnimationUtility, GeneralParameters } from "@e2e-utils";


describe("TC0004_AllergyManagement_e2e", () => {

    let loginPage: LoginPage;
    let mainPage: MainPage;
    let allergyDialog: AllergyDetailDialog;
    let allergyGrid: Grid;

    const allergyData = { name: "Name", sign: "Sign", symptom: "Symptom" };
    const updatedAllergy = { ...allergyData, name: "Alternative name" };
    const invalidAllergy = { ...allergyData, name: "" };

    beforeAll(async () => {
        loginPage = new LoginPage();
        mainPage = new MainPage();
        allergyDialog = mainPage.getAllergyDetailDialog();
        allergyGrid = mainPage.getAllergyGrid();

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

    // async function checkValuesInRow(row, a: any) {
    //     await expect(Promise.resolve(row[1])).toEqual(a.name);
    //     await expect(Promise.resolve(row[2])).toEqual(a.sign);
    //     await /*because('All fields are evaluated as expected'). */expect(Promise.resolve(row[3])).toEqual(a.symptom);
    // }

    // async function checkAllergy(allergy: any) {
    //     await /*because('Number of allergies 1')
    //         .*/expect(allergyGrid.getNumberOfRows())
    //         .toBe(1);
    //     const values = await allergyGrid.getValuesInRow(0);
    //     await checkValuesInRow(values, allergy);
    // }

    // it(`Create an allergy: [name: ${allergyData.name}, sign: ${allergyData.sign}, symptom: ${allergyData.symptom}]`, async () => {
    //     await mainPage.getAllergyAddButton().click();
    //     await allergyDialog.waitToBePresent();
    //     await allergyDialog.set(allergyData);
    //     await allergyDialog.getButtonSubmit().click();
    //     await mainPage.waitToBePresent();
    //     await checkAllergy(allergyData);
    // });

    it("Try to create another allergy with invalid data (empty name)", async () => {
        await mainPage.getAllergyAddButton().click();
        await allergyDialog.set(invalidAllergy);
        await allergyDialog.getButtonSubmit().click();

        await ReportUtility.addExpectedResult("Error message popup is shown", async () => {
            AssertionUtility.expectTrue(await allergyDialog.getMessagePopup().isPresent());
        });

        await allergyDialog.getMessagePopup().close();
        await allergyDialog.close();
    });

    // it("View an allergy", async () => {
    //     await allergyGrid.clickOnCell(0, 'name');
    //     await because('All Allergy fields are evaluated as expected').expect(allergyDialog.get()).toEqual(allergyData);
    //     await allergyDialog.close();
    // });

    // it(`Modify an allergy: [name: ${updatedAllergy.name}, sign: ${updatedAllergy.sign}, symptom: ${updatedAllergy.symptom}]`, async () => {
    //     await allergyGrid.clickOnCell(0, 'name');
    //     await allergyDialog.clear();
    //     await allergyDialog.set(updatedAllergy);
    //     await allergyDialog.getButtonSubmit().click();
    //     await checkAllergy(updatedAllergy);
    // });

    // it("Delete an allergy", async () => {
    //     await allergyGrid.clickOnRowMenu(0);
    //     await allergyGrid.getMenu().selectOptionByNumber(1);
    //     await because('Number of allergies 0').expect(allergyGrid.getNumberOfRows()).toBe(0);
    // });
});
