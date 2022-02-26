import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Context, store} from './context/index';

ReactDOM.render(
  <Context.Provider value={{
    store
  }}>
    <div className='App'>
      <App />
    </div>
  </Context.Provider>,
  document.getElementById('root')
);
