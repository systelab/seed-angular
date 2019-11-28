import { browser, protractor } from 'protractor';
import { NavigationService } from '../services/navigation.service';
import { LoginPage } from '../page-objects/login/login.po';
import { MainPage } from '../page-objects/main/main.po';
import { PatientMaintenancePage } from '../page-objects/patient/patient-maintenance.po';
import { PatientDetailPage } from '../page-objects/patient/patient-detail/patient-dialog.po';
import { TestUtil } from '../utilities/test-util';
import { FormService, FormData, ButtonState } from '../services/form.service';


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
        NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
        patientMaintenancePage.getButtonAdd().click();
        NavigationService.checkPageTitleAndButtons(patientDetailPage, title, buttons);
        TestUtil.checkForm(getFormData(), 'Patient Creation is empty');
    });

    it('Close the dialog', () => {
        patientDetailPage.getButtonClose().click();
        allure.createStep('Dialog is closed', () => {
            NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
        })();
    });

    it('Create Patients', () => {
        for (let i = 1; i <= browser.params.repeatabilityNumberPasses; i++) {

            allure.createStep('Action: Create the patient ' + i, () => {

                patientMaintenancePage.getButtonAdd().click();
                NavigationService.checkPresentAndDisplayed(patientDetailPage);

                FormService.fillForm(getFormData(i), 'Patient Creation Form');
                TestUtil.checkForm(getFormData(i), 'Patient Creation is correct');

                patientDetailPage.getButtonSubmit().click();
                NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
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
        NavigationService.checkPresentAndDisplayed(patientDetailPage);

        patientDetailPage.getButtonClose().click();
        NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
    });

   it('Click on a row and open Patient Detail', () => {
        const tabs = PatientDetailPage.tabs;
        patientMaintenancePage.getPatientsGrid().clickOnCell(0,'name');
       NavigationService.checkPresentAndDisplayed(patientDetailPage);


        TestUtil.checkNumber(patientDetailPage.getTabs().getNumberOfTabs(), 'Tabs number', tabs.length);
        tabs.forEach((tabElement, index) => {
          TestUtil.checkText(patientDetailPage.getTabs().getTab(index).getText(), `Tab[${tabElement}]: ${tabElement}`, tabElement);
        });

        patientDetailPage.getButtonClose().click();
       NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
    });

    it('Modify Patients', () => {
        patientMaintenancePage.getPatientsGrid().clickOnCell(0,'name');
        NavigationService.checkPresentAndDisplayed(patientDetailPage);

        TestUtil.checkForm(getFormData(1), 'Patient Management is correct');

        FormService.removeValuesInForm(getFormData(), 'Patient Management');

        FormService.fillForm(getFormData(4), 'Patient Creation to update previous one');
        patientDetailPage.getButtonSubmit().click();

        NavigationService.checkPresentAndDisplayed(patientMaintenancePage);
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
