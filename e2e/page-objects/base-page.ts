import { by, element, ElementFinder } from 'protractor';

export class BasePage {

    protected current:ElementFinder;

    constructor(private selector: string, private index: number = 0) {
        this.current=element.all(by.tagName(this.selector)).get(this.index);
    }

    public getElementFinder() {
        return this.current;
    }

    public async getNumberOfButtons():Promise<number> {
        return await this.current
          .element(by.tagName('systelab-dialog-bottom'))
          .all(by.tagName('button')).count();
    }

    public async getTitle(): Promise<string> {
        return await this.current
            .element(by.tagName('systelab-dialog-header'))
            .element(by.className('slab-dialog-header')).getText();
    }

    public getButtonClose() {
        return this.current
            .element(by.className('slab-dialog-close'));
    }

    public getObjectById(id: string) {
        return this.current
            .element(by.id(id));
    }

    public getObjectByDataTestId(customId: string) {
        return element.all(by.css('[data-test-id="' + customId + '"]'));
    }

    public getButtonByName(name: string) {
        return this.current
            .element(by.buttonText(name));
    }

}
