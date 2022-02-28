const { cwd } = require('process');
const { readFileSync, existsSync} = require('fs');
const fetch = require('node-fetch');

/*
 * USAGE:
 *  - .gitlab-ci.yml:   node scripts/slack-hook ${SLACK_HOOK}
 *  - locally:          node scripts/slack-hook https://xxx
 */

// for testing purposes only
// const JSON_INPUT_FILE = `${cwd()}/scripts/pdf-report/mock/cucumber_report.json`;

const JSON_INPUT_FILE = `${cwd()}/reports/cucumber_report.json`;

const postOnSlack = async (url, body) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: body }),
    });
  } catch(err) {
    console.error(err);
  }
};

const getRawJsonFile = path => {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } else {
    throw Error(`${path} could not be found!`);
  }
};

const hasScenarioFailed = scenario => scenario.steps.some(step => step.result.status === 'failed');
const hasFeatureFailed = feature => feature.elements.some(scenario => hasScenarioFailed(scenario));
const hasStepFailed = step => step.result.status === 'failed';

const getFailedTree = failedFeatures => {
  return failedFeatures.map(feature => {
    return {
      feature: feature.name,
      scenarios: feature.elements
        .filter(hasScenarioFailed)
        .map(scenario => {
          return {
            scenario: scenario.name,
            step: scenario.steps
              .filter(hasStepFailed)
              .map(step => step.name)[0]
          }
        })
    }
  });
}

const getHeader = report => {
  let numFailed = 0;
  let numPassed = 0;
  let numNotPassed = 0;

  report.forEach(feature => {
    feature.elements.forEach(scenario => {
      scenario.steps.forEach(step => {
        if (step.result.status === 'passed') {
          numPassed += 1;
        }
        if (step.result.status !== 'passed') {
          numNotPassed += 1;
        }
        if (step.result.status === 'failed') {
          numFailed += 1;
        }
      });
    });
  });

  return JSON.stringify({
    "Successful test steps": `${numPassed}/${numPassed+numNotPassed} (${Math.floor(numPassed*100/(numPassed+numNotPassed))}%)`,
    "Failed test steps": `${numFailed}`
  }, null, 2).replace(/\{|\}|\"/g, '');
}

const getBody = failedFeatures => {
  const relevantPart = getFailedTree(failedFeatures);
  return JSON.stringify(relevantPart, null, 2)
    .replace(/\[|\]|\{|\}|,/g, '')
    .replace(/\"scenarios\"\: /g, '')
    .replace(/\"step\"\: /g, '       \"step\"\: ')
    .replace(/^\s*\n/gm, '')
    .replace(/\"feature\"/g, '*feature*')
    .replace(/\"scenario\"/g, '*scenario*')
    .replace(/\"step\"/g, '*step*')
}

const main = () => {
  try {
    const url = process.argv.slice(2)[0];
    const jsonReport = getRawJsonFile(JSON_INPUT_FILE);

    const failedFeatures = jsonReport.filter(hasFeatureFailed);
    const header = getHeader(jsonReport);

    if (failedFeatures.length > 0) {
      const body = getBody(failedFeatures);
      postOnSlack(url, header + '\n' + body);
    } else {
      postOnSlack(url, header);
    }

    console.log('🎉 SUCCESS 🎉');
  } catch (err) {
    console.error(`🔥🔥🔥 ${err.message} 🔥🔥🔥`);
  }
};

main();
