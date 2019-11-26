import { by, ElementArrayFinder, ElementFinder } from 'protractor';
import { BasePage } from './base-page';
import { ExpectsUtil } from '../utilities/expects-util';

export class TabService {
    public static readonly TAG_NAME_TABLIST = 'systelab-tabs';
    public static readonly TAG_NAME_TAB = 'systelab-tab';

    public static getTabs(element: ElementFinder): ElementArrayFinder {
        return element.element(by.tagName(this.TAG_NAME_TABLIST)).element(by.tagName('ul')).all(by.tagName('li')).all(by.tagName('span'));
    }

    public static getAllTabs(myElement: ElementFinder): ElementArrayFinder {
        return myElement.all(by.tagName(this.TAG_NAME_TABLIST)).all(by.tagName('li'));
    }

    public static getNumberOfTabs(myElement: ElementFinder) {
        return this.getAllTabs(myElement).count();
    }

    public static getTitleOfTab(myElement: ElementFinder, id: number) {
        return this.getTab(myElement, id).getText();
    }

    public static getTab(myElement: ElementFinder, id: number) {
        return this.getAllTabs(myElement).get(id);
    }

    public static getTabByTag(element: ElementFinder, item: string): ElementArrayFinder {
        return element.all(by.tagName(this.TAG_NAME_TAB)).all(by.tagName(item));
    }
}
