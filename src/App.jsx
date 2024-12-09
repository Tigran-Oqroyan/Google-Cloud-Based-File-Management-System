// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UploadedFiles from "./components/UploadedFiles/index";
import FileUpload from "./components/FileUpload/index";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/files" element={<UploadedFiles />} />
      </Routes>
    </Router>
  );
}

export default App;
