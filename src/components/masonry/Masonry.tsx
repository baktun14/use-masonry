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

const items: Array<MasonryItemModel> = [
  { originalWidth: 200, originalHeight: 400 },
  { originalWidth: 400, originalHeight: 300 },
  { originalWidth: 600, originalHeight: 400 },
  { originalWidth: 200, originalHeight: 300 },
  { originalWidth: 300, originalHeight: 700 },
];

interface IMasonryProps {
  numberOfColumns: number;
}

export function Masonry({ numberOfColumns }: IMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { masonry, masonryHeight } = useMasonry(
    items,
    containerWidth,
    numberOfColumns
  );

  useLayoutEffect(() => {
    updateContainerWidth();
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
  }, []);

  const updateContainerWidth = useCallback(() => {
    const rect = containerRef.current.getBoundingClientRect();

    setContainerWidth(rect.width);
  }, []);

  return (
    <div ref={containerRef} id="container" style={{ height: masonryHeight }}>
      {masonry &&
        masonry.map((item, i) => {
          return <MasonryItem item={item} key={i} />;
        })}
    </div>
  );
}
