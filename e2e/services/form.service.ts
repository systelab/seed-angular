import { ElementFinder } from 'protractor';
import { BasePage } from '../page-objects/base-page';
import { TestUtil } from '../utilities/test-util';
declare const allure: any;

export interface FormData {
    field: ElementFinder;
    name: string;
    value: string;
}

export interface ButtonState {
    name: string;
    exist: boolean;
    enable: boolean;
}

export class FormService {

    public static removeValuesInForm(formData: FormData[], name: string) {
        allure.createStep('Action: Remove all values in form ' + name, () => {
            formData.forEach((formDataItem) => {
                this.clearField(formDataItem.field);
            });
        })();
    }

    public static fillForm(formData: FormData[], name: string) {
        allure.createStep('Action: Fill form ' + name, () => {
            formData.forEach((formDataItem) => {
                formDataItem.field.sendKeys(formDataItem.value);
                expect(formDataItem.field.getAttribute('value'))
                    .toEqual(formDataItem.value, 'Field "' + formDataItem.name + '" in form "' + name + '" should be ' + formDataItem.value);
            });
        })();
    }

    public static clearField(field: ElementFinder) {
        field.clear();
    }

    public static fillField(field: ElementFinder, name: string, value: string) {
        allure.createStep('Action: Fill ' + name + ' with value ' + value, () => {
            field.sendKeys(value);
        })();
    }

    public static checkButtons(page: BasePage, buttons: ButtonState[]) {
        allure.createStep('Action: Review the button name and status:' + JSON.stringify(buttons), () => {

            TestUtil.checkNumber(page.getNumberOfButtons(), `Number of buttons`, buttons.filter((b) => b.exist).length);

            buttons.forEach((buttonElem) => {
                TestUtil.checkIsPresent(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
            });

            buttons.filter((b) => b.enable)
              .forEach((buttonElem) => {
                  TestUtil.checkIsEnabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
              });
            buttons.filter((b) => !b.enable)
              .forEach((buttonElem) => {
                  TestUtil.checkIsDisabled(page.getButtonByName(buttonElem.name), `Button ${buttonElem.name}`);
              });
            allure.createStep('The buttons are in the correct status', () => {
            })();
        })();
    }
}

