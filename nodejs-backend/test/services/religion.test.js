const assert = require('assert');
const app = require('../../src/app');

describe('\'religion\' service', () => {
  it('registered the service', () => {
    const service = app.service('religion');

    assert.ok(service, 'Registered the service (religion)');
  });
});
