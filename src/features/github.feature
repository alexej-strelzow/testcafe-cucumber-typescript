@github
Feature: Searching for TestCafe on GitHub

  I want to find TestCafe repository on GitHub

  Scenario: Searching for TestCafe on GitHub
    Given I open the GitHub page
    When I am typing my search request "TestCafe" on GitHub
    Then I am pressing enter key on GitHub
    # FAILS on PURPOSE -> so you can see the screenshot in the report
    Then I should see that the first GitHub's result is DevExpress/testcafe