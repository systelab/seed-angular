import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { LoginNavigationService } from '../login/login.navigation.service';
import { MainNavigationService } from '../main/main.navigation.service';
import { TestUtil } from '../common/utilities/test-util';
import { ButtonState } from '../common/components/button.service';
import { GridService } from '../common/components/grid.service';
import { AllergyDetailPage } from './allergy-detail/allergy-dialog.po';
import { FormService, FormData} from '../common/components/form.service';
import { browser } from 'protractor';

declare const allure: any;

describe('TC0002_AllergyManagement_e2e', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const allergyDetailPage = new AllergyDetailPage();

    beforeAll(() => {
        LoginNavigationService.navigateToHomePage(loginPage);
        LoginNavigationService.login(loginPage);
        MainNavigationService.navigateToAllergyMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0002_AllergyManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of an Allergy',
            loginPage.appVersion, 'userName');
    });

    function getFormData(i?: number): FormData[]{
        const baseAllergyValues = ['Name', 'A sign', 'A symptom'];
        const empty = (i === undefined)
        const formData: FormData[] = [{
            field: allergyDetailPage.getNameInput(),
            name: 'Name',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[0]
        }, {
            field: allergyDetailPage.getSignsInput(),
            name: 'Signs',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[1]
        }, {
            field: allergyDetailPage.getSymptomsInput(),
            name: 'Symptoms',
            value: empty ? '' : 'Try #' + i + ': ' + baseAllergyValues[2]
        }];
        return (formData);
    }

    it('Open allergy creation dialog', () => {
        const title = 'Create Allergy';
        const buttons: ButtonState[] = [{
            name: 'Create',
            exist: true,
            enable: true
        }];

        mainPage.checkPresentAndDisplayed();
        mainPage.getAllergyAddButton()
            .click();
        allergyDetailPage.showNewPageAndCheckTitleAndButtons(title, buttons);
        TestUtil.checkForm(getFormData(), 'Allergy Creation is empty');
    });

    it('Close the dialog', () => {
        allergyDetailPage.getButtonClose()
            .click();
        allure.createStep('Dialog is closed', () => {
            mainPage.checkPresentAndDisplayed();
        })();
    });
    it('Create Allergies', () => {
        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            allure.createStep('Action: Create the allergy ' + i, () => {

                mainPage.getAllergyAddButton()
                    .click();
                allergyDetailPage.checkPresentAndDisplayed();

                FormService.fillForm(getFormData(i), 'Allergy Creation Form');
                TestUtil.checkForm(getFormData(i), 'Allergy Creation is correct');

                allergyDetailPage.getButtonSubmit()
                    .click();
                mainPage.checkPresentAndDisplayed();
                TestUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', i);

                GridService.getRow(mainPage.getAllergyGrid(), i - 1)
                    .then(function(cellValues) {
                        TestUtil.checkText(cellValues[1], 'Col Name', getFormData(i)[0].value);
                        TestUtil.checkText(cellValues[2], 'Col Signs', getFormData(i)[1].value);
                        TestUtil.checkText(cellValues[3], 'Col Symptoms', getFormData(i)[2].value);
                    });
            })();
        }
    });

    it('Contextual menu at the allergies grid', () => {
        const menuItems = ['Update', 'Delete'];
        for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
            allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), () => {
                GridService.checkGridPopupMenuContentAtRow(mainPage.getAllergyGrid(), row, menuItems);
            })();
        }
    });

    it('The option Update opens Allergy Detail', () => {
        const optionMenuUpdate = 0;
        GridService.clickGridPopupMenuContentAtRow(mainPage.getAllergyGrid(), 0, optionMenuUpdate);
        allergyDetailPage.checkPresentAndDisplayed();

        allergyDetailPage.getButtonClose()
            .click();
        mainPage.checkPresentAndDisplayed();
    });

    it('Click on a row and open Allergy Detail', () => {
        GridService.clickOnCell(mainPage.getAllergyGrid(), 0, GridService.GRID_COLUMN_NAME);
        allergyDetailPage.checkPresentAndDisplayed();
        allergyDetailPage.getButtonClose()
            .click();
        mainPage.checkPresentAndDisplayed();
    });

    it('Modify Allergies', () => {
        GridService.clickOnCell(mainPage.getAllergyGrid(), 0, GridService.GRID_COLUMN_NAME);
        allergyDetailPage.checkPresentAndDisplayed();

        TestUtil.checkForm(getFormData(1), 'Allergy Management is correct');

        FormService.removeValuesInForm(getFormData(), 'Allergy Management');

        FormService.fillForm(getFormData(4), 'Allergy Creation to update previous one');
        allergyDetailPage.getButtonSubmit()
            .click();

        mainPage.checkPresentAndDisplayed();
        TestUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Rows in table of Allergies', 3);
    });

    it('Delete all elements recently added to the grid', () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            allure.createStep(`Action: Delete the Allergy at the row #${k}`, () => {
                GridService.clickGridPopupMenuContentAtRow(mainPage.getAllergyGrid(), k, optionMenuDelete);
                TestUtil.checkCount(GridService.getGridInnerComponent(mainPage.getAllergyGrid()), 'Number of Allergies', k);
            })();
        }
    });
});
