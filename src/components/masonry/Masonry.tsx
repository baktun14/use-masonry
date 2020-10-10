import React, { useRef, useState, useLayoutEffect } from "react";
import "./Masonry.css";
import { MasonryItem, useMasonry } from "../../hooks/useMasonry";
import { getPrefixedTranslate } from "../../utils/cssHelpers";

const items: Array<MasonryItem> = [
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
          const containerStyles: React.CSSProperties = {
            width: item.width,
            height: item.height,
            ...getPrefixedTranslate(item.left, item.top),
          };

          return (
            <div key={i} className="masonry-item" style={containerStyles}>
              <div className="masonry-item-container">
                <img
                  src={`http://placehold.it/${item.originalWidth}x${item.originalHeight}`}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
