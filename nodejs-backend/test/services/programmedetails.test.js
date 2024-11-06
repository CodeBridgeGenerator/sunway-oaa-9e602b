const assert = require('assert');
const app = require('../../src/app');

describe('\'programmedetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('programmedetails');

    assert.ok(service, 'Registered the service (programmedetails)');
  });
});
