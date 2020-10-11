import React from "react";
import { MasonryItemModel } from "../../hooks/useMasonry";
import { getPrefixedTranslate } from "../../utils/cssHelpers";

interface IMasonryItemProps {
  item: MasonryItemModel;
}

export const MasonryItem = ({ item }: IMasonryItemProps) => {
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
        />
      </div>
    </div>
  );
};
