import React from 'react';

export default React.createClass({
  propTypes: {
    reduxHeartbeatCB: React.PropTypes.func,
    heartbeat: React.PropTypes.string,
  },

  componentDidMount() {
    this.props.reduxHeartbeatCB();
  },

  render() {
    return <div>Heartbeat status: {this.props.heartbeat}</div>;
  },
});
