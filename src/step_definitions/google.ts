import { expect } from 'chai';
import { Given, When, Then } from 'cucumber';
import { $ } from '../utils';

let t: TestController;

Given(/^I am open Google's search page$/, async function() {
  t = await this.waitForTestController();
  return t.navigateTo('http://google.com');
});

When(/^I am typing my search request "(.*)" on Google$/, async (text) => {
  return t.typeText($('input[name="q"]'), text);
});

Then(/^I am pressing "(.*)" key on Google$/, async (text) => {
  return t.pressKey(text);
});

Then(/^I should see that the first Google's result is "(.*)"$/, async (text) => {
  const firstLink = $('#rso').find('a');
  const found = await firstLink.innerText;

  expect(found).to.include(text);
});
