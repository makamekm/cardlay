import { open, containsText } from '~/test-utils/e2e';

describe('homepage', () => {
  beforeAll(async () => {
    await open('/');
  });

  test('it should match screenshot', async () => {
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });
});
