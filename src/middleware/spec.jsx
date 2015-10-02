// see http://rackt.github.io/redux/docs/recipes/WritingTests.html
// in the Middleware section

import test from 'tape';
import parseMiddleware from './parse';

const axiosMockSuccess = () => {
  return Promise.resolve({data: {results: []}});
};

const action = {
  type: 'GETBOXLIST',
};

const next = (actionOutput) => {
  test('parseMiddleware', (assert) => {
    assert.deepEqual(
      actionOutput.boxList,
      [],
      'Should return array of boxes.'
    );
    assert.end();
  });
};

parseMiddleware(axiosMockSuccess, {dashboardSettings: {}})()(next)(action);
