const assert = require('assert');
const app = require('../../src/app');

describe('\'maritalStatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('maritalStatus');

    assert.ok(service, 'Registered the service (maritalStatus)');
  });
});
