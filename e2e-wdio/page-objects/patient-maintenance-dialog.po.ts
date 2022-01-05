import { Button, Grid, Dialog } from "systelab-components-wdio-test";
import { PatientDialog } from "./patient-dialog.po";


export class PatientMaintenanceDialog extends Dialog {

    public getButtonOptions(): Button {
        return new Button(this.byId("PatientMaintenanceOptionsButton"));
    }

    public getButtonAdd(): Button {
        return new Button(this.byId("PatientMaintenanceAddButton"));
    }

    public getButtonRefresh(): Button {
        return new Button(this.byId("PatientMaintenanceRefreshButton"));
    }

    public getPatientsGrid(): Grid {
        return new Grid(this.byId("PatientTable"));
    }

    public getPatientDialog(): PatientDialog {
        return new PatientDialog(browser.$("patient-dialog"));
    }
}
