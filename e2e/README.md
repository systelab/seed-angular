# Automatic Test Considerations - E2E #

This folder contains the End to End test for the application using the standard tools Jasmine, Protractor and Selenium. Please, read the following [document][serversetup] to get more information on how to Set Up the Selenium Server.

## How to use Allure in Protractor

> TBD: Reference to allure-reporter by @atzurk

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

# E2E Best practices

## Folder structure
The purpose of this page is to document the structure for the e2e source code.

> TBD by @atzurk

e2e folder

page-objects – contains only the access to the components in the view (by ID or by tag name), which returns a Widget type such as Button, InputField or Popup.

services - contains the navigation services, structured by functional area

tests – contains the Test Cases, structured by functional area (ex: login, patient, allergy). The file name must contain *.e2e-spec.ts. The recommendation is to split the test cases having 1 for each screen.

utilities

test-util.ts – contains all the asserts with/without the Allure documentation

Js-console.ts – this file allows you to consider the Javascript console errors to fail the test

widgets – contains all the UI components with its interactions (click) and accessors (getRow, etc)

index.ts – exports all the widgets

widget-test.ts – All widgets must extend from this class. It contains the basic getElement, click, getText and setText

## What to test

The recommendation is to focus in layers under UI. When the project achieves a good level of coverage in terms of Unit/Component and API/Service test, E2E test can be considered.

> TBD What to test in a E2E by @atzurk

[serversetup]: https://github.com/angular/protractor/blob/master/docs/server-setup.md

