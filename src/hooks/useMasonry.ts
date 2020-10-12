import { useMemo } from "react";

export interface MasonryItemModel {
  id?: string;
  originalWidth: number;
  originalHeight: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

/**
 * Hook that generates masonry using the container width and the image's original width and height to calculate the positions
 * @param items An array of objects containing the original width and height of the image
 * @param containerWidth The width of the masonry container, usually the parent div
 * @param numberOfColumns The number of columns for the masonry
 */
export const useMasonry = (
  items: Array<MasonryItemModel>,
  containerWidth: number,
  numberOfColumns: number = 3
)
  : { masonry: MasonryItemModel[], masonryHeight: number } => {
  return useMemo(() =>
    calculateMasonry(items, containerWidth, numberOfColumns),
    [items, containerWidth, numberOfColumns]);
}

interface MasonryColumn {
  index: number;
  colHeight: number;
  items: Array<MasonryItemModel>
}

function calculateMasonry(items: Array<MasonryItemModel>, containerWidth: number, numberOfColumns: number) {
  if (containerWidth && containerWidth > 0 && items && items.length > 0) {
    const colWidth: number = Math.round(containerWidth / numberOfColumns);
    const masonry: Array<MasonryColumn> = [];

    // Populate the masonry structure for each columns
    // Ex: numberOfColumns = 3  ->  [[],[],[]];
    for (let i = 0; i < numberOfColumns; i++) {
      masonry.push({ index: i, colHeight: 0, items: [] });
    }

    /**
     * Insert item with height and width pre-calculated
     * @param item 
     */
    const insertInMasonry = (item: MasonryItemModel) => {
      const shortesCol = masonry.sort(c => c.index).minBy(col => col.colHeight);
      const colIndex = masonry.findIndex((val, i) => shortesCol.index === val.index);
      const currentLastColItem: MasonryItemModel = shortesCol.items[shortesCol.items.length - 1] || {};
      const hasLastColItem = Object.keys(currentLastColItem).length > 0 && currentLastColItem.constructor === Object;
      const newItem: MasonryItemModel = {
        ...item,
        top: hasLastColItem ? currentLastColItem.top + currentLastColItem.height : 0,
        left: colIndex * colWidth
      }

      masonry[colIndex] = {
        ...masonry[colIndex],
        colHeight: newItem.top + newItem.height,
        items: [...shortesCol.items, newItem]
      };
    }

    items.forEach(item => {
      const ratio = item.originalHeight / item.originalWidth;
      const height = Math.round(colWidth * ratio);
      const width = colWidth;

      insertInMasonry({
        ...item,
        width,
        height
      });
    });

    // transform the masonry data structure into a flat array containing only the items
    const flattedMasonry = masonry.map(col => col.items).flat(1);
    const lowestBlock: MasonryItemModel = flattedMasonry.maxBy(item => item.top + item.height);
    const masonryHeight = lowestBlock ? lowestBlock.top + lowestBlock.height : 0;

    return { masonry: flattedMasonry, masonryHeight }
  } else {
    return { masonry: [], masonryHeight: 0 };
  }
}