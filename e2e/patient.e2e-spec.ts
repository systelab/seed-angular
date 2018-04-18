import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { PatientListPage } from './patientlist.po';
import { PatientPage } from './patient.po';

declare const allure: any;

describe('Seed Angular: Patient', () => {
	let login: LoginPage;
	let main: MainPage;
	let patientlist: PatientListPage;
	let patient: PatientPage;
	let initialNumOfRows = 0;

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

	it('Should be possible to create a patient if all fields are correct', () => {

		patientlist.getNumberOfRows().then((value) => this.initialNumOfRows = value);

		patientlist.getAddButton().click();
		patient.getNameField().sendKeys('Alex');
		patient.getSurnameField().sendKeys('Johanson');
		const today= new Date();
		const timestamp = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate() + '.' + today.getHours() + '.' + today.getMinutes();
		patient.getEMailField().sendKeys('ajohanson' + timestamp + '@gmail.com');
		patient.getCreateButton().click();
		patientlist.getRefreshButton().click();
		expect(patientlist.getCellWithValue('ajohanson' + timestamp + '@gmail.com').isPresent());
	});

	it('The patient grid should have incremented the number of rows after adding a patient', () => {
		patientlist.getNumberOfRows().then((value) => expect(value === initialNumOfRows + 1));
	});

	it('Should display an error message when creating a patient with incorrect email', () => {
		patientlist.getAddButton().click();
		patient.getNameField().sendKeys('Alex');
		patient.getSurnameField().sendKeys('Johanson');
		patient.getEMailField().sendKeys('ajohanson 2.:43:/2@gmail.com');
		patient.getCreateButton().click();
		expect(patient.getErrorMessage().isPresent());
	});

	it('Should be possible to update a patient if all fields are correct', () => {
			patientlist.clickRow(0);
			const today = new Date();
			const timestamp = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate() + '.' + today.getHours() + '.' + today.getMinutes();
			patient.getEMailField().clear();
			patient.getEMailField().sendKeys('ajohanson' + timestamp + '@gmail.com');
			patient.getUpdateButton().click();
			patientlist.getRefreshButton().click();
			expect(patientlist.getCellWithValue('ajohanson' + timestamp + '@gmail.com').isPresent());
		});

});
