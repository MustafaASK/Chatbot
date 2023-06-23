import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Chatbot from './Chatbot/Chatbot';

import './App.css';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  return (

    <Routes>

      <Route index path="/" element={<Chatbot/>} />

    </Routes>
    // <div className="App">
    //   <Chatbot />
    // </div>
  );
}

export default App;
