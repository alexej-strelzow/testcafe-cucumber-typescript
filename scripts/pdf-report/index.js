/*
 * Main file which exposes the main method "generatePDFReport" to the outside world.
 * Generates from a given input `cucumber_report.json` a PDF report: `cucumber_report.pdf`.
 * The report has the following structure:
 * 1. Cover Page: Timestamp + Management Summary
 * 2. Feature Overview: Lists all features and metadata (duration, scenarios (+ failed or skipped)
 * 3. Feature Details: For each feature its scenarios + steps per feature are displayed
 *    This is kind of a tree: 1 feature -> n scenarios and 1 scenario -> n steps
 *
 * Tips for Development:
 *  - place some test reports inside the folder: pdf-report/mock
 *  - point to that report: const JSON_INPUT_FILE = `${cwd()}/scripts/pdf-report/mock/cucumber_report_big.json`;
 *  - run the generator via: npm run generate:pdf-report
 */

const PDFGenerator = require('pdfkit')
const { readFileSync, existsSync, createWriteStream } = require('fs');
const { cwd } = require('process');

const { createCoverPage } = require('./cover');
const { createDescriptionPage } = require('./intro');
const { createFeatureOverview, createFeatureDetail } = require('./features');

// for testing purposes
// const JSON_INPUT_FILE = `${cwd()}/scripts/pdf-report/mock/cucumber_report.json`;

const JSON_INPUT_FILE = `${cwd()}/reports/cucumber_report.json`;
const PDF_OUTPUT_FILE =  `${cwd()}/reports/cucumber_report.pdf`;

let pdfOutput;

const getRawJsonFile = (path) => {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } else {
    throw Error(`${path} could not be found!`);
  }
};

const createFooter = (pdfOutput) => {
  let pages = pdfOutput.bufferedPageRange();
  for (let i = 1; i < pages.count; i++) {
    pdfOutput.switchToPage(i);

    // add page number
    let oldBottomMargin = pdfOutput.page.margins.bottom;
    pdfOutput.page.margins.bottom = 0
    pdfOutput.text(
      `${i + 1} of ${pages.count}`,
      70,
      pdfOutput.page.height - (oldBottomMargin/2), // Centered vertically in bottom margin
      { align: 'center' }
    );
    pdfOutput.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
  }
};

const createReport = (jsonReport, appVersion) => {
  if (!jsonReport.length) {
    throw Error(`No "features" found in: ${JSON.stringify(jsonReport)}`);
  }

  pdfOutput = new PDFGenerator({size: 'A4', bufferPages: true});
  pdfOutput.pipe(createWriteStream(PDF_OUTPUT_FILE));

  createCoverPage(pdfOutput, jsonReport, appVersion);
  createDescriptionPage(pdfOutput);
  createFeatureOverview(pdfOutput, jsonReport);
  createFeatureDetail(pdfOutput, jsonReport);
  createFooter(pdfOutput);

  pdfOutput.end();
};

const generatePDFReport = (appVersion) => {
  try {
    console.log('generating pdf report...');

    createReport(getRawJsonFile(JSON_INPUT_FILE), appVersion);

    console.log('🎉 successfully generated pdf report 🎉');
  } catch (err) {
    console.error(`🔥🔥🔥 ${err.message} 🔥🔥🔥`);
  }
};

module.exports = generatePDFReport;
