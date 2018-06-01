import { Component, ViewEncapsulation } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { Router } from '@angular/router';
import { ApiGlobalsService } from './globals/globals.service';
import { LocalStorageService } from 'systelab-preferences/lib/local-storage.service';

@Component({
	selector: 'app-root',
	template: `
                <router-outlet></router-outlet>`,
	styleUrls: ['app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(protected i18nService: I18nService, private router: Router, private localStorage: LocalStorageService) {
		const language = localStorage.get('language');
		let lang = 'en'
		if (language) {
			const langJson = JSON.parse(language);
			if (langJson.value.id === 1) {
				lang = 'en';
			}
			else if (langJson.value.id === 2) {
				lang = 'es-ES';
			}
			else if (langJson.value.id === 3) {
				lang = 'it-IT';
			}
			else if (langJson.value.id === 4) {
				lang = 'kr-KR';
			}
		}
		i18nService.use(lang)
			.subscribe(() => console.log('Language set to ' + language),
				(error) => console.log('Error setting the language.'));

	}
}
