import { expect } from 'chai';
import { Given, When, Then } from 'cucumber';
import { GithubPage } from '../page_objects/github.po';

let t: TestController;
const githubPage: GithubPage = new GithubPage();

Given(/^I open the GitHub page$/, async function() {
  t = await this.waitForTestController();
  return t.navigateTo(githubPage.url());
});

When(/^I am typing my search request "([^"]*)" on GitHub$/, async (text) => {
  await t.typeText(githubPage.searchButton(), text);
});

Then(/^I am pressing (.*) key on GitHub$/, async (text) => {
  await t.pressKey(text);
});

Then(/^I should see that the first GitHub's result is (.*)$/, async (text) => {
  expect(githubPage.firstSearchResult().innerText).to.contain(text);
});
