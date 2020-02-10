import React from 'react';
import Routes from './routes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

import Header from './components/header'

import './styles.css'

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes />

    </div >
  );
}

export default App;