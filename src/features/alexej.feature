@google
Feature: Searching for THE handsome devil

  I want to verify if the guy who wrote this framework is handsome

  Scenario: Verifying Alexej's handsomeness
    Given I am on Alexej's homepage
    When I press on "About Me"
    # below test fails on purpose - check out the report ;-)
    Then I see a handsome guy
