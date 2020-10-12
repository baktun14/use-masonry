import React, { useState, useEffect } from "react";
import "./App.css";
import { Header } from "../header/Header";
import { Masonry } from "../masonry/Masonry";
import { ThemeProvider } from "@chakra-ui/core";
import { MasonryItemModel } from "../../hooks/useMasonry";
import { sleep } from "../../utils/timerUtils";
import { getAPIItems } from "../../utils/data";

export function App() {
  const [numberOfColumns, setNumberOfColumns] = useState<number>(3);
  const [items, setItems] = useState<Array<MasonryItemModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    await sleep(1000);

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

        <Masonry
          numberOfColumns={numberOfColumns}
          items={items}
          isLoading={isLoading}
        />
      </div>
    </ThemeProvider>
  );
}
