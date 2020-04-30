import { expect } from 'chai';
import { Given, When, Then } from 'cucumber';
import { $ } from '../utils';

Given(/^I am open Google's search page$/, async function () {
  return (await this.getTestController()).navigateTo('http://google.com');
});

When(/^I am typing my search request "(.*)" on Google$/, async function (text: string) {
  return (await this.getTestController()).typeText($('input[name="q"]'), text);
});

Then(/^I am pressing "(.*)" key on Google$/, async function (text: string) {
  return (await this.getTestController()).pressKey(text);
});

Then(/^I should see that the first Google's result is "(.*)"$/, async function (text: string) {
  const firstLink = $('#rso').find('a');
  const found = await firstLink.innerText;

  expect(found).to.include(text);
});
