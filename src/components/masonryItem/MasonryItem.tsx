import React from "react";
import { MasonryItemModel } from "../../hooks/useMasonry";
import { getPrefixedTranslate } from "../../utils/cssHelpers";
import "./MasonryItem.css";

interface IMasonryItemProps {
  item: MasonryItemModel;
}

export const MasonryItem = React.memo(({ item }: IMasonryItemProps) => {
  const containerStyles: React.CSSProperties = {
    width: item.width,
    height: item.height,
    ...getPrefixedTranslate(item.left, item.top),
  };

  return (
    <div className="masonry-item" style={containerStyles}>
      <div className="masonry-item-container">
        <img
          src={`http://placehold.it/${item.originalWidth}x${item.originalHeight}`}
          alt={`An placehold.it of size ${item.originalWidth} pixel by ${item.originalHeight} pixel`}
        />
      </div>
    </div>
  );
});
