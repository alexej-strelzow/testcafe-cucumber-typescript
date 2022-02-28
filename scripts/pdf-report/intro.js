/*
* Create the introduction page
*/

const {addSVG} = require('./svg');

const createDescriptionPage = (doc) => {
  doc.addPage().fontSize(20).text('Description', {align: 'center'}).moveDown().moveDown();

  addSVG(doc, 'ok', 80, 137);
  doc.fontSize(10).text('ok: scenario or step succeeded', 100, 140);

  addSVG(doc, 'fail', 80, 157);
  doc.fontSize(10).text('fail: scenario or step failed', 100, 160);

  addSVG(doc, 'skipped', 80, 177);
  doc.fontSize(10).text('skipped: step has been skipped due to previously failing step', 100, 180);

  addSVG(doc, 'ambiguous', 80, 197);
  doc.fontSize(10).text('ambiguous: GIVEN/WHEN/THEN step not uniquely mapped to code', 100, 200);
}

module.exports = {
  createDescriptionPage: createDescriptionPage,
};
