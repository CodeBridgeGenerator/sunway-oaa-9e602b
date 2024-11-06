const assert = require('assert');
const app = require('../../src/app');

describe('\'relegion\' service', () => {
  it('registered the service', () => {
    const service = app.service('relegion');

    assert.ok(service, 'Registered the service (relegion)');
  });
});
