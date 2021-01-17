const reporter = require('cucumber-html-reporter');

const getMetadata = () => {
    return process.env.E2E_META_BROWSER
        ? process.env.E2E_META_BROWSER
            .substr(1)
            .split(';')
            .map(property => {
                const arr = property.split('=');
                const obj = {};
                obj[arr[0]] = arr[1];
                return obj;
            })
            .reduce((acc, cur) => Object.assign(acc, cur))
        : '';
};

const options = {
    jsonFile: 'reports/cucumber_report.json',
    launchReport: false,
    metadata: getMetadata(),
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap'
};

reporter.generate(options);

//more info on `metadata` is available in `options` section below.

//to generate consolidated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`.
// More info: https://www.npmjs.com/package/cucumber-html-reporter
