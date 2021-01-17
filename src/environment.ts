import { cwd } from 'process';
import { homedir } from 'os';

/**
 * Default Browser
 * Possible issue with chrome:headless + download
 */
const DEFAULT_BROWSER = 'chrome';

/**
 * Path-Information
 * - home directory
 * - current working directory
 */
const DEFAULT_HOME = homedir(); // /home/<usr>
const DEFAULT_CWD = cwd();

/**
 * Download/Upload/Output directories + files
 */
const DEFAULT_DOWNLOAD_DIR = `${DEFAULT_HOME}/Downloads`;
const DEFAULT_OUTPUT_DIR = `${DEFAULT_CWD}/output`;

/**
 * Exported environment variables
 */
export const BROWSER = process.env.BROWSER || DEFAULT_BROWSER;
export const BROWSER_FLAGS = process.env.BROWSER_FLAGS || '';
export const VIDEO_DIR = `${DEFAULT_OUTPUT_DIR}/videos`;
export const LOCALE = process.env.LOCALE || 'en';
export const DOWNLOAD_DIR = process.env.DOWNLOAD_DIR || DEFAULT_DOWNLOAD_DIR;

/**
 * Automatically generates the cucumber report
 * Video Recording is disabled by default
 */
export const GENERATE_CUCUMBER_HTML_REPORT = process.env.GENERATE_HTML_REPORT !== 'false'; // by default true
export const GENERATE_CUCUMBER_JUNIT_REPORT = process.env.GENERATE_JUNIT_REPORT !== 'false';
export const TEST_FAIL_FILE = process.env.TEST_FAIL_FILE || '';

export const RECORD_VIDEO = process.env.RECORD_VIDEO === 'true'; // by default false
export const RECORD_FAILED_ONLY = process.env.RECORD_FAILED_ONLY === 'true';
export const RECORD_SINGLE_FILE = process.env.RECORD_SINGLE_FILE === 'true';

const DEFAULT_BASE_URL = 'http://localhost:4200';
export const BASE_URL = process.env.BASE_URL || DEFAULT_BASE_URL;
