import React from 'react';
import ReactDOM from 'react-dom/client';
import Buffer from 'buffer'

import {Provider} from 'react-redux'
import RootStore from '@store/Root.store'

import RazorEngineInterface from './RazorEngineInterface';

import 'simplebar/dist/simplebar.min.css';
import '@style/main.scss'

window.Buffer = window.Buffer || Buffer.Buffer

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={RootStore}>
      <RazorEngineInterface />
    </Provider>
  </React.StrictMode>
);
