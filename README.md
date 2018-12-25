# TestCafe-Cucumber-TypeScript

Welcome to this working example of TestCafe + Cucumber + TypeScript.

# Features

This project gives you the following features:
- specify tests with Gherkin (if using IntelliJ or WebStorm, please install the CucumberJs Plugin!)
- run tests with Cucumber
- write tests with TypeScript
- written tests work with TestCafe and Cucumber (own lean selector $)
- take screenshot on fail (+ append to report)
- TestCafe reporting (json, html)
- Cucumber reporting (json, html, junit)

When writing tests with Cucumber I chose to use chai as the assertion library.
In that case failing scenarios will not affect following scenarios (in contrary to the testcafe assertions).

On top you get a nice dev experience with:
- prettier
- tslint
- commitlint
- commit hooks

I hope you enjoy this project.

# Feedback

If you have any feedback, please write me: alexej.strelzow@gmail.com

# License

MIT
