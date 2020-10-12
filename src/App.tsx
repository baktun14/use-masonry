import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/header/Header";
import { Masonry } from "./components/masonry/Masonry";
import { ThemeProvider } from "@chakra-ui/core";
import { MasonryItemModel } from "./hooks/useMasonry";
import { sleep } from "./utils/timerUtils";
import { getAPIItems } from "./utils/data";

export function App() {
  const [numberOfColumns, setNumberOfColumns] = useState<number>(3);
  const [items, setItems] = useState<Array<MasonryItemModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    await sleep(300);

    const newItems = items.concat(getAPIItems());

    setItems(newItems);
    setIsLoading(false);
  };

  const updateItems = (newItems: Array<MasonryItemModel>) => {
    setItems(newItems);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Header
          updateNumberOfColumns={setNumberOfColumns}
          numberOfColumns={numberOfColumns}
          addMoreItems={loadItems}
          isLoading={isLoading}
          updateItems={updateItems}
          items={items}
        />

        <Masonry numberOfColumns={numberOfColumns} items={items} />
      </div>
    </ThemeProvider>
  );
}
