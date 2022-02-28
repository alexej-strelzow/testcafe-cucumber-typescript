/*
 * Creates the over page
 */

const { cwd } = require('process');

const { numPassedFeatures, numFeatures, numPassedScenariosTotal, numScenarios, totalDuration } = require('./utils');
const { nsToTimeString } = require('./format');

const ASSET_PATH = `${cwd()}/scripts/pdf-report/assets`;

const createCoverPage = (doc, report, appVersion) => {
  const now = new Date();

  doc.image(`${ASSET_PATH}/logo.png`, 420, 50, {fit: [113, 102]});

  doc.fontSize(20).text('E2E Report', 50, 200, {align: 'center'}).moveDown().moveDown();
  doc.fontSize(14).text(`Version: ${appVersion}`, { align: 'center' }).moveDown();
  doc.fontSize(14).text(`Date: ${now.toLocaleDateString()}`, { align: 'center' }).moveDown();
  doc.fontSize(14).text(`Time: ${now.toLocaleTimeString()}`, { align: 'center' }).moveDown();

  doc.moveDown().moveDown().moveDown().fontSize(16).text('Summary', {align: 'center'}).moveDown();

  doc.fontSize(14).text(`Passed Features: ${numPassedFeatures(report)}/${numFeatures(report)}`, { align: 'center' }).moveDown();
  doc.fontSize(14).text(`Passed Scenarios: ${numPassedScenariosTotal(report)}/${numScenarios(report)}`, { align: 'center' }).moveDown();
  doc.fontSize(14).text(`Total Duration: ${nsToTimeString(totalDuration(report))}`, { align: 'center' }).moveDown();
};

module.exports = {
  createCoverPage: createCoverPage,
};
