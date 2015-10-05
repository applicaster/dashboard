import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Grid from '../Grid';
import Header from '../Header';

injectTapEventPlugin();


export default React.createClass({
  propTypes: {
    getBoxsListAction: React.PropTypes.func,
    handleDrop: React.PropTypes.func,
    boxList: React.PropTypes.array,
    inEditMode: React.PropTypes.bool,
    toggleEditMode: React.PropTypes.func,
  },

  componentDidMount() {
    this.props.getBoxsListAction();
  },

  render() {
    const { toggleEditMode, handleDrop, inEditMode, boxList } = this.props;
    const styles = {
      app: {
        transition: 'background-color 0.5s ease',
        backgroundColor: (inEditMode) ? '#444' : '#ccc',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
      },
      container: {
        marginTop: 20,
      },
    };
    return (
      <div style={styles.app}>
        <Header
          toggleEditMode={toggleEditMode} />
        <Grid
          handleDrop={handleDrop}
          inEditMode={inEditMode}
          boxList={boxList}/>
      </div>
    );
  },
});
