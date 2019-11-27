import { by, protractor } from "protractor";
import { Widget } from './widget-test';

export class Datepicker extends Widget
{
    public async isPresent(): Promise<boolean>
    {
        return await this.elem.element(by.css("input")).isPresent();
    }

    public async getValue(): Promise<string>
    {
        return await this.elem.element(by.css("input")).getAttribute("value");
    }

    public async setValue(value: string): Promise<void>
    {
        await this.elem.element(by.css("input")).clear();
        await this.elem.element(by.css("input")).sendKeys(value);
        await this.elem.element(by.css("input")).sendKeys(protractor.Key.TAB);
    }
}
