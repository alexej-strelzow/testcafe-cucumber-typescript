import { TestControllerListener } from './test-controller-listener';

/**
 * Configures the TestController
 */
const onTestControllerSet = async (tc: TestController): Promise<void> => await tc.maximizeWindow();
export const testControllerConfig = (): TestControllerListener => ({ onTestControllerSet });
