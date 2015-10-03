import React from 'react';
import forEach from 'lodash/collection/forEach';
import find from 'lodash/collection/find';
import Square from '../Square';
import Box from '../Box';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

const Grid = React.createClass({

  propTypes: {
    boxList: React.PropTypes.array,
    handleDrop: React.PropTypes.func,
  },

  _renderSquare(boxList, index) {
    const MAX_ITEMES_IN_ROW = 4;
    const box = find(boxList, {order: index});
    const myBox = (box) ?
       <Box
          key={index}
          info={box}
       /> :
       <div>{index}</div>;

    return (
      <div
        key={index}
        style={{
          width: `${100 / MAX_ITEMES_IN_ROW}%`,
          display: 'flex',
        }}>
        <Square
          handleDrop={this.props.handleDrop}
          index={index}>
          {myBox}
        </Square>
      </div>
    );
  },

  render() {
    const styles = {
      content: {
        maxWidth: 1100,
        margin: '10px auto 0 auto',
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    const squares = [];
    forEach(this.props.boxList, (item, index) => {
      squares.push(this._renderSquare(this.props.boxList, index));
    });
    return (
      <div
        style={styles.content}>
        {squares}
      </div>
    );
  },
});

export default DragDropContext(HTML5Backend)(Grid);
