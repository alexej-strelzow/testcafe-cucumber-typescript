import { expect } from 'chai';
import { Given, When, Then } from '@cucumber/cucumber';
import { GithubPage } from '../page_objects/github.po';
import { Ctx } from '../support/world';

const githubPage: GithubPage = new GithubPage();

Given(/^I open the GitHub page$/, async function (this: Ctx) {
  return (await this.getTestController()).navigateTo(githubPage.url());
});

When(/^I am typing my search request "([^"]*)" on GitHub$/, async function (this: Ctx, text) {
  return (await this.getTestController()).typeText(githubPage.searchButton(), text);
});

Then(/^I am pressing (.*) key on GitHub$/, async function (this: Ctx, text) {
  return (await this.getTestController()).pressKey(text);
});

Then(/^I should see that the first GitHub's result is (.*)$/, async function (text) {
  expect(await githubPage.firstSearchResult().textContent).to.contain(text);
});
