import { by, element, ElementFinder } from 'protractor';

export class BasePage {

    protected current:ElementFinder;

    constructor(private selector: string, private index: number = 0) {
        this.current=element.all(by.tagName(this.selector)).get(this.index);
    }

    public getElementFinder() {
        return this.current;
    }

    public async isPresent(): Promise<boolean> {
        return await this.current.isPresent();
    }

    public async isDisplayed(): Promise<boolean> {
        return await this.current.isDisplayed();
    }

    public getObjectById(id: string) {
        return this.current
            .element(by.id(id));
    }
}
