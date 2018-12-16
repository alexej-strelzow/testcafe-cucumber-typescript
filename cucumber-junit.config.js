const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
    inputJsonFile: 'reports/cucumber_report.json',
    outputXmlFile: 'reports/cucumber_report.xml'
};

cucumberJunitConvert.convert(options);