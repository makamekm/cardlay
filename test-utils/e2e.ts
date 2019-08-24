import { toMatchImageSnapshot } from 'jest-image-snapshot';
import 'jest-environment-puppeteer';

jest.setTimeout(60000);
expect.extend({ toMatchImageSnapshot });

export const find = async (selector) => {
  await page.waitForSelector(selector);
  return page.$(selector);
};

export const findAll = async (selector) => {
  await page.waitForSelector(selector);
  return page.$$(selector);
};

export const containsText = async (text, wrapperSelector) => {
  const textSelector = `//text()[contains(.,'${text}')]`;
  const wrapper = wrapperSelector ? await find(wrapperSelector) : page;
  await page.waitForXPath(textSelector);
  const matches = await wrapper!.$x(textSelector);
  return matches.length > 0;
};

export const open = async url => {
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(`http://${process.env.HOST}:${process.env.PORT}${url}`, { waitUntil: `domcontentloaded` });
  await page.waitFor(1000);
};
