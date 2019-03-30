import { Injectable } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { MessagePopupService } from 'systelab-components/widgets/modal';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	constructor(protected i18nService: I18nService, protected messagePopupService: MessagePopupService) {
	}

	public showError(error: Error) {
		this.i18nService.get(['ERR_ERROR']).subscribe((res) => {
			this.messagePopupService.showErrorPopup(res.ERR_ERROR, error.message);
		});
	}
}