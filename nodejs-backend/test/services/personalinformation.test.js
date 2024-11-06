const assert = require('assert');
const app = require('../../src/app');

describe('\'personalinformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('personalinformation');

    assert.ok(service, 'Registered the service (personalinformation)');
  });
});
