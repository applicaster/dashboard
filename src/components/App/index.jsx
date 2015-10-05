import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Grid from '../Grid';
import Header from '../Header';

injectTapEventPlugin();

const styles = {
  app: {
    backgroundColor: '#ccc',
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

export default React.createClass({
  propTypes: {
    getBoxsListAction: React.PropTypes.func,
    handleDrop: React.PropTypes.func,
    boxList: React.PropTypes.array,
  },

  componentDidMount() {
    this.props.getBoxsListAction();
  },

  render() {
    return (
      <div style={styles.app}>
        <Header/>
        <Grid
          handleDrop={this.props.handleDrop}
          boxList={this.props.boxList}/>
      </div>
    );
  },
});
