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

