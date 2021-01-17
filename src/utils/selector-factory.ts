import { Selector } from 'testcafe';
import { TestControllerListener } from '../support/test-controller-listener';
import { testControllerHolder } from '../support/test-controller-holder';

/**
 * Internal factory that creates an extended Selector when running with Cucumber.
 * Holds an instance of TestCafes' TestController to be able to write short (synchronous) selectors.
 * <pre>
 * $('a.fancy-button').count // synchronous way - requires instance of TestController
 * vs
 * (await $('a.fancy-button')).count // asynchronous way - using {@link testControllerHolder#get} internally
 * </pre>
 */
class SelectorFactory {
  private static t?: TestController;

  public static init(): void {
    const onTestControllerSet = (tc: TestController): void => SelectorFactory.setTestController(tc);
    const listener = (): TestControllerListener => ({ onTestControllerSet });
    testControllerHolder.register(listener);
  }

  public static setTestController(t: TestController): void {
    if (!SelectorFactory.t) {
      SelectorFactory.t = t;
    }
  }

  public static destroy(): void {
    SelectorFactory.t = undefined;
  }

  /**
   * Main method of the factory.
   * Creates a new instance of the Selector which works with TestCafe and Cucumber (needs "boundTestRun" property).
   *
   * @param init See Selector
   * @param options See Selector
   */
  public static of(
    init: string | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection) | Selector | NodeSnapshot | SelectorPromise,
    options?: SelectorOptions
  ): Selector {
    const selector = Selector(init, options);

    return SelectorFactory.hasTestController() ? SelectorFactory.bind(selector) : selector;
  }

  private static hasTestController(): boolean {
    return !!SelectorFactory.t;
  }

  private static bind(selector: Selector): Selector {
    return Selector(selector).with({ boundTestRun: SelectorFactory.t });
  }
}

/**
 * Initialized and destroys the {@link SelectorFactory}.
 * See support/hooks.ts
 */
export class SelectorFactoryInitializer {
  public static init(): void {
    SelectorFactory.init();
  }

  public static destroy(): void {
    SelectorFactory.destroy();
  }
}

/**
 * The transparent custom selector that works with tests run by TestCafe and Cucumber.
 * It basically wrapps the Selector function and appends the "boundTestRun" property if needed.
 * see {@link SelectorFactory#of}
 *
 * @param init See Selector
 * @param options See Selector
 */
export function $(
  init: string | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection) | Selector | NodeSnapshot | SelectorPromise,
  options?: SelectorOptions
): Selector {
  return SelectorFactory.of(init, options);
}

export function selectByTestId(value: string): Selector {
  return $(`*[data-testid="${value}"]`);
}
