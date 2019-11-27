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
}
