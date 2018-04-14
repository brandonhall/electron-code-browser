import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, withStyles } from 'material-ui';

import Nav from './Nav';
import Sidebar from './Sidebar';
import Body from './Body';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
  }).isRequired,
};

class Layout extends Component {
  static propTypes = propTypes;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Nav />
        </AppBar>
        <Sidebar />
        <Body />
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
