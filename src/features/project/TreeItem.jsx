import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, withStyles } from 'material-ui';

const styles = theme => ({
  gutters: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    gutters: PropTypes.string.isRequired,
  }).isRequired,
};

const TreeItem = ({ classes, children, ...props }) => (
  <ListItem
    dense
    button
    disableRipple
    classes={classes}
    {...props}
  >
    {children}
  </ListItem>
);

TreeItem.propTypes = propTypes;

export default withStyles(styles)(TreeItem);
