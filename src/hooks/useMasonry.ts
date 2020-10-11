import { useMemo } from "react";

export interface MasonryItemModel {
  id: string;
  originalWidth: number;
  originalHeight: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

export const useMasonry = (
  items: Array<MasonryItemModel>,
  containerWidth: number,
  numberOfColumns: number = 3,
  gutterPadding: number = 5)
  : { masonry: MasonryItemModel[], masonryHeight: number } => {
  return useMemo(() =>
    calculateMasonry(items, containerWidth, numberOfColumns, gutterPadding),
    [items, containerWidth, numberOfColumns, gutterPadding]);
}

interface MasonryColumn {
  index: number;
  items: Array<MasonryItemModel>
}

function calculateMasonry(items: Array<MasonryItemModel>, containerWidth: number, numberOfColumns: number, gutterPadding: number) {
  if (containerWidth && containerWidth > 0 && items && items.length > 0) {
    const colWidth: number = containerWidth / numberOfColumns;
    const masonry: Array<MasonryColumn> = [];

    for (let i = 0; i < numberOfColumns; i++) {
      masonry.push({ index: i, items: [] });
    }

    const insertInMasonry = (item: MasonryItemModel) => {
      const computeColHeight = (col: MasonryColumn) => {
        const lastItem = col.items[col.items.length - 1];
        const colHeight = col.items.length >= 1
          ? lastItem.top + lastItem.height
          : 0;

        return colHeight;
      }
      const shortesCol = masonry.sort(c => c.index).minBy(col => computeColHeight(col));
      const colIndex = masonry.findIndex((val, i) => shortesCol?.index === val.index);
      const currentLastColItem: MasonryItemModel = shortesCol.items[shortesCol.items.length - 1] || {};
      const hasLastColItem = Object.keys(currentLastColItem).length > 0 && currentLastColItem.constructor === Object;

      masonry[colIndex] = {
        ...masonry[colIndex],
        items: [
          ...shortesCol.items, {
            ...item,
            colIndex,
            top: hasLastColItem ? currentLastColItem.top + currentLastColItem.height : 0,
            left: colIndex * colWidth
          }]
      };
    }

    items.forEach(item => {
      const ratio = item.originalHeight / item.originalWidth;
      const height = Math.round((colWidth - gutterPadding) * ratio);
      const width = colWidth;

      insertInMasonry({
        ...item,
        width,
        height
      });
    });

    const flattedMasonry = masonry.map(col => col.items).flat(1);
    const lowestBlock: MasonryItemModel = flattedMasonry.maxBy(item => item.top + item.height);
    const masonryHeight = lowestBlock ? lowestBlock.top + lowestBlock.height : 0;

    return { masonry: flattedMasonry, masonryHeight }
  } else {
    return { masonry: [], masonryHeight: 0 };
  }
}