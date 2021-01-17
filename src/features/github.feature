@github
Feature: Searching for TestCafe on GitHub

  I want to find TestCafe repository on GitHub

  Scenario: Searching for TestCafe on GitHub
    Given I open the GitHub page
    When I am typing my search request "TestCafe" on GitHub
    And I am pressing enter key on GitHub
    Then I should see that the first GitHub's result is DevExpress/testcafe

  Scenario: Searching for TestCafe on GitHub
    Given I open the GitHub page
    When I am typing my search request "TestCafe Cucumber Typescript" on GitHub
    And I am pressing enter key on GitHub
    Then I should see that the first GitHub's result is alexej-strelzow/testcafe-cucumber-typescript

  @skip
  Scenario: Searching for TestCafe on GitHub
    Given I open the GitHub page
    When I am typing my search request "alexej-strelzow" on GitHub
    And I am pressing enter key on GitHub
    Then I should see that the first GitHub's result is awesome dude
