import { MainPage } from "@e2e-pages";
import { Allergy, Patient } from "@e2e-model";


export class MainActionService {

    public static async createPatient(mainPage: MainPage, patient: Patient) {
        await mainPage.getPatientButton().click();
        await mainPage.getPatientMaintenanceDialog().waitToBePresent();
        const nPatientsBefore = await mainPage.getPatientMaintenanceDialog().getPatientsGrid().getNumberOfRows();
        await mainPage.getPatientMaintenanceDialog().getButtonAdd().click();
        const patientDialog = await mainPage.getPatientMaintenanceDialog().getPatientDialog();
        await patientDialog.waitToBePresent();
        await patientDialog.set(patient);
        await patientDialog.getButtonSubmit().click();
        await mainPage.getPatientMaintenanceDialog().waitUntil(async () => (await mainPage.getPatientMaintenanceDialog().getPatientsGrid().getNumberOfRows()) == nPatientsBefore + 1);
        await mainPage.getPatientMaintenanceDialog().close();
    }

    public static async createAllergy(mainPage: MainPage, allergy: Allergy) {
        await mainPage.getConfigIcon().click();
        await mainPage.getAllergyAddButton().click();
        const allergyDialog = await mainPage.getAllergyDetailDialog();
        await allergyDialog.set(allergy);
        await allergyDialog.getButtonSubmit().click();
    }

    public static async deleteFirstAllergy(mainPage: MainPage) {
        await mainPage.getConfigIcon().click();
        await mainPage.getAllergyGrid().clickOnRowMenu(0);
        await mainPage.getAllergyGrid().getMenu().selectOptionByNumber(1);
    }

    public static async deleteFirstPatient(mainPage: MainPage) {
        await mainPage.getPatientButton().click();
        await mainPage.getPatientMaintenanceDialog().getPatientsGrid().clickOnRowMenu(0);
        await mainPage.getPatientMaintenanceDialog().getPatientsGrid().getMenu().selectOptionByText('Delete');
        await mainPage.getPatientMaintenanceDialog().close();
    }
}
