import { by, ElementArrayFinder, ElementFinder } from 'protractor';
import { GridService } from './grid.service';

export class ContextMenuService {
	public static readonly TAG_NAME_CONTEXTUAL_MENU = 'systelab-context-menu-item';

	public static getContextMenu(gridObject: ElementFinder, col?: string, row?: number, subIndex?: number) {
		if (subIndex === undefined) {
			return GridService.getGridInnerComponent(gridObject, col, row)
				.all(by.tagName(GridService.TAG_NAME_CONTEXTUAL_MENU));
		} else {
			return GridService.getGridInnerComponent(gridObject, col, row)
				.all(by.tagName(GridService.TAG_NAME_CONTEXTUAL_MENU))
				.get(subIndex);
		}
	}
}
