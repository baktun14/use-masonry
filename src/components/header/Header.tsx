import React from "react";
import "./Header.css";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/core";
import { MasonryItemModel } from "../../hooks/useMasonry";
import { shuffle } from "../../utils/data";

interface IHeaderProps {
  numberOfColumns: number;
  masonryPadding: number;
  isLoading: boolean;
  items: Array<MasonryItemModel>;
  updateNumberOfColumns: (numberOfColumns: number) => any;
  updateMasonryPadding: (masonryPadding: number) => any;
  addMoreItems: () => any;
  updateItems: (items: Array<MasonryItemModel>) => void;
}

export function Header({
  numberOfColumns,
  masonryPadding,
  isLoading,
  items,
  addMoreItems,
  updateItems,
  updateNumberOfColumns,
  updateMasonryPadding,
}: IHeaderProps) {
  const shuffleItems = () => {
    const newItems = shuffle(items);
    updateItems([...newItems]);
  };

  return (
    <header className="App-header">
      <Heading as="h1" size="2xl">
        React hook: use-masonry
      </Heading>

      <Flex flexDirection="column" align="center" padding={15}>
        <Stack spacing={3}>
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

          <FormControl>
            <FormLabel htmlFor="masonryPadding">Gutter padding</FormLabel>
            <Input
              value={masonryPadding}
              onChange={(event) =>
                updateMasonryPadding(Number(event.currentTarget.value))
              }
              type="number"
              id="masonryPadding"
              min={0}
              max={20}
            />
          </FormControl>
        </Stack>

        <Flex marginTop={15} flexDirection="column">
          <Button
            onClick={() => addMoreItems()}
            variantColor="teal"
            variant="solid"
            isLoading={isLoading}
            marginBottom="5px"
          >
            Add more items
          </Button>

          <Button
            onClick={() => shuffleItems()}
            variantColor="teal"
            variant="solid"
            isLoading={isLoading}
          >
            Suffle
          </Button>
        </Flex>
      </Flex>
    </header>
  );
}
