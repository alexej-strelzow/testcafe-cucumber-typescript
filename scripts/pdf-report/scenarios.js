/*
 * Whatever is related to scenarios (feature -> scenario -> step)
 */

const { hasScenarioFailed, hasScenarioPassed, scenarioDuration } = require('./utils');
const { nsToTimeString } = require('./format');

const { printSteps } = require('./steps');
const {addSVG} = require('./svg');

const printScenarios = (doc, feature, yOffset) => {
  feature.elements.map((scenario, idx) => {
    const y = yOffset + 20 + 20 * idx;
    doc.fontSize(10)
      .text(scenario.name.substr(0, 60), 50, y)
      .text(nsToTimeString(scenarioDuration(scenario)), 442, y, { width:50, align: 'right' })

    if (hasScenarioPassed(scenario)) {
      addSVG(doc, 'ok', 515, y - 3);
    } else if (hasScenarioFailed(scenario)) {
      addSVG(doc, 'fail', 515, y - 3);
    }

    doc.lineJoin('miter').rect(35, y-6, 510, 20).stroke();
    doc.moveTo(440, y-6).lineTo(440, y+14).stroke();
    doc.moveTo(495, y-6).lineTo(495, y+14).stroke();
  });

  feature.elements.forEach(scenario => {
    doc.addPage().fontSize(10).text(scenario.name, {align: 'center'}).moveDown();
    doc.moveDown();
    doc.fontSize(10)
      .text('Keyword', 35, yOffset, {bold: true})
      .text('Name', 80, yOffset, {bold: true})
      .text('Time', 460, yOffset, {bold: true})
      .text('Status', 505, yOffset, {bold: true, width:50});
    printSteps(doc, scenario, yOffset);
  })
};

module.exports = {
  printScenarios: printScenarios,
};
