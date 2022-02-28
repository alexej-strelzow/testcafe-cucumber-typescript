/*
 * SVG logic
 * @see https://github.com/alafr/SVG-to-PDFKit
 *
 * Where to get the SVGs from?
 * @see https://fonts.google.com/icons
 *
 * FYI you can style the SVGs, e.g. give them a color (see fill property):
 * ```
 * <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#CC0000">
 *   <path d="M0 0h24v24H0z" fill="none"/>
 *   <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 ..."/>
 * </svg>
 * ```
 */

const { readFileSync } = require('fs');
const { cwd } = require('process');
const SVGtoPDF = require('svg-to-pdfkit');

const ASSET_PATH = `${cwd()}/scripts/pdf-report/assets`;
const SVG_PATH = `${ASSET_PATH}/svgs`;

const addSVG = (doc, svgName, x, y, options) => {
  const svg = readFileSync(`${SVG_PATH}/${svgName}.svg`, 'utf-8');
  SVGtoPDF(doc, svg, x, y, options);
};

module.exports = {
  addSVG: addSVG,
};
