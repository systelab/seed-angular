import { by, element } from 'protractor';
import { BasePage } from '../common/components/base-page';

export class MainPage extends BasePage {
    constructor() {
        super('systelab-app-frame');
    }

    public getFullUsernameField() {
        return this.getObjectById('username');
    }

    public getPatientButton() {
        return this.getMainWindow().element(by.tagName('systelab-app-header')).all(by.tagName('button')).get(0);
    }

    public getConfigIcon() {
        return this.getMainWindow().element(by.tagName('systelab-app-sidebar-small')).all(by.tagName('li')).get(3);
    }

    public getAllergyOptionsButton() {
        return this.getObjectById('AllergyMaintenanceOptionsButton');
    }

    public getAllergyAddButton() {
        return this.getObjectById('AllergyMaintenanceAddButton');
    }

    public getAllergyRefreshButton() {
        return this.getObjectById('AllergyMaintenanceRefreshButton');
    }

    public getAllergyGrid() {
        return this.getObjectById('AllergyTable');
    }
}
