import React, { useState } from "react";
import "./Header.css";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/core";

interface IHeaderProps {
  numberOfColumns: number;
  isLoading: boolean;
  updateNumberOfColumns: (numberOfColumns: number) => any;
  addMoreItems: () => any;
}

export function Header({
  updateNumberOfColumns,
  numberOfColumns,
  addMoreItems,
  isLoading,
}: IHeaderProps) {
  return (
    <header className="App-header">
      <Heading as="h1" size="2xl">
        React hook: use-masonry
      </Heading>

      <Flex flexDirection="column" align="center" padding={15}>
        <FormControl>
          <FormLabel htmlFor="numOfCols">Number of colums</FormLabel>
          <Input
            value={numberOfColumns}
            onChange={(event) =>
              updateNumberOfColumns(Number(event.currentTarget.value))
            }
            type="number"
            id="numOfCols"
            min={1}
            max={12}
          />
        </FormControl>

        <Box marginTop={15}>
          <Button
            onClick={() => addMoreItems()}
            variantColor="teal"
            variant="solid"
            isLoading={isLoading}
          >
            Add more items
          </Button>
        </Box>
      </Flex>
    </header>
  );
}
