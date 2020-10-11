import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import "./Masonry.css";
import { MasonryItemModel, useMasonry } from "../../hooks/useMasonry";
import { getPrefixedTranslate } from "../../utils/cssHelpers";
import { MasonryItem } from "../masonryItem/MasonryItem";

const items: Array<MasonryItemModel> = [
  { originalWidth: 200, originalHeight: 400 },
  { originalWidth: 400, originalHeight: 300 },
  { originalWidth: 600, originalHeight: 400 },
  { originalWidth: 200, originalHeight: 300 },
  { originalWidth: 300, originalHeight: 700 },
];

export function Masonry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { masonry, masonryHeight } = useMasonry(items, containerWidth);

  useLayoutEffect(() => {
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
