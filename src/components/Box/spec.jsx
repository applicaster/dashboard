import test from 'tape';
import React from 'react/addons';
import sd from 'skin-deep';
import BoxRow from './';

const Box = BoxRow.DecoratedComponent;

const shallowRender = (component, props) => {
  const tree = sd.shallowRender(React.createElement(Box, props));
  return {
    instance: tree.getMountedInstance(),
    vdom: tree.getRenderOutput(),
  };
};

test('Box Component', (assert) => {
  const {vdom} = shallowRender(
    Box,
    {
      info: {linkUrl: 'http://example.com'},
      connectDragSource: (component) =>  {return component;},
    }
  );
  const href = 'http://example.com';
  assert.equal(
    vdom.props.children._store.props.children.type,
    'a',
    'Should be linkable.'
  );
  assert.equal(
    vdom.props.children._store.props.children._store.props.href,
    href,
    'Should link to given href prop URL.'
  );
  assert.end();
});

