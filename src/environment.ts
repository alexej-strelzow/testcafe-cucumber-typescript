import * as process from 'process';

/**
 * Default Browser
 * Possible issue with chrome:headless + download
 */
const DEFAULT_BROWSER = 'chrome';

const DEFAULT_CWD = process.cwd();
const DEFAULT_OUTPUT_DIR = `${DEFAULT_CWD}/output`;

/**
 * Exported environment variables
 */
export const BROWSER = process.env.BROWSER || DEFAULT_BROWSER;
export const BROWSER_FLAGS = process.env.BROWSER_FLAGS || '';
export const VIDEO_DIR = `${DEFAULT_OUTPUT_DIR}/videos`;
/**
 * Automatically generates the cucumber report
 */
export const GENERATE_CUCUMBER_HTML_REPORT = process.env.GENERATE_HTML_REPORT || true;
export const GENERATE_CUCUMBER_JUNIT_REPORT = process.env.GENERATE_JUNIT_REPORT || true;

export const TEST_FAIL_FILE = process.env.TEST_FAIL_FILE || '';

export const RECORD_VIDEO = process.env.RECORD_VIDEO || false;
export const RECORD_FAILED_ONLY = process.env.RECORD_FAILED_ONLY || false; // "true" does not work with cucumber
export const RECORD_SINGLE_FILE = process.env.RECORD_SINGLE_FILE || false;
