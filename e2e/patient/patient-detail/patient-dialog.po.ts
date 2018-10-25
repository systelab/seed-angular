import { by, element } from 'protractor';
import { MainDialogUtil } from '../../common/utilities/main-dialog.util';

export class PatientEditPage extends MainDialogUtil {
	constructor() {
		super('patient-dialog');
	}

    getEnableSwich() {
        return this.getObjectById('PatientEnableSwitch').element(by.tagname('input'));
    }

	getSurnameInput() {
        return this.getObjectById('PatientSurnameInput');
    }

	getNameInput() {
        return this.getObjectById('PatientNameInput');
    }

	getEmailInput() {
        return this.getObjectById('PatientEmailInput');
    }

	getAddressStreetInput() {
        return this.getObjectById('PatientAddressStreetInput');
    }

	getAddressCityInput() {
        return this.getObjectById('PatientAddressCityInput');
    }

	getAddressZipInput() {
        return this.getObjectById('PatientAddressZipInput');
    }

	getAddressCoordinatesInput() {
        return this.getObjectById('PatientAddressCoordinatesInput');
    }

    getAllButtons() {
        return this.getMainWindow().element(by.tagName('systelab-dialog-bottom')).all(by.tagName('button'));
    }

    getbtnSubmit() {
        return this.getObjectById('PatientSubmitButton');
    }
}
