import { expect } from 'chai';
import { Given, When, Then } from 'cucumber';
import { GithubPage } from '../page_objects/github.po';

const githubPage: GithubPage = new GithubPage();

Given(/^I open the GitHub page$/, async function () {
  return (await this.getTestController()).navigateTo(githubPage.url());
});

When(/^I am typing my search request "([^"]*)" on GitHub$/, async function (text) {
  return (await this.getTestController()).typeText(githubPage.searchButton(), text);
});

Then(/^I am pressing (.*) key on GitHub$/, async function (text) {
  return (await this.getTestController()).pressKey(text);
});

Then(/^I should see that the first GitHub's result is (.*)$/, async function (text) {
  // FAILS on PURPOSE -> so you can see the screenshot in the report
  expect(githubPage.firstSearchResult().innerText).to.contain(text);
});
