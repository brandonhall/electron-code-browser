import React, { Component } from 'react';
import { compose } from 'recompose';
import { observer, PropTypes as MobxTypes } from 'mobx-react';
import fs from 'fs';

import CodeMirror from 'components/CodeMirror';

const propTypes = {
  file: MobxTypes.observableObject.isRequired,
};

class Shell extends Component {
  render() {
    const { file: { path, extension } } = this.props;
    const code = fs.readFileSync(path, 'utf8');

    return (
      <CodeMirror key={path} code={code} extension={extension} />
    );
  }
}

Shell.propTypes = propTypes;

const enhancer = compose(
  observer,
);

export default enhancer(Shell);
