import { by, ElementFinder } from 'protractor';

export class Widget {
	constructor(protected elem: ElementFinder) {
	}

	public getElement(): ElementFinder {
		return this.elem;
	}
}
