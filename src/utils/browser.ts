import { ClientFunction } from 'testcafe';

export const goBack = (t: TestController): Promise<void> => ClientFunction(() => window.history.back()).with({ boundTestRun: t })();

export const getLocation = (t: TestController): Promise<string> => ClientFunction(() => window.location.href).with({ boundTestRun: t })();

export const localStorageSet = (t: TestController, key: string, val: string): Promise<void> =>
  ClientFunction((k, v) => localStorage.setItem(k, v)).with({ boundTestRun: t })(key, val);

export const localStorageGet = (t: TestController, key: string): Promise<string | null> =>
  ClientFunction(k => localStorage.getItem(k)).with({ boundTestRun: t })(key);
