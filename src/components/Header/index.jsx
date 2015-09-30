import React from 'react';
import {
  AppBar,
  Toggle,
} from 'material-ui';

const logoSrc = require('./images/logo.png');

const styles = {
  appBarIcon: {
    backgroundImage: `url(${logoSrc})`,
    backgroundSize: 'cover',
    width: 150,
    height: 26,
    marginTop: 10,
  },
};

export default React.createClass({
  render() {
    return (
      <AppBar
        style={
          {backgroundColor: '#fff'}
        }
        title="Applicaster"
        iconElementLeft={
          <div style={styles.appBarIcon}/>
        }
        iconElementRight={
          <Toggle
          onToggle={this._onToggle}
          ref="isToggeled"
          name="toggleName1"/>
        }/>
    );
  },
});
