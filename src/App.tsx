import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/header/Header";
import { Masonry } from "./components/masonry/Masonry";
import { ThemeProvider } from "@chakra-ui/core";
import { MasonryItemModel } from "./hooks/useMasonry";
import { sleep } from "./utils/timerUtils";
import { APIItems } from "./utils/data";

export function App() {
  const [numberOfColumns, setNumberOfColumns] = useState<number>(3);
  const [items, setItems] = useState<Array<MasonryItemModel>>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    await sleep(300);

    setItems(items.concat(APIItems));
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Header
          updateNumberOfColumns={setNumberOfColumns}
          numberOfColumns={numberOfColumns}
          addMoreItems={loadItems}
        />

        <Masonry numberOfColumns={numberOfColumns} items={items} />
      </div>
    </ThemeProvider>
  );
}
