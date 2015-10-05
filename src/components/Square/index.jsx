import React from 'react';
import { DropTarget } from 'react-dnd';


const squareTarget = {
  drop(props, monitor) {
    props.handleDrop(props.index, monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const Square = React.createClass({
  propTypes: {
    isOver: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired,
    connectDropTarget: React.PropTypes.func,
  },

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div style={{
        margin: 10,
        backgroundColor: 'red',
        width: '100%',
        opacity: (isOver) ? 0.2 : 1}}>
        {this.props.children}
      </div>
    );
  },
});

export default DropTarget('BOX', squareTarget, collect)(Square);
