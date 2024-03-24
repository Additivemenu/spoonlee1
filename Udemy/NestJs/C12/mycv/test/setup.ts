// this gets run before any tests are run
import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    // ! remove the test database before each test
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {}
});
