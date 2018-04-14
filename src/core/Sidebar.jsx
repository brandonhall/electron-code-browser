import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject, observer, PropTypes as MobxTypes } from 'mobx-react';
import { Button, Drawer, withStyles } from 'material-ui';
import { remote } from 'electron';

import FolderList from 'features/project/FolderList';

const styles = ({ mixins }) => ({
  drawerPaper: {
    position: 'relative',
    overflowX: 'auto',
    minWidth: 240,
  },
  toolbar: mixins.toolbar,
});

const propTypes = {
  projectStore: MobxTypes.observableObject.isRequired,
  classes: PropTypes.shape({
    drawerPaper: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
  }).isRequired,
};

class Sidebar extends Component {
  openDialog = () => {
    const { projectStore } = this.props;
    const { dialog } = remote;
    const options = { properties: ['openDirectory'] };

    dialog.showOpenDialog(options, projectStore.setDirectory);
  };

  renderSelector() {
    return (
      <Button onClick={this.openDialog}>
        Open Folder...
      </Button>
    );
  }

  renderTree() {
    const { projectStore } = this.props;

    return (
      <FolderList onChange={this.openDialog} tree={projectStore.tree} />
    );
  }

  render() {
    const { classes, projectStore } = this.props;
    const drawerClasses = { paper: classes.drawerPaper };
    const isSet = projectStore.tree.name;

    return (
      <Drawer variant="permanent" classes={drawerClasses}>
        <div className={classes.toolbar} />
        {isSet ? this.renderTree() : this.renderSelector()}
      </Drawer>
    );
  }
}

Sidebar.propTypes = propTypes;

const enhancers = compose(
  withStyles(styles),
  inject('projectStore'),
  observer,
);

export default enhancers(Sidebar);
