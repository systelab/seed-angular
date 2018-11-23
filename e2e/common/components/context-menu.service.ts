import { by, ElementFinder } from 'protractor';


export class ContextMenuService {
	public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-grid-context-menu';
	public static readonly TAG_NAME_CONTEXTUAL_MENU_ITEM = 'systelab-context-menu-item';

	public static getContextMenu(gridObject: ElementFinder, subIndex?: number): ElementFinder {
		if (subIndex === undefined) {
			return gridObject.element(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU));
		} else {
			return gridObject.element(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU))
				.all(by.tagName(this.TAG_NAME_CONTEXTUAL_MENU_ITEM))
				.get(subIndex);
		}
	}
}
