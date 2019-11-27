import { by, element, ElementFinder } from 'protractor';
import { BasePage } from '../common/components/base-page';
import { Label } from '../common/components/label-test';
import { Button } from '../common/components/button-test';
import { Tabs } from '../common/components/tabs-test';
import { Grid } from '../common/components/grid-test';
import { Icon } from '../common/components/icon-test';

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
