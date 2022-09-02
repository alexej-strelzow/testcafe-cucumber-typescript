# TestCafe-Cucumber-TypeScript

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/AStrelzow)

Welcome to this working example of TestCafe + Cucumber + TypeScript.
You can take this project as it is and use it to run your End-to-End (E2E) Tests.

For demo purposes, three feature files are included (see `src/features`):
 - `alexej.feature`: does NOT pass (configured retry-mechanism will re-run the test twice)
 - `feature-with-examples.feature`: does pass
 - `github.feature`: does pass 
 
## Run the project

I've provided scripts for Linux & OSx and for Windows.
For Linux/OSx run `npm run tests` and for Windows run `npm run tests:win`.

After the test has finished you will see the following content inside the reports folder:
- `cucumber_reports.html`: HTML report with all the info + screenshots
- `cucumber_report.json`: JSON report with embedded screenshots in base64
- `cucumber_report.pdf`: PDF report with tabular visualization of test run
- `cucumber_report.xml`: XML report with basic content

***Note***:
The `out` directory contains screenshots, as *.png files, of the page where the error occurred

Click [here](http://cucumber-report.surge.sh/cucumber_report.html) to view the HTML Report with screenshots of failed tests.
And [here](http://serenity-report.surge.sh/) to view the Serenity HTML Report. Unfortunately this report does not
contain screenshots of failed tests as there is no TestCafe integration (only Protractor).

If you want to publish your report via cucumber-js you can run: `npm run tests:publish`
and visit the URL that gets printed out after all test finished.

### Serenity

***Warning***: Does not support parallel test execution! In this case you have to rely on the conventional HTML or PDF report.

*Note*: To be able to generate the report you have to have a Java Runtime installed as the serenity bdd cli is a jar file.

Also make sure that your Scenarios and Scenario Outlines have a prover name (string after the ":"),
as otherwise the report generator will ignore the generated JSON files (empty name and title).

There is no better report than the Serenity BDD Test Report. To generate the HTML report after a test run
make sure to have the `serenity-bdd cli` installed (install via `npm run serenity:install`).
Then simply run `npm run serenity:report` to convert the serenity JSON reports (see `reports/serenity/json`)
to html (see `reports/serenity/html`).

### CI/CD

Check out the provided `Dockerfile` and `e2e-testing.sh`-script.

## Project Features

This project gives you the following features:
- specify tests with Gherkin Syntax (if using IntelliJ or WebStorm, please install the CucumberJs Plugin!)
- write test steps with TypeScript and TestCafe
- run tests with CucumberJs
- written tests work with TestCafe and CucumberJs (own lean selector $)
- take screenshot on fail (+ append to report)
- Rich reporting:
  - Cucumber reporting (JSON, HTML, junit)
  - Custom  reporting (PDF)
  - SerenityJS reporting (HTML)
- Run tests in parallel (see `npm run tests:parallel`)
- Live Mode (re-run tests on code/feature change)
- Multiple environments/configs supported:
  - NODE_ENV=xxx in front of run-script (`package.json`) 
- Skip Scenarios or features via `@skip`-tag
- Publish Report to `https://reports.cucumber.io/` via `publish`-switch (new since V7)
- Slack Hook ready (see `scripts/slack-hook`)

When writing tests with Cucumber I chose to use chai as the assertion library.
In that case failing scenarios will not affect following scenarios (in contrary to the TestCafe assertions).

On top of all of that you get a nice dev experience with:
- prettier
- eslint
- commit hooks

I hope you enjoy this project.

## Development

Tests are described in feature files (see `./src/features`).
Each written line under "Scenario" must start with either `GIVEN`, `WHEN`, `THEN` or `AND` and has an underlying implementation (see `./src/step_definitions`).
Each line gets matched to the respective function via regex. Therefor, it is important to not have two functions with the same text, 
as this is ambiguous and will result in an error.

### Work in Progress (WIP)

When you are developing a test, just tag the scenario or feature with `@wip` and comment in `TAGS=@wip` in your config file.
This command will collect all features or scenarios with that tag and run them.
Example:
```
@wip
@google
Feature: Searching for TestCafe by Google

  I want to find TestCafe repository by Google search

  Scenario: Searching for TestCafe by Google
    Given I am open Google's search page
    When I am typing my search request "github TestCafe" on Google
    Then I am pressing "enter" key on Google
    Then I should see that the first Google's result is "DevExpress/testcafe: A Node.js tool to automate end"
```

### Work in Live Mode

During development you might not want to always restart the test you are working on.
You can enable live mode in your config via `LIVE_MODE=on` and combine that with `TAGS=@wip` to work on a single scenario.

***Note***: 
No report will be generated in live mode and no retry is going to get executed as well!
Live-Mode has been implemented using nodemon, which will react to changes of `*.ts`- and `*.feature`-files within the src directory and re-run the tests.

### function vs arrow function

Always use `async function` because then you will always be in the scope of our `CustomWorld` (see `./src/support/world.ts`) and
have function at your hand like `getTetsController()` to obtain an instance of TestCafes' `TestController`.

In this way every step is autonomous and does not rely on any state set up in the `GIVEN` function.

### FYI

#### Why node-fetch v2 is used

Because v2 works with commonjs, but v3 not. (See `tsconfig.json`).
If you install v3 you will get this error:

```
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: .../node_modules/node-fetch/src/index.js
require() of ES modules is not supported.
```

## Feedback

If you have any feedback, please write me: alexej.strelzow@gmail.com

## License

MIT
