import { TestControllerListener } from './test-controller-listener';

/**
 * Configures the TestController
 */
export class TestControllerConfig implements TestControllerListener {
  public async onTestControllerSet(tc: TestController) {
    await tc.maximizeWindow();
  }
}
