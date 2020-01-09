# Automatic Test Considerations - E2E #

This folder contains the End to End test for the application using the standard tools Jasmine, Protractor and Selenium. Please, read the following [document][serversetup] to get more information on how to Set Up the Selenium Server.

## How to use Allure in Protractor

The attributes we need are specified in the mapping model table. Refer to the table to know the considerations and purposes for each one, and the way to be used when programming tests. 

See the documentation in [allure-reporter](https://systelab.github.io/allure-reporter/) site. 

# E2E Best practices

## Folder structure
The purpose of this page is to document the structure for the e2e source code.

e2e - contains a sub-folder for each one of the modules or functional areas of the application (login, patient, allergy, etc.)

For each one of the modules or functional areas, three sub-folders should be placed:

page-objects - contains only the access to the components in the view (by ID or by tag name), which returns a Widget type such as Button, InputField or Popup, which rare defined in the [systelab-components-test](https://github.com/systelab/systelab-components-test) library.

services - contains the action and navigation services. (e.g: goToThatPage(), createPatient(), deleteFirstAllergy() functions)

tests - contains the Test Cases. The file name must contain *.e2e-spec.ts. The recommendation is to split the test cases having 1 for each screen or dialog. 

* When documenting the test cases we can use the allure.createStep() or the [systelab-components-test](https://github.com/systelab/systelab-components-test) library, that includes the because(message).expect() function.

## What to test

The recommendation is to focus in layers under UI. When the project achieves a good level of coverage in terms of Unit/Component and API/Service test, E2E test can be considered.

With this in mind:

- Focus on the actions that are the main use-cases, in order to capture the user's perspective. (not the UI design or css-styles)

- Don't be exhaustive in error reporting cases, just a case to verify it is correctly reported.

- Don't overload the test with excessive validations, the aim is to keep the specs as simple and readable as possible.

- If testing a CRUD or management dialog, one test for each action should be enough.

## Configuration to test in multiple browsers

Modify the standard protractor.conf.js in order to set a list of browsers to test.

Initially was:

```javascript
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
```

And has been changed to:

```javascript
    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }, {
        'browserName': 'safari'
    }],
    seleniumAddress: 'http://localhost:4444/wd/hub',
```

## Install and run a local Selenium server

Install the Selenium server and the browser driver manager:

```bash
npm install webdriver-manager –g
```

Download the Selenium server jar and driver binaries:

```bash
webdriver-manager update
```

Start the Selenium server. By default, the selenium server will run on http://localhost:4444/wd/hub.

```bash
webdriver-manager start
```

## Run the E2E test

```bash
ng e2e --devServerTarget=
```

You can also run the E2E automatic test with the following command:
```bash
protractor protractor.conf.js -suite login,patient --baseUrl http://localhost:4200 --params.login.password=Systelab --params.login.user=Systelab
```

[serversetup]: https://github.com/angular/protractor/blob/master/docs/server-setup.md

