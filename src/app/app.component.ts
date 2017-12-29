import { Component } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';

@Component({
	selector: 'app-root',
	template: `
                <router-outlet></router-outlet>`
})
export class AppComponent {
	constructor(protected i18nService: I18nService) {
		i18nService.use('en')
			.subscribe(
				() => console.log('Language set to en.'),
				(error) => console.log('Error setting the language.'));
	}
}
