import { Injectable } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { MessagePopupService } from 'systelab-components/widgets/modal';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	constructor(protected i18NService: I18nService, protected messagePopupService: MessagePopupService) {
	}

	public showError(error: Error) {
		this.messagePopupService.showErrorPopup(this.i18NService.instant('ERR_ERROR'), error.message);
	}
}