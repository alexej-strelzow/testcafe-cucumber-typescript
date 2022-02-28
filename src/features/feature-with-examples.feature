# Example with scenario outline
# You can also just execute 1 example by tagging it (+ TAGS=@wip in `.env.development`)

@github
Feature: Searching for multiple things on GitHub

  I want to find some repositories on GitHub

  Scenario Outline: Searching for multiple things on GitHub
    Given I open the GitHub page
    When I am typing my search request "<Search>" on GitHub
    And I am pressing enter key on GitHub
    Then I should see that the first GitHub's result is DevExpress/testcafe
    Examples:
      |Search|
      |TestCafe|
      |Cucumber|
    @wip
    Examples:
      |Search|
      |Typescript|
