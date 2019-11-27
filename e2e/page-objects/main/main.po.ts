import { by, element, ElementFinder } from 'protractor';
import { BasePage } from '../base-page';
import { Button, Grid, Label, Tabs, Icon } from '../../widgets';


export class MainPage extends BasePage {
    constructor() {
        super('systelab-app-frame');
    }

    public getFullUsernameField(): Label {
        return new Label(this.current.element(by.id('username')));
    }

    public getPatientButton():Button {
        return new Button(this.current.element(by.tagName('systelab-app-header')).all(by.tagName('button')).get(0));
    }

    public getConfigIcon(): Icon {
        return new Icon(this.current.element(by.tagName('systelab-app-sidebar-small')).all(by.tagName('li')).get(3));
    }

    public getAllergyOptionsButton():Button {
        return new Button(this.current.element(by.id('AllergyMaintenanceOptionsButton')));
    }

    public getAllergyAddButton():Button {
        return new Button(this.current.element(by.id('AllergyMaintenanceAddButton')));
    }

    public getAllergyRefreshButton():Button {
        return new Button(this.current.element(by.id('AllergyMaintenanceRefreshButton')));
    }

    public getAllergyGrid(): Grid {
        return new Grid(this.current.element(by.id('AllergyTable')));
    }

    public getConfigTabs():Tabs {
        return new Tabs(this.current.element(by.tagName('systelab-tabs')));
    }
}
