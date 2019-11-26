import { browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC, protractor, promise } from 'protractor';
import { ButtonService, ButtonState } from './button.service';
import { TestUtil } from '../utilities/test-util';

export interface IDefault {
    element: ElementFinder;
    expectedValue: string;
    messageOnKO: string;
    checkOnPropertyValue: boolean;
}
export class BasePage {

    public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';
    public static readonly TIME_OUT_MS_FOR_DIALOG_WINDOW = 30000;

    constructor(protected tagName: string, protected tagNameIndex: number = 0) {
    }

    public getDefaultConf(): IDefault[] {
        return [] as IDefault[];
    }

    public defaultValuesOk(): promise.Promise<boolean> {
        let toReturn = true;
        let message = '';

        return new promise.Promise((resolve, reject) => {
            this.getDefaultConf().forEach( item => {
                if (item.checkOnPropertyValue) {
                    item.element.getAttribute('value').then( inText => {
                        if (inText !== item.expectedValue) {
                            toReturn = false;
                            message += item.messageOnKO;
                        }
                    });
                } else {
                    item.element.getText().then( inText => {
                        if (inText !== item.expectedValue) {
                            toReturn = false;
                            message += item.messageOnKO;
                        }
                    });
                }
            });

            protractor.promise.controlFlow().execute( () => {
                if (toReturn !== true) {
                    reject(message);
                } else {
                    resolve(true);
                }
            });
        });
    }
    public getAllButtons(): ElementArrayFinder {
        return new ElementArrayFinder(browser);
    }

    public getMainWindow() {
        return element.all(by.tagName(this.tagName))
            .get(this.tagNameIndex);
    }

    public getTitle() {
        return this.getMainWindow()
            .element(by.tagName('systelab-dialog-header'))
            .element(by.className('slab-dialog-header'));
    }

    public getButtonClose() {
        return this.getMainWindow()
            .element(by.className('slab-dialog-close'));
    }

    public getObjectById(id: string) {
        return this.getMainWindow()
            .element(by.id(id));
    }

    public getObjectByDataTestId(customId: string) {
        return element.all(by.css('[data-test-id="' + customId + '"]'));
    }

    public getButtonByName(name: string) {
        return this.getMainWindow()
            .element(by.buttonText(name));
    }

    public checkPresentAndDisplayed() {
        expect(this.getMainWindow()
            .isPresent())
            .toEqual(true, 'Window should be present on the DOM');
        expect(this.getMainWindow()
            .isDisplayed())
            .toEqual(true, 'Window should be displayed');
    }

    public showNewPageAndCheckTitleAndButtons(expectedWindowTitle: string, buttons?: ButtonState[]) {

        browser.wait(EC.presenceOf(this.getMainWindow()), BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW, 'Dialog Window is taking too long to appear in the DOM (timeout: ' + BasePage.TIME_OUT_MS_FOR_DIALOG_WINDOW + ' ms).');
        this.checkPresentAndDisplayed();

        TestUtil.checkText(this.getTitle(), 'Window title', expectedWindowTitle);
        if (buttons) {
            ButtonService.checkButtons(this, buttons);
        }
    }

    public existButton(buttonText: string): promise.Promise<boolean>  {
        buttonText = buttonText.toLowerCase().trim();
        return new promise.Promise((resolve, reject) => {
            let exist = false;

            this.getAllButtons().then(  arrButtons => {
                for (let i = 0; i < arrButtons.length; i++) {
                    arrButtons[i].getText().then( inText => {
                        exist = exist || (inText.toLowerCase().trim() === buttonText);
                    });
                }
                protractor.promise.controlFlow().execute( () => {
                    resolve(exist);
                });
            }, (err) => {
                reject(err);
            });
        });
    }
}
