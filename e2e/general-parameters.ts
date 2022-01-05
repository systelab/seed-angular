import {browser} from 'protractor';

export class GeneralParameters {
	public static readonly NOT_RETRIEVED = '<not retrieved yet, available after calling navigateToHomePage()>';

	public static readonly USERNAME = 'Systelab';
	public static readonly PASSWORD = 'Systelab';

	public static appName = GeneralParameters.NOT_RETRIEVED;
	public static appDescription = GeneralParameters.NOT_RETRIEVED;
	public static appVersion = GeneralParameters.NOT_RETRIEVED;
	public static appCopyright = GeneralParameters.NOT_RETRIEVED;
}

export function disableCSSAnimation() {
	browser.executeScript(()=> {
		var css = '* {' +
				'animation: none !important;' +
				'}',
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	});
}
