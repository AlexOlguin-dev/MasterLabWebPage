import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./Main";
import Download from "./Download/Download";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;