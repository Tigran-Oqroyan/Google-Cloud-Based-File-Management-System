import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadedFiles from "./components/UploadedFiles/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadedFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
