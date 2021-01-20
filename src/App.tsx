import React from 'react';
import './App.scss';

import MainController from './controllers/main'

import {Provider} from 'react-redux'
import store from './store-redux';
function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <MainController />
      </Provider>
    </div>
  );
}

export default App;
