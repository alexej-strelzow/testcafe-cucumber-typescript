/*
 * Whatever is related to steps (feature -> scenario -> step)
 */

const { nsToTimeString, truncate } = require('./format');
const {addSVG} = require('./svg');

// without this limitation we would print 1 step on 1 page (overflow)
const STEPS_PER_PAGE = 30;

const STATE_TO_SVG_MAP = {
  'passed': 'ok',
  'failed': 'fail',
  'skipped': 'skipped',
  'ambiguous': 'ambiguous',
}

const printSteps = (doc, scenario, yOffset) => {
  let pageCount = 0;

  scenario.steps.filter(step => !step.hidden).map((step, idx) => {
    if (step.keyword === 'After') {
      return;
    }

    if (idx > 0 && idx % STEPS_PER_PAGE === 0) {
      doc.addPage();
      pageCount++;
    }

    const stepOffset = pageCount === 0 ? yOffset + 20 : 65;
    const y = stepOffset + 20 * (idx % STEPS_PER_PAGE);

    doc.fontSize(8)
      .text(step.keyword, 40, y)
      .text(truncate(step.name, 93), 80, y)
      .text(nsToTimeString(step.result.duration), 450, y, { width:40, align: 'right' })

    addSVG(doc, STATE_TO_SVG_MAP[step.result.status], 515, y-3);

    doc.lineJoin('miter').rect(35, y-7, 510, 20).stroke();
    doc.moveTo(75, y-7).lineTo(75, y+13).stroke();
    doc.moveTo(445, y-7).lineTo(445, y+13).stroke();
    doc.moveTo(495, y-7).lineTo(495, y+13).stroke();
  });
};

module.exports = {
  printSteps: printSteps,
};
