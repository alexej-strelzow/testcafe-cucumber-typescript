import * as process from 'process';

/**
 * Default Browser
 * Possible issue with chrome:headless + download
 */
const DEFAULT_BROWSER = 'chrome';

/**
 * Exported environment variables
 */
export const BROWSER = process.env.BROWSER || DEFAULT_BROWSER;

/**
 * Automatically generates the cucumber report
 */
export const GENERATE_CUCUMBER_HTML_REPORT = process.env.GENERATE_HTML_REPORT || true;
export const GENERATE_CUCUMBER_JUNIT_REPORT = process.env.GENERATE_JUNIT_REPORT || true;
