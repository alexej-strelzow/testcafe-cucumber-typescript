import { ClientFunction } from 'testcafe';

export const goBack = (t: TestController) => ClientFunction(() => window.history.back()).with({ boundTestRun: t })();

export const getLocation = (t: TestController) => ClientFunction(() => window.location.href).with({ boundTestRun: t })();

export const localStorageSet = (t: TestController, key, val) =>
  ClientFunction((k, v) => localStorage.setItem(k, v)).with({ boundTestRun: t })(key, val);

export const localStorageGet = (t: TestController, key) => ClientFunction(k => localStorage.getItem(k)).with({ boundTestRun: t })(key);
