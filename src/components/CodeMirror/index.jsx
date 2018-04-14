import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import codeMirror from 'codemirror';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/jsx/jsx';

const mode = {
  '': 'shell',
  '.css': 'css',
  '.scss': 'css',
  '.less': 'css',
  '.jsx': 'jsx',
  '.md': 'markdown',
  '.html': 'htmlmixed',
  '.js': 'javascript',
  '.json': 'javascript',
};

const propTypes = {
  code: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
};

class CodeMirror extends Component {
  constructor(props) {
    super(props);

    this.textArea = React.createRef();
  }

  componentDidMount() {
    const { extension } = this.props;
    const { current } = this.textArea;

    codeMirror.fromTextArea(current, {
      mode: mode[extension],
      lineNumbers: true,
    });
  }

  render() {
    const { code } = this.props;
    return (
      <div>
        <textarea ref={this.textArea} defaultValue={code} />
      </div>
    );
  }
}

CodeMirror.propTypes = propTypes;

export default observer(CodeMirror);
