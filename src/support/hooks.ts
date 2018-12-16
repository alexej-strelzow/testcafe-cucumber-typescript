import * as p from 'process';
import * as child_process from 'child_process';
import * as fs from 'fs';

import { BeforeAll, After, AfterAll, Status } from 'cucumber';
import testControllerHolder from './test-controller-holder';
import { SelectorFactoryInitializer } from '../utils/selector-factory';
import {
  BROWSER,
  GENERATE_CUCUMBER_HTML_REPORT,
  GENERATE_CUCUMBER_JUNIT_REPORT,
} from '../environment';

// tslint:disable-next-line
const createTestCafe = require('testcafe');

let testcafe;
const TEST_FILE = 'test.js';
const DELAY = 5 * 1000;

/**
 * The purpose of this temporary test-file is to capture TestCafes' TestController.
 * We basically create and run a dummy test and capture the TestController for future tests.
 */
function createTestFile() {
  fs.writeFileSync(
    TEST_FILE,
    `import testControllerHolder from "./src/support/test-controller-holder";
      fixture("fixture")
      test("test", testControllerHolder.capture)`
  );
}

/**
 * Creates a server instance of TestCafe and starts a test-runner.
 * For more info see {@link https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/testcafe.html}
 */
function createServerAndRunTests() {
  let runner;

  createTestCafe('localhost', 1337, 1338)
    .then((tc: any) => {
      testcafe = tc;
      runner = tc.createRunner();

      return runner
        .src(`./${TEST_FILE}`)
        .screenshots('reports/screenshots/', false) // we create screenshots manually!
        .browsers(BROWSER)
        .run()
        .catch((error: any) => {
          console.log('Runner error count was: ', error);
        });
    })
    .then((report: any) => {
      console.log('Report data was: ', report);
    });
}

/**
 * Runs before all tests start executing.
 * Creates the dummy test file and captures the TestController.
 */
BeforeAll((callback) => {
  SelectorFactoryInitializer.init();
  createTestFile();
  createServerAndRunTests();
  setTimeout(callback, DELAY);
});

/**
 * AfterEach (scenario):
 * - Take screenshot if the test case (scenario) has failed
 * - Logout
 */
After(async function(testCase) {
  const world = this;
  const t: TestController = await world.waitForTestController();

  if (testCase.result.status === Status.FAILED) {
    await t.takeScreenshot().then((path) => {
      console.log('screenshot taken, see: ', path);
      return world.attachScreenshotToReport(path);
    });
  }
});

const generateHtmlReport = () => {
  if (GENERATE_CUCUMBER_HTML_REPORT) {
    try {
      child_process.exec(`node ${process.cwd()}/cucumber-html.config.js`);
    } catch (error) {
      console.error('Could not generate cucumber html report', error);
    }
  }
};

const generateJunitReport = () => {
  if (GENERATE_CUCUMBER_JUNIT_REPORT) {
    try {
      child_process.exec(`node ${process.cwd()}/cucumber-junit.config.js`);
    } catch (error) {
      console.error('Could not generate cucumber junit report', error);
    }
  }
};

/**
 * Runs after all tests finished executing, that is:
 * 0. BeforeAll
 *     - execute dummy test ('fixture') and capture TestController
 * 1. Execute feature 1 -> feature n (After)
 * 2. After All
 *     - cleanup (free TestController, delete dummy test file)
 *     - generate html report
 *     - exit process
 */
AfterAll((callback) => {
  SelectorFactoryInitializer.destroy();
  testControllerHolder.free();

  fs.unlinkSync(TEST_FILE);

  setTimeout(callback, DELAY);
  setTimeout(() => {
    generateHtmlReport();
    generateJunitReport();
    return p.exit();
  }, DELAY * 2);
});
