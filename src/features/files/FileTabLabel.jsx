import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import { Close } from 'material-ui-icons';

const styles = theme => ({
  close: {
    position: 'absolute',
    right: theme.spacing.unit,
    fontSize: theme.typography.pxToRem(18),
  },
});

const propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

const FileTabLabel = ({ classes, name, onClose }) => (
  <span>
    {name}
    <Close className={classes.close} onClick={onClose} />
  </span>
);

FileTabLabel.propTypes = propTypes;

export default withStyles(styles)(FileTabLabel);
