import { BASE_URL, GENERATE_CUCUMBER_HTML_REPORT, GENERATE_CUCUMBER_JUNIT_REPORT, TEST_FAIL_FILE } from '../environment';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

export const isLiveModeOn = (): boolean => process.env.LIVE_MODE === 'on';

/**
 * The purpose of this temporary test-file is to capture TestCafes' TestController.
 * We basically create and run a dummy test and capture the TestController for future tests.
 */
export const createTestFile = (name: string) => {
  writeFileSync(
    name,
    `import { testControllerHolder } from "./src/support/test-controller-holder";
      fixture("TestController")
      test("capture", testControllerHolder.capture)`
  );
};

/**
 * Add k/v-metadata to the env variable "E2E_META_BROWSER" which will then be display
 * in the metadata section of the final HTML report.
 * For processing see `cucumber-html.config.js`.
 * @param key The key
 * @param value The value
 */
export const addMetadata = (key: string, value: any) => (process.env.E2E_META_BROWSER += `;${key}=${value}`);

/**
 * Fetch relevant application versions and store as metadata.
 */
export const fetchAndAddVersionsToMetadata = () => {
  const responseHandler = response => (response.ok ? response.json() : { version: 'error' });
  const getVersion = (url: string) => fetch(url, { method: 'GET' }).then(response => responseHandler(response));

  getVersion(`${BASE_URL}/version`).then((res: any) => addMetadata('Some System', res.version));
};

/**
 * Generates the HTML report if {@link GENERATE_CUCUMBER_HTML_REPORT} is `true`
 */
export const generateHtmlReport = () => {
  if (GENERATE_CUCUMBER_HTML_REPORT) {
    try {
      console.log('Generating HTML report...');
      exec(`node ${process.cwd()}/cucumber-html.config.js`);
    } catch (error) {
      console.error('Could not generate cucumber html report', error);
    }
  }
};

/**
 * Generates the JUNIT report if {@link GENERATE_CUCUMBER_JUNIT_REPORT} is `true`
 */
export const generateJunitReport = () => {
  if (GENERATE_CUCUMBER_JUNIT_REPORT) {
    try {
      console.log('Generating JUNIT report...');
      exec(`node ${process.cwd()}/cucumber-junit.config.js`);
    } catch (error) {
      console.error('Could not generate cucumber junit report', error);
    }
  }
};

/**
 * The purpose of this file is to notify the ci-build-server that at least one test/scenario failed.
 * The ci-build-server must then let the build fail (not pass).
 */
export const createTestFailFile = () => {
  console.log('Writing test-fail file...');
  writeFileSync(`reports/${TEST_FAIL_FILE}`, ``);
};
