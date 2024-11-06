const assert = require('assert');
const app = require('../../src/app');

describe('\'race\' service', () => {
  it('registered the service', () => {
    const service = app.service('race');

    assert.ok(service, 'Registered the service (race)');
  });
});
