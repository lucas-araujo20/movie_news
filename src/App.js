import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components//Menu/Menu'

import Home from './pages/Home/Home'
import Pesquisa from './pages/Pesquisa/Pesquisa'

function App() {
  return (
    <Router>
        <Menu/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
      </Routes>
    </Router>
  );
}

export default App;