// if you develop locally you can influence the executed tests as follows:
// `process.env.TAGS = ' @some-tag'`
// IMPORTANT: never forget to delete it again, otherwise only those tests will run in CI/CD environment!

// common options also apply to live-mode

const fs = require('fs');
const process = require('process');

const setupEnv =() => {
  const projectDir = process.cwd();
  const configFilePath = `${projectDir}/.env.${process.env.NODE_ENV ?? 'development'}`;

  console.log('Processing config file:', configFilePath);
  const configFileContent = fs.readFileSync(configFilePath, 'utf-8');

  configFileContent.split('\n')
    .filter(line => line)
    .filter(line => !line.startsWith('#'))
    .forEach(line => {
      const [key, value] = line.split('=');
      if (!process.env[key]) {
        process.env[key] = value;
      }
      console.log(`${key}=${process.env[key]}`);
    });
};

setupEnv();

const common = ['src/features', '--require-module ts-node/register', '--require src/**/*.ts'];

if (process.env.LIVE_MODE !== 'on') {
  common.push('--format json:./reports/cucumber_report.json');
  common.push('--format @serenity-js/cucumber');
  common.push('--publish-quiet');
  common.push(typeof process.env.SCENARIO_RETRY === 'undefined' ? '--retry 2' :   '--retry ' + process.env.SCENARIO_RETRY);
}

/**
 * A comma separated strings of tags that can be used to limit which feature files to run
 * @example @some-tag1, @some-tag2
 */
const tags = (process.env.TAGS || '')
  .split(',')
  .map(item => item.trim())
  .join(' or ');

if (tags.trim()) {
  common.push(`-t "${tags}"`);
}

module.exports = {
  cucumber: common.join(' ')
};
