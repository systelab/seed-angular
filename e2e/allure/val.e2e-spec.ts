import {because, TestUtil} from 'systelab-components-test/lib/utilities';
import {GeneralParameters} from '../general-parameters';

declare const allure: any;

describe('TC000X_Allure-Validation_e2e', () => {

	beforeEach(async () => {
		TestUtil.init('TC000X_Allure-Validation_e2e', 'Goal: The purpose of this test case is to verify the xml file generation',
			GeneralParameters.appVersion, GeneralParameters.USERNAME);
		allure.addLabel('actualResults', 'new label inserted from e2e Test Execution...');
	});

	it('Allure-Validation - Trivial action with expected result (pass)', async () => {
		await because('Expected result is correct').expect(1).toEqual(1);
	});

	it('Allure-validation - Trivial action with expected result (fail)', async () => {
		await because('Expected result is not correct').expect(1).toEqual(2);
	});

	it('Allure-validation - Nested actions (pass)', async () => {
		await allure.createStep('Action:First Level action', async () => {
			await allure.createStep('Action:Second Level action', async () => {
				await allure.createStep('Action:Third Level action', async () => {
					await allure.createStep('Action:Fourth Level action', async () => {
						await because('Expected result is correct').expect(1).toEqual(1);
					})();
				})();
			})();
		})();
	});

	it('Allure-validation - Nested results (pass)', async () => {
		await allure.createStep('First Level result', async () => {
			expect(1).toEqual(1);
			await allure.createStep('Second Level result', async () => {
				expect(1).toEqual(1);
				await allure.createStep('Third Level result', async () => {
					expect(1).toEqual(1);
					await allure.createStep('Fourth Level result', async () => {
						expect(1).toEqual(1);
						await because('Expected result is correct').expect(1).toEqual(1);
					})();
				})();
			})();
		})();
	});

	it('Allure-validation - Nested actions (fail)', async () => {
		await allure.createStep('Action:First Level Action', async () => {
			await allure.createStep('Action:Second Level Action', async () => {
				await allure.createStep('Action:Third Level Action', async () => {
					await because('Expected result is not correct').expect(1).toEqual(2);
				})();
			})();
		})();
	});

	it('Allure-validation - Nested results (fail)', async () => {
		await allure.createStep('First Level Result', async () => {
			expect(1).toEqual(1);
			await allure.createStep('Second Level Result', async () => {
				expect(1).toEqual(1);
				await allure.createStep('Third Level Result', async () => {
					expect(1).toEqual(1);
					await because('Expected result is not correct').expect(1).toEqual(2);
				})();
			})();
		})();
	});

	it('Allure-validation - non Nested results (fail)', async () => {
		await because('First Result').expect(1).toEqual(1);
		await because('Second Result').expect(1).toEqual(1);
		await because('Third Result').expect(1).toEqual(1);
		await because('Fourth result').expect(1).toEqual(1);
		await because('Expected result is not correct').expect(1).toEqual(2);
	});

	it('Allure-validation - non Nested results (pass)', async () => {
		await because('First Result').expect(1).toEqual(1);
		await because('Second Result').expect(1).toEqual(1);
		await because('Third Result').expect(1).toEqual(1);
		await because('Fourth Result').expect(1).toEqual(1);
		await because('Expected result is correct').expect(1).toEqual(1);
	});
});
