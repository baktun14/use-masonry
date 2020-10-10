import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/header/Header";
import { Masonry } from "./components/masonry/Masonry";

export function App() {
  return (
    <div className="App">
      <Header />

      <Masonry />
    </div>
  );
}
