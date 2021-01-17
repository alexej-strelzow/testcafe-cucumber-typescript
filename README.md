# TestCafe-Cucumber-TypeScript

Welcome to this working example of TestCafe + Cucumber + TypeScript.
You can take this project as it is and use it to run your End-to-End (E2E) Tests.

For demo purposes, two feature files are included (see `src/features`):
 - `alexej.feature`: does NOT pass (configured retry-mechanism will re-run the test twice)
 - `github.feature`: does pass 
 
## Run the project

I've provided scripts for Linux & OSx and for Windows.
For Linux/OSx run `npm run tests` and for Windows run `npm run tests:win`.

After the test has finished you will see the following content inside the reports folder:
- `cucumber_reports.html`: HTML report with all the info + screenshots
- `cucumber_report.json`: JSON report with embedded screenshots in base64
- `cucumber_report.xml`: XML report with basic content

***Note***:
The `out` directory contains screenshots, as *.png files, of the page where the error occurred

Click [here](http://cucumber-report.surge.sh/cucumber_report.html) to view the HTML Report.

If you want to publish your report via cucumber-js you can run: `npm run tests:publish`
and visit the URL that gets printed out after all test finished.

### CI/CD

Check out the provided `Dockerfile` and `e2e-testing.sh`-script.

## Project Features

This project gives you the following features:
- specify tests with Gherkin Syntax (if using IntelliJ or WebStorm, please install the CucumberJs Plugin!)
- run tests with Cucumber
- write tests with TypeScript and TestCafe
- written tests work with TestCafe and Cucumber (own lean selector $)
- take screenshot on fail (+ append to report)
- TestCafe reporting (json, html)
- Cucumber reporting (json, html, junit)
- Live Mode (re-run tests on code/feature change)
- WIP Mode (only execute tests tagged with `@wip` - work in progress; best combine with Live Mode)
- Skip Scenarios or features via `@skip`-tag
- Publish Report to `https://reports.cucumber.io/` via `publish`-switch (new since V7)

When writing tests with Cucumber I chose to use chai as the assertion library.
In that case failing scenarios will not affect following scenarios (in contrary to the TestCafe assertions).

On top you get a nice dev experience with:
- prettier
- eslint
- commit hooks

I hope you enjoy this project.

## Development

Tests are described in feature files (see `./src/features`).
Each written line under "Scenario" must start with either `GIVEN`, `WHEN`, `THEN` or `AND` and has an underlying implementation (see `./src/step_definitions`).
Each line gets matched to the respective function via regex. Therefore it is important to not have two function with the same text, 
as this is ambiguous and will result in an error.

### Work in Progress (WIP)

When you are developing a test, just tag the scenario or feature with `@wip` and execute `npm run tests:wip`.
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
You can run tests in live-mode with the following command: `npm run tests:live` or,
even better, `npm run tests:live:wip` to only run scenarios tagged with `@wip`.

***Note***: 
No report will be generated in live mode and no retry is going to get executed as well!
Live-Mode has been implemented using nodemon, which will react to changes of `*.ts`- and `*.feature`-files within the src directory and re-run the tests.

### function vs arrow function

Always use `async function` because then you will always be in the scope of our `CustomWorld` (see `./src/support/world.ts`) and
have function at your hand like `getTetsController()` to obtain an instance of TestCafes' `TestController`.

In this way every step is autonomous and does not rely on any state set up in the `GIVEN` function.

## Feedback

If you have any feedback, please write me: alexej.strelzow@gmail.com

## License

MIT
