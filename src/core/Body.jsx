import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject, observer, PropTypes as MobxTypes } from 'mobx-react';
import { AppBar, Tabs, withStyles } from 'material-ui';

import FileTab from 'features/files/FileTab';
import FileTabLabel from 'features/files/FileTabLabel';
import Shell from 'features/editor/Shell';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
});

const propTypes = {
  projectStore: MobxTypes.observableObject.isRequired,
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
  }).isRequired,
};

class Body extends Component {
  handleChange = (event, tabIndex) => {
    const { projectStore } = this.props;
    projectStore.setTabIndex(tabIndex);
  };

  handleClose = item => (event) => {
    const { projectStore } = this.props;
    const { files, tabIndex } = projectStore;

    const nextTabIndex = tabIndex - 1;
    const nextFileLength = files.length - 1;
    const nextTabOutOfRange = nextTabIndex < nextFileLength;

    event.stopPropagation();

    if (nextTabOutOfRange) {
      projectStore.setTabIndex(Math.max(nextTabIndex, 0));
    }

    projectStore.removeFile(item);
  };

  render() {
    const { classes, projectStore: { files, tabIndex } } = this.props;

    if (!files.length) {
      return null;
    }

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {files.map(item => (
              <FileTab
                key={item.path}
                label={(
                  <FileTabLabel
                    name={item.name}
                    onClose={this.handleClose(item)}
                  />
                )}
              />
            ))}
          </Tabs>
        </AppBar>
        <Shell file={files[tabIndex]} />
      </main>
    );
  }
}

Body.propTypes = propTypes;

const enhancer = compose(
  withStyles(styles),
  inject('projectStore'),
  observer,
);

export default enhancer(Body);
