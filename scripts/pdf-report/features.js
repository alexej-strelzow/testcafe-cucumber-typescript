/*
 * Whatever is related to features (feature -> scenario -> step)
 */

const { numFailedScenarios, numPassedScenarios, featureDuration } = require('./utils');
const { nsToTimeString, truncate } = require('./format');

const { printScenarios } = require('./scenarios');

// without this limitation we would print 1 feature on 1 page (overflow)
const FEATURES_PER_PAGE = 25;

const createFeatureOverview = (doc, features) => {
  let pageCount = 0;

  doc.addPage().fontSize(20).text('Feature Overview', {align: 'center'});
  doc.fontSize(10)
    .text('Features', 50, 120, {bold: true})
    .text('Time', 345, 120, {bold: true})
    .text('Scenarios', 390, 120, {bold: true})
    .text('Passed', 455, 120, {bold: true})
    .text('Failed', 505, 120, {bold: true, width:50});

  features.map((feature, idx) => {
    if (idx > 0 && idx % FEATURES_PER_PAGE === 0) {
      doc.addPage();
      pageCount++;
    }

    const stepOffset = pageCount === 0 ? 140 : 65;
    const y = stepOffset + 20 * (idx % FEATURES_PER_PAGE);
    doc.fontSize(10)
      .text(truncate(feature.name, 60), 50, y)
      .text(nsToTimeString(featureDuration(feature)), 332, y, { width:50, align: 'right' })
      .text(feature.elements.length, 410, y, { width:15, align: 'right' })
      .text(numPassedScenarios(feature), 465, y, { width:15, align: 'right' })
      // if we would use numSkippedScenarios then it would also include the failed ones (failed => skipped, but not the other way around)
      .text(numFailedScenarios(feature), 515, y, { width:15, align: 'right' });

    doc.lineJoin('miter').rect(35, y-6, 510, 20).stroke();
    doc.moveTo(330, y-6).lineTo(330, y+14).stroke();
    doc.moveTo(385, y-6).lineTo(385, y+14).stroke();
    doc.moveTo(440, y-6).lineTo(440, y+14).stroke();
    doc.moveTo(495, y-6).lineTo(495, y+14).stroke();

  });
};

const createFeatureDetail = (doc, features) => {
  const yOffset = 160;
  features.forEach(feature => {
    doc.addPage().fontSize(15).text(feature.name, {align: 'center'}).moveDown();

    doc.fontSize(10)
      .text('Scenarios', 50, yOffset, {bold: true})
      .text('Time', 460, yOffset, {bold: true})
      .text('Status', 505, yOffset, {bold: true, width:50});

    printScenarios(doc, feature, yOffset);
  });
};

module.exports = {
  createFeatureOverview: createFeatureOverview,
  createFeatureDetail: createFeatureDetail,
};
