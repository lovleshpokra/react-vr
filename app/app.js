
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from 'react-router-dom';
// import createHistory from 'history/createHashHistory';

// Import root app
import App from 'containers/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// const history = createHistory();

const MOUNT_NODE = document.getElementById('app');
document.addEventListener('contextmenu', (event) => event.preventDefault());
const render = () => {
  ReactDOM.render(
      // <Router history={history}>
        <App />,
      // </Router>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
