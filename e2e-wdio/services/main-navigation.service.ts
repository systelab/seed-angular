import { MainPage, PatientMaintenanceDialog, PatientDialog } from "@e2e-pages";


export class MainNavigationService {

    public static async navigateToPatientMaintenancePage(mainPage: MainPage): Promise<PatientMaintenanceDialog> {
        await mainPage.waitToBePresent();
        await mainPage.getPatientButton().click();
        return mainPage.getPatientMaintenanceDialog();
    }

    public static async navigateToAllergyMaintenancePage(mainPage: MainPage): Promise<MainPage> {
        await mainPage.waitToBePresent();
        await mainPage.getConfigIcon().click();
        return mainPage;
    }

    public static async navigateToPatientDialog(patientMaintenanceDialog: PatientMaintenanceDialog, row: number): Promise<PatientDialog> {
        await patientMaintenanceDialog.getPatientsGrid().clickOnCell(row, 'name');
        const patientDialog = await patientMaintenanceDialog.getPatientDialog();
        await patientDialog.getTabs().selectTab(1);
        return patientDialog;
    }
}
