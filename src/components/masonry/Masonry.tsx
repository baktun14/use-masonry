import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import "./Masonry.css";
import { MasonryItemModel, useMasonry } from "../../hooks/useMasonry";
import { getPrefixedTranslate } from "../../utils/cssHelpers";
import { MasonryItem } from "../masonryItem/MasonryItem";
import { debounce } from "../../utils/debounce";

const items: Array<MasonryItemModel> = [
  { originalWidth: 200, originalHeight: 400 },
  { originalWidth: 400, originalHeight: 300 },
  { originalWidth: 600, originalHeight: 400 },
  { originalWidth: 200, originalHeight: 300 },
  { originalWidth: 300, originalHeight: 700 },
];

interface IWindowSize {
  width: number;
  height: number;
}

export function Masonry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<IWindowSize>(null);
  const { masonry, masonryHeight } = useMasonry(items, containerWidth);

  useLayoutEffect(() => {
    updateContainerWidth();
  }, []);

  useEffect(() => {
    const handleResize = (e: Event) => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

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
