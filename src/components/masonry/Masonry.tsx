import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import "./Masonry.css";
import { MasonryItemModel, useMasonry } from "../../hooks/useMasonry";
import { MasonryItem } from "../masonryItem/MasonryItem";
import { debounce } from "../../utils/debounce";
import { Box, Spinner, Flex } from "@chakra-ui/core";

interface IMasonryProps {
  numberOfColumns: number;
  masonryPadding: number;
  isLoading: boolean;
  items: Array<MasonryItemModel>;
}

export function Masonry({ numberOfColumns, items, isLoading, masonryPadding }: IMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { masonry, masonryHeight } = useMasonry(
    items,
    containerWidth,
    numberOfColumns
  );

  useLayoutEffect(() => {
    updateContainerWidth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleResize = (e: Event) => {
      updateContainerWidth();
    };

    const debouncedResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
    // eslint-disable-next-line
  }, []);

  const updateContainerWidth = useCallback(() => {
    const rect = containerRef.current.getBoundingClientRect();

    setContainerWidth(rect.width);
  }, []);

  const paddingBottom = isLoading ? 0 : 80;

  return (
    <>
      <Box
        ref={containerRef}
        id="container"
        style={{ height: `${masonryHeight + paddingBottom}px` }}
      >
        {masonry &&
          masonry.map((item, i) => {
            return <MasonryItem item={item} key={item.id} masonryPadding={masonryPadding} />;
          })}
      </Box>

      {isLoading && (
        <Flex height="80px" align="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
}
