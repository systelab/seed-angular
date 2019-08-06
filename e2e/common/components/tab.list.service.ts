import { by, ElementArrayFinder, ElementFinder } from 'protractor';

export class TabListService {
    public static readonly TAG_NAME_TABLIST = 'systelab-tabs';
    public static readonly TAG_NAME_TAB = 'systelab-tab';

    public static getTabs(element: ElementFinder): ElementArrayFinder {
        return element.element(by.tagName(this.TAG_NAME_TABLIST)).element(by.tagName('ul')).all(by.tagName('li')).all(by.tagName('span'));
    }

    public static getTab(element: ElementFinder, item: string): ElementFinder {
        return element.element(by.tagName(this.TAG_NAME_TAB)).element(by.tagName(item));
    }
}
