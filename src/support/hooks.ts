import { unlinkSync } from 'fs';
import { After, AfterAll, BeforeAll, Status } from 'cucumber';

import {
  BASE_URL,
  BROWSER,
  BROWSER_FLAGS,
  LOCALE,
  RECORD_FAILED_ONLY,
  RECORD_SINGLE_FILE,
  RECORD_VIDEO,
  TEST_FAIL_FILE,
  VIDEO_DIR
} from '../environment';
import { SelectorFactoryInitializer } from '../utils/selector-factory';
import { testControllerHolder } from './test-controller-holder';
import { TestControllerConfig } from './test-controller-config';
import {
  addMetadata,
  createTestFailFile,
  createTestFile,
  fetchAndAddVersionsToMetadata,
  generateHtmlReport,
  generateJunitReport,
  isLiveModeOn
} from './helper';

// tslint:disable-next-line
const createTestCafe: TestCafeFactory = require('testcafe');

const TEST_CAFE_HOST = 'localhost';
const TEST_FILE = 'test.js';
const DELAY = 5 * 1000;

let testCafe: TestCafe;

const state = {
  failedScenarios: 0,
  browserMedadataAdded: false,
  startTime: 0
};

/**
 * Creates a server instance of TestCafe and starts a test-runner.
 * For more info see {@link https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/testcafe.html}
 */
function createServerAndRunTests(): void {
  createTestCafe(TEST_CAFE_HOST)
    .then((tc: TestCafe) => {
      testCafe = tc;
      let runner: Runner = tc.createRunner();

      runner = runner
        .src(`./${TEST_FILE}`)
        .screenshots('out/reports/screenshots/', false) // we create screenshots manually!
        .browsers(`${BROWSER}${BROWSER_FLAGS}`.trim());
      if (RECORD_VIDEO) {
        runner = runner.video(VIDEO_DIR, {
          singleFile: RECORD_SINGLE_FILE,
          failedOnly: RECORD_FAILED_ONLY,
          pathPattern: '${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4'
        });
      }

      return runner.run({ quarantineMode: true }).catch((error: any) => console.error('Caught error: ', error));
    })
    .then(() => {
      if (state.failedScenarios > 0) {
        console.warn(`🔥🔥🔥 ${state.failedScenarios} scenarios (retry included) failed 🔥🔥🔥`);
      } else {
        console.log(`All tests passed 😊`);
      }
    });
}

function createLiveServerAndRunTests(): void {
  createTestCafe(TEST_CAFE_HOST, 1337, 1338)
    .then((tc: TestCafe) => {
      testCafe = tc;
      let liveRunner: Runner = tc.createLiveModeRunner();

      liveRunner = liveRunner.src(`./${TEST_FILE}`).browsers(`${BROWSER}${BROWSER_FLAGS}`.trim());

      return liveRunner.run().catch((error: any) => console.error('Caught error: ', error));
    })
    .then(() => testCafe.close());
}

/**
 * Runs before all tests are executed.
 *   - collect metadata for the HTML report
 *   - create the dummy test file to capture the {@link TestController}
 *   - create TestCafe and runs the {@link Runner} w.r.t. the set environment variables (config)
 */
BeforeAll((callback: any) => {
  process.env.E2E_META_BROWSER = '';
  addMetadata('Base URL', BASE_URL);
  addMetadata('Locale', LOCALE);
  // tslint:disable-next-line:no-commented-code
  // TODO if you want to have the app version in the report fetchAndAddVersionsToMetadata();

  state.startTime = new Date().getTime();

  testControllerHolder.register(new TestControllerConfig());
  SelectorFactoryInitializer.init();

  createTestFile(TEST_FILE);
  if (isLiveModeOn()) {
    createLiveServerAndRunTests();
  } else {
    createServerAndRunTests();
  }

  setTimeout(callback, DELAY);
});

/**
 * AfterEach (scenario):
 *   - add metadata regarding the environment (browser + OS)
 *   - take screenshot if the test case (scenario) has failed
 */
After(async function (testCase) {
  if (isLiveModeOn()) {
    return;
  }

  if (!state.browserMedadataAdded) {
    state.browserMedadataAdded = true;
    addMetadata('Environment', (await this.getTestController()).browser.prettyUserAgent);
    addMetadata('Browser Flags', BROWSER_FLAGS);
  }

  if (testCase.result.status === Status.FAILED) {
    state.failedScenarios += 1;
    await this.addScreenshotToReport();
  }
});

/**
 * Runs after all tests got executed.
 * Hook-Order:
 *   0. Hook: BeforeAll
 *     - execute dummy test ('fixture') and capture TestController
 *   1. Execute feature 1 -> feature n (Hook: After)
 *   2. Hook: After All
 *     - add metadata (start, stop and duration)
 *     - cleanup (destroy TestController, delete dummy test file)
 *     - generate reports (JSON, HTML and JUNIT)
 *     - create file to indicate that tests failed (for CI/CD) if test failed
 *     - shutdown TestCafe
 */
AfterAll((callback: any) => {
  if (isLiveModeOn()) {
    return;
  }

  const endTime = new Date().getTime();
  const duration = endTime - state.startTime;
  addMetadata('Duration', new Date(duration).toISOString().substr(11, 8));
  addMetadata('Start', new Date(state.startTime).toISOString());
  addMetadata('End', new Date(endTime).toISOString());

  SelectorFactoryInitializer.destroy();
  testControllerHolder.destroy();

  unlinkSync(TEST_FILE);

  setTimeout(callback, DELAY);
  setTimeout(async () => {
    generateHtmlReport();
    generateJunitReport();

    if (state.failedScenarios > 0 && TEST_FAIL_FILE) {
      createTestFailFile();
    }
    console.log('Shutting down TestCafe...');
    await testCafe.close();
  }, DELAY * 2);
});
