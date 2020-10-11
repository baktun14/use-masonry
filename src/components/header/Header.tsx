import React, { useState } from "react";
import "./Header.css";
import { Button, Input } from "@chakra-ui/core";

interface IHeaderProps {
  numberOfColumns: number;
  updateNumberOfColumns: (numberOfColumns: number) => any;
  addMoreItems: () => any;
}

export function Header({
  updateNumberOfColumns,
  numberOfColumns,
  addMoreItems,
}: IHeaderProps) {
  return (
    <header className="App-header">
      <p>React hook: use-masonry</p>

      <div>
        <Input
          value={numberOfColumns}
          onChange={(event) =>
            updateNumberOfColumns(Number(event.currentTarget.value))
          }
          type="number"
          min={1}
          max={12}
        />
        <Button
          onClick={() => addMoreItems()}
          variantColor="teal"
          variant="solid"
        >
          Add more items
        </Button>
      </div>
    </header>
  );
}
