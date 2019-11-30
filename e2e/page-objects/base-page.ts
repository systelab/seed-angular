import { by, element, ElementFinder } from 'protractor';

export class BasePage {

    protected current:ElementFinder;

    constructor(private selector: string) {
        this.current=element(by.tagName(this.selector));
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
}
