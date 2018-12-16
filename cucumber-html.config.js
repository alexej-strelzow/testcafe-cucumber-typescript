const reporter = require('cucumber-html-reporter');

const options = {
    jsonFile: 'reports/cucumber_report.json',
    launchReport: false,
    metadata: {
        "App Version": "0.0.1",
        "Browser": "Chrome 70",
        "Executed": "Remote",
        "Parallel": "Scenarios",
        "Platform": "Windows 10",
        "Test Environment": "QA"
    },
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap'
};

reporter.generate(options);

//more info on `metadata` is available in `options` section below.

//to generate consolidated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`.
// More info: https://www.npmjs.com/package/cucumber-html-reporter
