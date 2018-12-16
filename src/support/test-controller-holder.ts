import { TestControllerListener } from './test-controller-listener';

const testControllerHolder = {
  testController: null,

  captureResolver: null,
  getResolver: null,
  testControllerListener: null,

  capture: (t: TestController): Promise<void> => {
    testControllerHolder.testController = t;
    testControllerHolder.testControllerListener.onTestControllerSet(t);

    if (testControllerHolder.getResolver) {
      testControllerHolder.getResolver(t);
    }

    return new Promise((resolve) => {
      testControllerHolder.captureResolver = resolve;
    });
  },

  register: (testControllerListener: TestControllerListener): void => {
    testControllerHolder.testControllerListener = testControllerListener;
  },

  free: (): void => {
    testControllerHolder.testController = null;

    if (testControllerHolder.captureResolver) {
      testControllerHolder.captureResolver();
    }
  },

  get: (): Promise<TestController> => {
    return new Promise((resolve) => {
      if (testControllerHolder.testController) {
        resolve(testControllerHolder.testController);
      } else {
        testControllerHolder.getResolver = resolve;
      }
    });
  },
};

export default testControllerHolder;
