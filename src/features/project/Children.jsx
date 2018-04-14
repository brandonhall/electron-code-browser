import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { observer, PropTypes as MobxTypes } from 'mobx-react';
import { Collapse, List, withStyles } from 'material-ui';

import Directory from './Directory';
import File from './File';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
});

const propTypes = {
  open: PropTypes.bool.isRequired,
  items: MobxTypes.observableArray.isRequired,
  classes: PropTypes.shape({
    nested: PropTypes.string.isRequired,
  }).isRequired,
};

const Children = ({ items, open, classes }) => (
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      {items.map((item) => {
        const props = { item, key: item.path, className: classes.nested };
        return item.type === 'directory' ?
          <Directory {...props} /> :
          <File {...props} />;
      })}
    </List>
  </Collapse>
);

Children.propTypes = propTypes;

const enhancers = compose(
  withStyles(styles),
  observer,
);

export default enhancers(Children);
