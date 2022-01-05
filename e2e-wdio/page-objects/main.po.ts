import { BasePage, Button, Grid, Icon, Label, Tabs } from "systelab-components-wdio-test";

import { AllergyDetailDialog } from "./allergy-dialog.po";
// import {PatientMaintenanceDialog} from "./patient/patient-maintenance";


export class MainPage extends BasePage {

    constructor() {
        super("systelab-app-frame");
    }

    public getFullUsernameField(): Label {
        return new Label(this.byId("username"));
    }

    public getPatientButton(): Button {
        return new Button(this.byTagName("systelab-app-header").$$("button")[0]);
    }

    public getConfigIcon(): Icon {
        return new Icon(this.byTagName("systelab-app-sidebar-small").$$("li")[3]);
    }

    public getAllergyOptionsButton(): Button {
        return new Button(this.byId("AllergyMaintenanceOptionsButton"));
    }

    public getAllergyAddButton(): Button {
        return new Button(this.byId("AllergyMaintenanceAddButton"));
    }

    public getAllergyRefreshButton(): Button {
        return new Button(this.byId("AllergyMaintenanceRefreshButton"));
    }

    public getAllergyGrid(): Grid {
        return new Grid(this.byId("AllergyTable"));
    }

    public getConfigTabs(): Tabs {
        return new Tabs(this.byTagName("systelab-tabs"));
    }

    public getAllergyDetailDialog(): AllergyDetailDialog {
        return new AllergyDetailDialog(this.byTagName("allergy-dialog"));
    }

    // 	public getPatientMaintenanceDialog(): PatientMaintenanceDialog {
    // 		return new PatientMaintenanceDialog(element(by.tagName("patient-maintenance-dialog")));
    // 	}
}
