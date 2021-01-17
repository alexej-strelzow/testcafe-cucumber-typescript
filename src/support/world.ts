import { base64Sync } from 'base64-img';
import { testControllerHolder } from './test-controller-holder';
import { IWorldOptions, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import * as chai from 'chai';
import * as chaiString from 'chai-string';
import { isLiveModeOn } from './helper';
import logger from '../utils/logger';
const screenshot = require('screenshot-desktop');

chai.use(chaiString);

const DEFAULT_TIMEOUT = isLiveModeOn() ? 60 * 60 * 1000 : 30 * 1000;

export interface Ctx {
  getTestController: () => Promise<TestController>;
  addScreenshotToReport: () => Promise<void>;
  attachScreenshotToReport: (pathToScreenshot: string) => Promise<void>;
  attachScreenshotInPngFormatToReport: (pngImage: any) => Promise<void>;
}

function CustomWorld(this: IWorldOptions & Ctx, { attach }) {
  /**
   * this function is crucial for the Given-Part of each feature as it provides the TestController
   */
  this.getTestController = () => testControllerHolder.get();

  /**
   * function that attaches the attachment (e.g. screenshot) to the report
   */
  this.attach = attach;

  /**
   * Adds embeddings to the "After"-step (see report.json):
   * "embeddings": [{ "data": "base64 encoded image", "mime_type": "image/png" }]
   */
  this.addScreenshotToReport = async function () {
    await (await this.getTestController())
      .takeScreenshot()
      .then(this.attachScreenshotToReport)
      .catch(async error => {
        // Workaround for https://github.com/DevExpress/testcafe/issues/4231
        logger.error('encountered an error during taking screenshot, retry using another library...', error);
        await screenshot({ format: 'png' }).then(image => {
          logger.info('screenshot taken!');
          return this.attachScreenshotInPngFormatToReport(image);
        });
      });
  };

  /**
   * Adds the screenshot under the given path to the json report
   *
   * @param pathToScreenshot The path under which the screenshot has been saved
   */
  this.attachScreenshotToReport = (pathToScreenshot: string) => {
    const imgInBase64: string = base64Sync(pathToScreenshot);
    const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
    return attach(imageConvertForCuc, 'image/png');
  };

  /**
   * Adds the screenshot to the json report
   *
   * @param pngImage the image in png format
   */
  this.attachScreenshotInPngFormatToReport = (pngImage: any) => attach(pngImage, 'image/png');
}

setDefaultTimeout(DEFAULT_TIMEOUT);

setWorldConstructor(CustomWorld);
