import { Component, ViewEncapsulation } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';

@Component({
	selector: 'app-root',
	template: `
                <router-outlet></router-outlet>`,
	styleUrls: ['app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(protected i18nService: I18nService) {
		i18nService.use('en-US')
			.subscribe(
				() => console.log('Language set to USA english'),
				(error) => console.log('Error setting the language.'));
	}
}
