import React from 'react';
import PropTypes from 'prop-types';
import { ListItemText, withStyles } from 'material-ui';

const styles = () => ({
  root: {
    padding: 0,
  },
});

const propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

const TreeItemText = ({ classes, ...props }) => (
  <ListItemText classes={classes} {...props} />
);

TreeItemText.propTypes = propTypes;

export default withStyles(styles)(TreeItemText);
