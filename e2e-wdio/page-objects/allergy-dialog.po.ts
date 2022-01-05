import { AssertionUtility, Button, InputField, Dialog, ReportUtility, Switch } from "systelab-components-wdio-test";
import { Allergy } from "@e2e-model";


export class AllergyDetailDialog extends Dialog {

    public getEnableSwitch(): Switch {
        return new Switch(this.byId("AllergyEnableSwitch"));
    }

    public getNameInput(): InputField {
        return new InputField(this.byId("AllergyNameInput"));
    }

    public getSignsInput(): InputField {
        return new InputField(this.byId("AllergySignsInput"));
    }

    public getSymptomsInput(): InputField {
        return new InputField(this.byId("AllergySymptomsInput"));
    }

    public getButtonSubmit(): Button {
        return new Button(this.byId("AllergySubmitButton"));
    }

    public async clear(): Promise<void> {
        await this.getNameInput().clear();
        await this.getSignsInput().clear();
        await this.getSymptomsInput().clear();
    }

    public async set(allergy: Allergy): Promise<void> {
        await this.getNameInput().setText(allergy.name);
        await this.getSignsInput().setText(allergy.signs);
        await this.getSymptomsInput().setText(allergy.symptoms);
    }

    public async get(): Promise<Allergy> {
        const name: string = await this.getNameInput().getText();
        const signs: string = await this.getSignsInput().getText();
        const symptoms: string = await this.getSymptomsInput().getText();
        return { name, signs, symptoms };
    }

    public async expectData(expectedData: Allergy): Promise<void> {
        await ReportUtility.addExpectedResult("Allergy data shown on dialog is: " + 
                                              `[name: '${expectedData.name}', sign: '${expectedData.signs}', symptom: '${expectedData.symptoms}']`, async () => {
            const actualData = await this.get();
            AssertionUtility.expectDeepEqual(actualData, expectedData);
        });
    }
}
