import test from 'tape';
import React from 'react/addons';
import sd from 'skin-deep';
import App from './';

const shallowRender = (component, props) => {
  const tree = sd.shallowRender(React.createElement(App, props));
  return {
    instance: tree.getMountedInstance(),
    vdom: tree.getRenderOutput(),
  };
};

test('App Component', (assert) => {
  const {vdom} = shallowRender(
    App,
    {heartbeat: 'OK'}
  );
  const comp = 'OK';
  assert.equal(
    vdom.props.children[1],
    comp,
    'Should return status OK'
  );
  assert.end();
});
