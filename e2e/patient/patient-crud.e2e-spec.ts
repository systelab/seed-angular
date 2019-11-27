import { browser, protractor } from 'protractor';
import { LoginPage } from '../login/login.po';
import { MainPage } from '../main/main.po';
import { PatientMaintenancePage } from './patient-maintenance.po';
import { PatientDetailPage } from './patient-detail/patient-dialog.po';
import { TestUtil } from '../common/utilities/test-util';
import { ButtonState } from '../common/components/button.service';
import { FormService, FormData } from '../common/components/form.service';
import { NavigationService } from '../common/utilities/navigation.service';

declare const allure: any;

describe('TC0001_PatientManagement_e2e', () => {

    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const patientMaintenancePage = new PatientMaintenancePage();
    const patientDetailPage = new PatientDetailPage();

    beforeAll(() => {
        NavigationService.navigateToHomePage(loginPage);
        NavigationService.login(loginPage, false);
        NavigationService.navigateToPatientMaintenancePage(mainPage);
    });

    beforeEach(() => {
        TestUtil.init('TC0001_PatientManagement_e2e', 'Purpose: This TC is intended to verify the CRUD of a Patient',
            loginPage.appVersion, 'userName');
    });

    /* Base data to fill/check in form Create/Update patients*/
    function getFormData(i?: number): FormData[] {
        const basePatientValues = ['Surname', 'Name', 'email@werfen.com', 'Plaza de Europa, 21-23', 'Barcelona', '08908', '41.356439, 2.127791'];

        const empty = (i === undefined);
        const formData: FormData[] = [{
            field: patientDetailPage.getSurnameInput().getElement(),
            name:  'Surname',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[0]
        }, {
            field: patientDetailPage.getNameInput().getElement(),
            name:  'Name',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[1]
        }, {
            field: patientDetailPage.getEmailInput().getElement(),
            name:  'Email',
            value: empty ? '' : 'try_' + i + '_' + basePatientValues[2]
        }, {
            field: patientDetailPage.getAddressStreetInput().getElement(),
            name:  'Address -> Street',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[3]
        }, {
            field: patientDetailPage.getAddressCityInput().getElement(),
            name:  'Address -> City',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[4]
        }, {
            field: patientDetailPage.getAddressZipInput().getElement(),
            name:  'Address -> Zip',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[5]
        }, {
            field: patientDetailPage.getAddressCoordinatesInput().getElement(),
            name:  'Address -> Coordinates',
            value: empty ? '' : 'Try #' + i + ': ' + basePatientValues[6]
        }];
        return (formData);
    }

    it('Open Patient Creation Dialog', () => {
        const title = 'Create Patient';
        const buttons: ButtonState[] = [{
            name:   'Create',
            exist:  true,
            enable: true
        }];
        patientMaintenancePage.checkPresentAndDisplayed();
        patientMaintenancePage.getButtonAdd().click();
        patientDetailPage.showNewPageAndCheckTitleAndButtons(title, buttons);
        TestUtil.checkForm(getFormData(), 'Patient Creation is empty');
    });

    it('Close the dialog', () => {
        patientDetailPage.getButtonClose().click();
        allure.createStep('Dialog is closed', () => {
            patientMaintenancePage.checkPresentAndDisplayed();
        })();
    });

    it('Create Patients', () => {
        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            allure.createStep('Action: Create the patient ' + i, () => {

                patientMaintenancePage.getButtonAdd().click();
                patientDetailPage.checkPresentAndDisplayed();

                FormService.fillForm(getFormData(i), 'Patient Creation Form');
                TestUtil.checkForm(getFormData(i), 'Patient Creation is correct');

                patientDetailPage.getButtonSubmit().click();
                patientMaintenancePage.checkPresentAndDisplayed();
                TestUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', i);

                patientMaintenancePage.getPatientsGrid().getRow(i-1)
                    .then((cellValues) => {
                        TestUtil.checkText(Promise.resolve(cellValues[2]), 'Row Name', getFormData(i)[0].value);
                        TestUtil.checkText(Promise.resolve(cellValues[1]), 'Row Surname', getFormData(i)[1].value);
                        TestUtil.checkText(Promise.resolve(cellValues[3]), 'Row Email', getFormData(i)[2].value);
                    });
            })();
        }
    });

    it('Contextual menu at the patients grid', async () => {
        const menuItems = ['Update', 'Delete'];
        for (let row = 0; row < browser.params.repeatabilityNumberPasses; row++) {
            await allure.createStep('Action: Access to the contextual menu at row ' + row + ' in the grid with the buttons: ' + JSON.stringify(menuItems), async () => {
                 patientMaintenancePage.getPatientsGrid().clickOnRowMenu(row);
                 await patientMaintenancePage.getPatientsGrid().getMenu().getOptions().then( async (options)=>{
                     TestUtil.checkText(Promise.resolve(options[0]), 'First Option', menuItems[0]);
                     TestUtil.checkText(Promise.resolve(options[1]), 'Second Option', menuItems[1]);
                     await patientMaintenancePage.getPatientsGrid().clickOnHeader();
                });
            })();
        }
    });

    it('The option Update opens Patient Detail', () => {
        const optionMenuUpdate = 0;
        patientMaintenancePage.getPatientsGrid().clickOnRowMenu(0);
        patientMaintenancePage.getPatientsGrid().getMenu().selectOption(optionMenuUpdate);
        patientDetailPage.checkPresentAndDisplayed();

        patientDetailPage.getButtonClose().click();
        patientMaintenancePage.checkPresentAndDisplayed();
    });

   it('Click on a row and open Patient Detail', () => {
        const tabs = PatientDetailPage.tabs;
        patientMaintenancePage.getPatientsGrid().clickOnCell(0,'name');
        patientDetailPage.checkPresentAndDisplayed();


        TestUtil.checkNumber(patientDetailPage.getTabs().getNumberOfTabs(), 'Tabs number', tabs.length);
        tabs.forEach((tabElement, index) => {
          TestUtil.checkText(patientDetailPage.getTabs().getTab(index).getText(), `Tab[${tabElement}]: ${tabElement}`, tabElement);
        });

        patientDetailPage.getButtonClose().click();
        patientMaintenancePage.checkPresentAndDisplayed();
    });

    it('Modify Patients', () => {
        patientMaintenancePage.getPatientsGrid().clickOnCell(0,'name');
        patientDetailPage.checkPresentAndDisplayed();

        TestUtil.checkForm(getFormData(1), 'Patient Management is correct');

        FormService.removeValuesInForm(getFormData(), 'Patient Management');

        FormService.fillForm(getFormData(4), 'Patient Creation to update previous one');
        patientDetailPage.getButtonSubmit().click();

        patientMaintenancePage.checkPresentAndDisplayed();
        TestUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Rows in table of Patients', 3);
    });

    it('Delete all elements recently added to the grid', () => {
        const optionMenuDelete = 1;
        for (let k = (browser.params.repeatabilityNumberPasses - 1); k >= 0; k--) {
            allure.createStep(`Action: Delete the Patient at the row #${k}`, () => {
                patientMaintenancePage.getPatientsGrid().clickOnRowMenu(k);
                patientMaintenancePage.getPatientsGrid().getMenu().selectOption(optionMenuDelete);
                TestUtil.checkNumber(patientMaintenancePage.getPatientsGrid().getNumberOfRows(), 'Number of Patients', k);
            })();
        }
    });

});
