import { TestControllerListener } from './test-controller-listener';

export interface TestControllerHolder {
  capture(t: TestController): Promise<void>;
  register(fn: () => TestControllerListener): void;
  destroy(): void;
  get(): Promise<TestController>;
}

class TestControllerHolderImpl implements TestControllerHolder {
  private static instance: TestControllerHolder;

  // TODO: intended not to be static
  private static testController?: TestController;
  private static testControllerListener: TestControllerListener[] = [];
  private static captureResolver: any;
  private static getResolver: any;

  private constructor() {}

  public static getInstance(): TestControllerHolder {
    if (!TestControllerHolderImpl.instance) {
      TestControllerHolderImpl.instance = new TestControllerHolderImpl();
    }
    return TestControllerHolderImpl.instance;
  }

  public capture(t: TestController): Promise<any> {
    TestControllerHolderImpl.testController = t;

    TestControllerHolderImpl?.testControllerListener.forEach(l => l.onTestControllerSet(t));

    if (TestControllerHolderImpl.getResolver) {
      TestControllerHolderImpl.getResolver(t);
    }

    return new Promise(resolve => (TestControllerHolderImpl.captureResolver = resolve));
  }

  public register(fn: () => TestControllerListener): void {
    TestControllerHolderImpl?.testControllerListener.push(fn());
  }

  public destroy(): void {
    TestControllerHolderImpl.testController = undefined;

    if (TestControllerHolderImpl.captureResolver) {
      TestControllerHolderImpl.captureResolver();
    }
  }

  public get(): Promise<TestController> {
    return new Promise(resolve => {
      if (TestControllerHolderImpl.testController) {
        // already captured
        resolve(TestControllerHolderImpl.testController);
      } else {
        // resolve (later) when captured
        TestControllerHolderImpl.getResolver = resolve;
      }
    });
  }
}

export const testControllerHolder: TestControllerHolder = TestControllerHolderImpl.getInstance();
