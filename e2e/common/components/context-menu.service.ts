import { by, ElementFinder, protractor } from 'protractor';


export class ContextMenuService {
    public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-grid-context-menu';
    public static readonly TAG_NAME_CONTEXTUAL_MENU_ITEM = 'systelab-context-menu-item';
    public static readonly CLASS_NAME_DROPDOWN = 'slab-dropdown';
    public static readonly CLASS_NAME_HEADER_DROPDOWN = 'dropdown-toggle slab-context-menu';

    public static getContextMenu(gridObject: ElementFinder, subIndex?: number): ElementFinder {
        if (subIndex === undefined) {
            return gridObject.element(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU));
        } else {
            return gridObject.element(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU))
                .all(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU_ITEM))
                .get(subIndex);
        }
    }

    public static getContextMenuHeader(gridObject: ElementFinder, subIndex?: number) {
        if (subIndex === undefined) {
            return gridObject.element(by.className(this.CLASS_NAME_DROPDOWN));
        } else {
            return gridObject.all(by.className(this.CLASS_NAME_DROPDOWN))
                .get(subIndex);
        }
    }

    public static checkContextualMenuByRow(mainWindow: ElementFinder) {
        const contextualMenuElementArray = mainWindow.all(by.className(this.CLASS_NAME_DROPDOWN));
        expect(contextualMenuElementArray.isPresent()).toBe(true);
        contextualMenuElementArray.isDisplayed()
            .then((inisDisplayed) => {
                if (!inisDisplayed) {
                    fail('The contextual menu could not be displayed');
                }
            });
    }

    public static getContextualMenuByRow(mainWindow: ElementFinder) {
        return mainWindow.all(by.className(this.CLASS_NAME_DROPDOWN));
    }

    public static getContextualMenuHeader(mainWindow: ElementFinder) {
        return mainWindow.all(by.className(this.CLASS_NAME_HEADER_DROPDOWN));
    }

    public static checkContextMenuIsClosed(mainWindow: ElementFinder) {
        let allFalse = true;
        ContextMenuService.getContextualMenuByRow(mainWindow)
            .each((elem) => {
                elem.isDisplayed()
                    .then((inIsDisplayed) => {
                        allFalse = allFalse && (inIsDisplayed === false);
                    });
            });
        protractor.promise.controlFlow()
            .execute(() => {
                expect(allFalse)
                    .toBe(true);
            });
    }
}
