import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import { Toolbar, Typography, withStyles } from 'material-ui';

const styles = () => ({
  flex: {
    flex: 1,
  },
});

const propTypes = {
  classes: PropTypes.shape({
    flex: PropTypes.string.isRequired,
  }).isRequired,
};

class Nav extends Component {
  static propTypes = propTypes;

  render() {
    const { classes } = this.props;

    return (
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          className={classes.flex}
        >
          Electron Code Browser
        </Typography>
      </Toolbar>
    );
  }
}

const enhancers = compose(
  withStyles(styles),
  observer,
);

export default enhancers(Nav);
