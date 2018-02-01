import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { PatientListPage } from './patientlist.po';
import { PatientPage } from './patient.po';

describe('Seed Angular: Patient List', () => {
	let login: LoginPage;
	let main: MainPage;
	let patientlist: PatientListPage;
	let patient: PatientPage;


	beforeEach(() => {
		login = new LoginPage();
		main = new MainPage();
		patientlist = new PatientListPage();
		patient = new PatientPage();

		login.navigateToHomePage();
		login.getUsernameField().sendKeys('quentinada');
		login.getPasswordField().sendKeys('quentinada');
		login.getEnterButton().click();
		main.getPatientButton().click();
	});

	it('Should have the expected column headers', () => {
		patientlist.getTableHeaderCells()
			.map(function (header) {
				return header.getText()
			}).then(function (headers) {
			expect(headers).toEqual(['', 'Name', 'Surname', 'Mail']);
		});
	});

	it('Should have the expected row data', () => {
		patientlist.getRow(1).map(function (cell) {
			return cell.getText();
		}).then(function (cellValues) {
			expect(cellValues).toEqual(['', 'Alex', 'Johanson', 'ajohanson@gmail.com']);
		});
	});

});

