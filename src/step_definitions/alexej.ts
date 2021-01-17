import { expect } from 'chai';
import { Given, When, Then } from '@cucumber/cucumber';
import { $ } from '../utils';
import { Ctx } from '../support/world';

Given(/^I am on Alexej's homepage$/, async function (this: Ctx) {
  return (await this.getTestController()).navigateTo('https://strelzow.dev');
});

When(/^I press on "(.*)"$/, async function (this: Ctx, text: string) {
  return (await this.getTestController()).click($('a[href="/about"]'));
});

Then(/^I see a handsome guy$/, async function () {
  expect(true).to.be.false;
});
