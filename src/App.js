import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./Main";
import Download from "./Download/Download";

function App() {

  useEffect(() => {
    document.title = 'MasterLab';
  },[])

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