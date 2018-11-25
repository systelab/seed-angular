# Automatic Test Considerations - E2E #

This folder contains the End to End test for the application using the standard tools Jasmine, Protractor and Selenium. Please, read the following [document][serversetup] to get more information on how to Set Up the Selenium Server.

## What to test - Recommendations

The recommendation is to focus in layers under UI. When the project achieves a good level of coverage in terms of Unit/Component and API/Service test, E2E test can be considered.
For further details, refer to Test Automation Strategy at Werfen Clinical Software.

The best way to prevent over-documented Test Cases:
- You need to decide if it's necessary to report the unit test as formal.
- Do not document the util methods

## How to use Allure in Protractor

The attributes are TmsLink and Feature at Spec level and Allure steps each test and step. Refer to the file patient.e2e-spec.ts
- TmsLink: Name of the Test Case.

   It must be the same as the Test Case name in Jama
   We highly recommend you not to use the TmsLink for additional traceability purposes. It's better to keep it simple so that it is maintainable
- Feature: Description of the Test Case. You can also add additional information as text such as preconditions, environment, etc.
- Additional Information such as Browser, appVersion, tester, testExecutionDateAndTime
- IT description: Step Action in the Test Case. You must enter the action to perform.
- Allure Step: Step Expected Result or Action in the Test Case.

   You can use allure.createStep('Action:.. to identify that a step is an Action. Otherwise, all the Allure Steps will be considered as Expected Results.
   Consider that it may be nested Steps
   All the Expected Results are documented just once, for each type of object. Refer to the file test-util.ts

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

# Protractor Locators (Selectors)

The most used:

```
$('#some-id')
```

or

```
element(by.id('some-id'))
```

The $ is not a jQuery selector, but a shorthanded version of element(by.css('#some-id')). In this fashion, we’d be able to select elements by id, class and attributes:

```
$('.some-class')             // element(by.className())
$('tag-name')                // element(by.tagName())
$('[ng-message=required]')   // remember to leave out the double quotes around the value of attribute
$('#parent #child')          // select one child inside parent
$('ul li')                   // select all children inside parent
$('ul li').first()           // select first of children
$('ul li').last()            // select last of children
$('ul li').get(index)        // select index-th of children
```

Then we get the more interesting ones:

```
element(by.model('data'));
element(by.repeater('cat in pets'));
element(by.options('c for c in colors'))
element(by.binding('value'));           // only look through the elements with ng-binding attribute
element(by.buttonText('Save'));         // the whole of button text
element(by.partialButtonText('Save'));  // part of button text
element(by.cssContainingText('.pet', 'Dog')) // for selecting this: <li class="pet">Dog</li>
element(by.deepCss('span'))             // for selecting all level of spans <span><span>x</span></span>
```


[serversetup]: https://github.com/angular/protractor/blob/master/docs/server-setup.md

