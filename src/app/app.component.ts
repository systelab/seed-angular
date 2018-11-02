import { Component, ViewEncapsulation } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'systelab-preferences/lib/local-storage.service';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	constructor(protected i18nService: I18nService, private router: Router, private localStorage: LocalStorageService) {
		try {
			const previousLanguage = localStorage.get('language');
			const lang = previousLanguage ? previousLanguage : 'en';
			i18nService.use(lang)
				.subscribe(() => console.log('Language set to ' + lang),
					(error) => console.log('Error setting the language.'));

		} catch (e) {
			console.log(e);
		}
	}
}
