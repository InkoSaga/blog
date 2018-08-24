import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store, { history } from './store';
import { darkTheme, prepareBackground, background } from './Theme';
import 'typeface-roboto';
//import { BrowserRouter } from 'react-router-dom';

const fullSize = (dom: HTMLElement) => {
  dom.style.width = '100%';
  dom.style.height = '100%';
}

const dom = document.getElementById('app') as HTMLElement;

prepareBackground().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    dom
  );
  fullSize(document.documentElement);
  fullSize(document.body);
  fullSize(dom);
  document.body.style.background = background.acrylic0;
});

if (module.hot) {
  module.hot.accept();
}
