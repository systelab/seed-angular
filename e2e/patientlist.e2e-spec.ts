import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { PatientListPage } from './patientlist.po';
import { PatientPage } from './patient.po';

declare const allure: any;

describe('Seed Angular: Patient List', () => {
	let login: LoginPage;
	let main: MainPage;
	let patientlist: PatientListPage;
	let patient: PatientPage;

	beforeEach(() => {
		allure.addLabel('tms', 'TC0001_PatientManagement_e2e');
		allure.addLabel('feature', 'Patient Test Suite.\n\nGoal:\n Check that is possible to manage a patient.\n\nEnvironment: A simple browser\nPreconditions:\nN/A.');

		login = new LoginPage();
		main = new MainPage();
		patientlist = new PatientListPage();
		patient = new PatientPage();

		login.navigateToHomePage();
		login.getUsernameField().sendKeys('Systelab');
		login.getPasswordField().sendKeys('Systelab');
		login.getEnterButton().click();
		main.getPatientButton().click();
	});

	it('The patient grid should have the expected column headers', () => {
		patientlist.getTableHeaderCells()
			.map(function (header) {
				return header.getText()
			}).then(function (headers) {
			expect(headers).toEqual(['', 'Name', 'Surname', 'Mail']);
		});
	});

	it('The patient grid should have the expected data in a given row', () => {
		patientlist.getRow(0).map(function (cell) {
			return cell.getText();
		}).then(function (cellValues) {
			expect(cellValues[1]).toEqual('Alex');
			expect(cellValues[2]).toEqual('Johanson');
		});
	});

	it('Should open a patient dialog and have the expected data for a given row in the patient grid', () => {
		patientlist.getRow(0).map(function (cell) {
			return cell.getText();
		}).then(function (cellValues) {
			patientlist.clickRow(0);
			expect(patient.getNameField().getAttribute('value')).toBe(cellValues[1]);
			expect(patient.getSurnameField().getAttribute('value')).toBe(cellValues[2]);
			expect(patient.getEMailField().getAttribute('value')).toBe(cellValues[3]);
		});
	});
});

