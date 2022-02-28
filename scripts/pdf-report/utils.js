/*
 * Utility functions for various calculations, aggregations, etc.
 */

// FEATURE STATUS
/* context = n features */
const numFeatures = features => features.length;
const numFailedFeatures = features => features.reduce((acc, curr) => hasFeatureFailed(curr) ? acc +1 : acc, 0);
const numPassedFeatures = features => features.reduce((acc, curr) => hasFeaturePassed(curr) ? acc +1 : acc, 0);
const hasFeatureFailed = feature => feature.elements.some(scenario => hasScenarioFailed(scenario));
const hasFeaturePassed = feature => feature.elements.every(scenario => hasScenarioPassed(scenario));

// SCENARIO STATUS
/* context = n features */
const numFailedScenariosTotal = features => features.reduce((acc, curr) => acc + numFailedScenarios(curr), 0);
const numPassedScenariosTotal = features => features.reduce((acc, curr) => acc + numPassedScenarios(curr), 0);

/* context = 1 feature */
const numScenarios = report => report.reduce((acc, curr) => acc + curr.elements.length, 0);
const numFailedScenarios = feature => feature.elements.reduce((acc, curr) => hasScenarioFailed(curr) ? acc +1 : acc, 0);
const numSkippedScenarios = feature => feature.elements.reduce((acc, curr) => hasScenarioSkipped(curr) ? acc +1 : acc, 0);
const numPassedScenarios = feature => feature.elements.reduce((acc, curr) => hasScenarioPassed(curr) ? acc +1 : acc, 0);
const hasScenarioFailed = scenario => scenario.steps.some(step => step.result.status === 'failed');
const hasScenarioSkipped = scenario => scenario.steps.some(step => step.result.status === 'skipped');
const hasScenarioPassed = scenario => scenario.steps.every(step => step.result.status === 'passed');

// DURATION
const scenarioDuration = (scenario) => scenario.steps.reduce((acc, curr) => acc + curr.result.duration, 0);
const featureDuration = (feature) => feature.elements.reduce((acc, curr) => acc + scenarioDuration(curr), 0);
const totalDuration = (report) => report.reduce((acc, curr) => acc + featureDuration(curr), 0);

module.exports = {
  numFeatures: numFeatures,
  numFailedFeatures: numFailedFeatures,
  numPassedFeatures: numPassedFeatures,

  numFailedScenariosTotal: numFailedScenariosTotal,
  numPassedScenariosTotal: numPassedScenariosTotal,

  numScenarios: numScenarios,
  numFailedScenarios: numFailedScenarios,
  numSkippedScenarios: numSkippedScenarios,
  numPassedScenarios: numPassedScenarios,
  hasScenarioFailed: hasScenarioFailed,
  hasScenarioSkipped: hasScenarioSkipped,
  hasScenarioPassed: hasScenarioPassed,

  scenarioDuration: scenarioDuration,
  featureDuration: featureDuration,
  totalDuration: totalDuration,
};
