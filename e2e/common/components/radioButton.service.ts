import { by, element } from 'protractor';

export class RadioButtonService {
	/** verifies if is checked or not */
	public static checkChecked(myElement, expected) {
		myElement.isSelected()
			.then(selected => {
				expect(selected)
					.toBe(expected);
			});
	}

	public static PassToChecked(myElement) {
		myElement.getAttribute('id')
			.then(attr => {
				// TODO pending review
				//expect(typeof attr)
				//	.toBe('string');
				const elementLabel = element(by.css('label[for=\'' + attr + '\']'));
				elementLabel.click();
			});
	}
}
