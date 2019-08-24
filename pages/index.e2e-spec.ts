import { open } from '~/test-utils/e2e';

describe('Homepage', () => {
  beforeAll(async () => {
    await open('/');
  });

  test('It should render correctly.', async () => {
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });
});
