import React from 'react';
import PropTypes from 'prop-types';
import { Tab, withStyles } from 'material-ui';
import { InsertDriveFile } from 'material-ui-icons';

const styles = theme => ({
  wrapper: {
    flexDirection: 'row',
  },
  labelContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
  },
  label: {
    textTransform: 'none',
    marginRight: theme.spacing.unit,
  },
});

const propTypes = {
  label: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    labelContainer: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

const FileTab = ({ classes, ...props }) => (
  <Tab
    classes={classes}
    disableRipple
    icon={<InsertDriveFile />}
    {...props}
  />
);

FileTab.propTypes = propTypes;

export default withStyles(styles)(FileTab);
