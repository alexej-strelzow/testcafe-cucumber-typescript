import { ClientFunction } from 'testcafe';
import logger from '../utils/logger';

export const goBack = (t: TestController): Promise<void> => ClientFunction(() => window.history.back()).with({ boundTestRun: t })();

export const getLocation = (t: TestController): Promise<string> => ClientFunction(() => window.location.href).with({ boundTestRun: t })();

export const localStorageSet = (t: TestController, key: string, val: string): Promise<void> =>
  ClientFunction((k: string, v: string) => localStorage.setItem(k, v)).with({ boundTestRun: t })(key, val);

export const localStorageGet = (t: TestController, key: string): Promise<string | null> =>
  ClientFunction((k: string) => localStorage.getItem(k)).with({ boundTestRun: t })(key);

export const clearLocalStorage = (t: TestController): Promise<void> =>
  ClientFunction(() => localStorage.clear()).with({ boundTestRun: t })();

export const scrollBy = (t: TestController, x: number, y: number): Promise<void> =>
  ClientFunction((_x: number, _y: number) => window.scrollBy(_x, _y)).with({ boundTestRun: t })(x, y);

export const scrollToElement = (t: TestController, selector: string): Promise<void> =>
  ClientFunction(_selector => document.querySelector(_selector).scrollIntoView()).with({ boundTestRun: t })(selector);

// TODO: for you to customize - how to retrieve your apps version?
// below code calls an endpoint from the browser, in case your API is protected (JWT token needed)
// usage in any step: addMetadata(APP_VERSION, await getVersion(t, BASE_URL));
export const getVersion = (t: TestController, url: string): Promise<Promise<string>> =>
  ClientFunction<Promise<string>, string[]>(
    (u: string) =>
      new Promise(resolve => {
        fetch(`${u}/api/version`)
          .then(res => res.json())
          .then(res => resolve(res.version as string))
          .catch(err => logger.error('unable to retrieve app version:', err));
      })
  ).with({ boundTestRun: t })(url);
