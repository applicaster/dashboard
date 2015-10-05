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
      inEditMode: false,
    }
  );
  const aElement = vdom.props.children._store.props.children[1];
  const href = 'http://example.com';
  assert.equal(
    aElement.type,
    'a',
    'Should be linkable.'
  );
  assert.equal(
    aElement._store.props.href,
    href,
    'Should link to given href prop URL.'
  );
  assert.end();
});

