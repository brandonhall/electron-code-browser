import React, { Component } from 'react';

// Mobx
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

// Styles
import { CssBaseline } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { hot } from 'react-hot-loader';

import * as stores from './stores';
import theme from './theme';
import Layout from './core/Layout';

configure({ enforceActions: true });

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default hot(module)(App);
