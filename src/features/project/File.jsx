import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject, observer, PropTypes as MobxTypes } from 'mobx-react';

import { ListItemIcon } from 'material-ui';
import { InsertDriveFile } from 'material-ui-icons';

import TreeItem from './TreeItem';
import TreeItemText from './TreeItemText';

const propTypes = {
  item: MobxTypes.observableObject.isRequired,
  projectStore: MobxTypes.observableObject.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const File = ({ className, item, projectStore }) => (
  <div className={className}>
    <TreeItem
      key={item.path}
      onClick={() => projectStore.addFile(item)}
    >
      <ListItemIcon>
        <InsertDriveFile />
      </ListItemIcon>
      <TreeItemText primary={item.name} />
    </TreeItem>
  </div>
);

File.propTypes = propTypes;
File.defaultProps = defaultProps;

const enhancers = compose(
  inject('projectStore'),
  observer,
);

export default enhancers(File);
