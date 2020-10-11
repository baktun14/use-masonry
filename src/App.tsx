import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/header/Header";
import { Masonry } from "./components/masonry/Masonry";
import { ThemeProvider } from "@chakra-ui/core";

export function App() {
  const [numberOfColumns, setNumberOfColumns] = useState<number>(3);

  return (
    <ThemeProvider>
      <div className="App">
        <Header
          updateNumberOfColumns={setNumberOfColumns}
          numberOfColumns={numberOfColumns}
        />

        <Masonry numberOfColumns={numberOfColumns} />
      </div>
    </ThemeProvider>
  );
}
