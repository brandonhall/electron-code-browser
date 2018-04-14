import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, PropTypes as MobxTypes } from 'mobx-react';
import { ListItemIcon } from 'material-ui';
import { Folder, ExpandLess, ExpandMore } from 'material-ui-icons';

import Children from './Children';
import TreeItem from './TreeItem';
import TreeItemText from './TreeItemText';

const propTypes = {
  item: MobxTypes.observableObject.isRequired,
  openOnMount: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
  openOnMount: false,
};

class Directory extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      open: props.openOnMount,
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  renderEmpty() {
    const { item: { name, path } } = this.props;

    return (
      <TreeItem key={path}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <TreeItemText primary={name} />
      </TreeItem>
    );
  }

  renderDirectory() {
    const { item: { name, path } } = this.props;
    const { open } = this.state;

    return (
      <TreeItem key={path} onClick={this.handleClick}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <TreeItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </TreeItem>
    );
  }

  renderDirectoryTree = () => {
    const { item } = this.props;
    const { open } = this.state;
    const directory = this.renderDirectory();

    return (
      <div key={item.path}>
        {directory}
        <Children open={open} items={item.children} />
      </div>
    );
  };

  render() {
    const { className, item } = this.props;

    return (
      <div className={className}>
        {item.children.length ? this.renderDirectoryTree() : this.renderEmpty()}
      </div>
    );
  }
}

export default observer(Directory);
