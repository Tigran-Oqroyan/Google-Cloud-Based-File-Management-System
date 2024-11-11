// src/App.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FileCard from "./components/FIleCard";
import Navbar from "./components/Navbar";
import UploadedFiles from "./components/UploadedFiles";
import { increment, decrement } from "./slices/exampleSlice";
import styles from "./App.module.scss";
import Sidebar from "./components/Sidebar";

function App() {
  const count = useSelector((state) => state.example.value);
  const dispatch = useDispatch();

  const files = [
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
  ];

  const file = {
    name: "marry_christmas_happy_new_year.png",
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.innerLayout}>
        <Navbar />
        <UploadedFiles files={files} />
      </div>
    </div>
  );
}

export default App;
