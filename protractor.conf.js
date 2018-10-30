exports.config = {
	allScriptsTimeout: 11000,
	specs:             ['./e2e/**/*.e2e-spec.ts'],
	capabilities:      {'browserName': 'chrome'},
	directConnect:     true,
	baseUrl:           'http://localhost:4200/',
	framework:         'jasmine',
	jasmineNodeOpts:   {
		showColors:             true,
		defaultTimeoutInterval: 30000,
		print:                  function() {
		}
	},
	onPrepare:         function() {
		// Setting the window size
		var width = 1280;
		var height = 1024;
		browser.driver.manage()
			.window()
			.setSize(width, height);
		browser.manage()
			.timeouts()
			.implicitlyWait(15000);
		require('ts-node')
			.register({
				project: 'e2e/tsconfig.e2e.json'
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
			.afterEach(function(done) {
				browser.takeScreenshot()
					.then(function(png) {
						allure.createAttachment('Screenshot', function() {
							return new Buffer(png, 'base64');
						}, 'image/png')();
						done();
					});
			});
	},
	params:            {
		appBeingTested:                '',    // so far, options are:  'laboratory' or 'hemohub', please visit the file main.po.ts at the method: mainWindow()
		performTestOnRefreshButton:    true,
		searchJavascriptConsoleErrors: true,
		javascriptConsoleErrors:       ["ERROR", "404 (Not Found)", "(CORB) blocked", "Failed to load"],    // BEWARE: Case sensitive comparison ( it will be used with ".indexOf() == -1" )
		repeatabilityNumberPasses:     3,
		beVerbose:                     false,
		login:                         {
			user:     'Systelab',
			password: 'Systelab'
		},
	},
};

