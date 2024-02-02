import { Component } from '@angular/core';
import { I18nService } from 'systelab-translate';
import { Router } from '@angular/router';
import { LocalStorageService } from 'systelab-preferences';

@Component({
	selector: 'app-root',
	template: `
		<router-outlet></router-outlet>`
})
export class AppComponent {
	constructor(protected i18nService: I18nService, private router: Router, private localStorage: LocalStorageService) {
		try {
			const previousLanguage = localStorage.get('language');
			const lang = previousLanguage ? previousLanguage : 'en';
			i18nService.use(lang).subscribe();
		} catch (e) {
			console.log(e);
		}
	}
}
