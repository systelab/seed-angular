exports.config = {
    allScriptsTimeout: 5000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities: {'browserName': 'chrome'},
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    SELENIUM_PROMISE_MANAGER: false,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    onPrepare: function () {
        // Setting the window size
        var width = 1280;
        var height = 1024;
        browser.driver.manage()
            .window()
            .setSize(width, height);
        browser.manage()
            .timeouts()
            .implicitlyWait(5000);
        require('ts-node')
            .register({
                project: 'e2e/tsconfig.json'
            });

        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv()
            .addReporter(new SpecReporter({
                spec: {
                    displayStacktrace: true
                }
            }));

        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv()
            .addReporter(new AllureReporter({
                allureReport: {
                    resultsDir: 'e2e/allure-results'
                }
            }));

        jasmine.getEnv()
            .afterEach(function (done) {
                browser.takeScreenshot()
                    .then(function (png) {
                        allure.createAttachment('Screenshot', function () {
                            return new Buffer(png, 'base64');
                        }, 'image/png')();
                        done();
                    });
            });
/*
        jasmine.Spec.prototype.expect = function (actual, text) {
            var current= this;
            if (text) {
                return allure.createStep(text, function () {
                    return current.expectationFactory(actual, current);
                })();
            } else {
                return current.expectationFactory(actual, current);
            }
        };
*/
    },
    params: {
        searchJavascriptConsoleErrors: true,
        javascriptConsoleErrors: ["ERROR", "404 (Not Found)", "(CORB) blocked", "Failed to load"],    // BEWARE: Case sensitive comparison ( it will be used with ".indexOf() == -1" )
    },
};

