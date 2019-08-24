import { open, containsText } from '~/test-utils/e2e';

describe('homepage', () => {
  beforeAll(async () => {
    await open('/');
  });

  test('it should render correctly', async () => {
    expect(containsText('Expenses')).toBeTruthy();
  });
});
