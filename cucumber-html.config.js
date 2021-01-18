const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const getMetadata = () => {
    let rawData = fs.readFileSync('reports/metadata.json', 'utf-8');
    return JSON.parse(rawData);
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
