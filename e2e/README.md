# E2E Test

This folder contains the End to End test for the application using the standard tools Jasmine, Protractor and Selenium. Please, read the following [document][serversetup] to get more information on how to Set Up the Selenium Server.

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
ng e2e
```



[serversetup]: https://github.com/angular/protractor/blob/master/docs/server-setup.md

