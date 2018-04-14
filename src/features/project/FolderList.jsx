import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { observer, PropTypes as MobxTypes } from 'mobx-react';

import { IconButton, List, ListSubheader, withStyles } from 'material-ui';
import { ModeEdit } from 'material-ui-icons';

import Directory from './Directory';

const styles = theme => ({
  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.unit,
    paddingRight: 0,
  },
  button: {
    '@global svg': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
});

const propTypes = {
  onChange: PropTypes.func.isRequired,
  tree: MobxTypes.observableObject.isRequired,
  classes: PropTypes.shape({
    subHeader: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
};

class FolderList extends Component {
  static propTypes = propTypes;

  renderSubHeader() {
    const { classes, onChange, tree: { name } } = this.props;

    return (
      <ListSubheader className={classes.subHeader} component="div">
        {name}
        <IconButton className={classes.button} size="small" onClick={onChange}>
          <ModeEdit />
        </IconButton>
      </ListSubheader>
    );
  }

  render() {
    const { tree } = this.props;

    return (
      <List component="nav" subheader={this.renderSubHeader()}>
        <Directory openOnMount item={tree} />
      </List>
    );
  }
}

const enhancers = compose(
  withStyles(styles),
  observer,
);

export default enhancers(FolderList);
