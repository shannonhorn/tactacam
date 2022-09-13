import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PhotoDetail from './components/photoDetail';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Home />} />
      <Route path='/detail/:id' element={<PhotoDetail />} />
    </Routes>
  );
}

export default App;
