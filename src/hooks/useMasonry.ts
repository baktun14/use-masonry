export interface MasonryItemModel {
  originalWidth: number;
  originalHeight: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

export function useMasonry(items: Array<MasonryItemModel>, containerWidth: number, numberOfColumns: number = 3, gutterPadding: number = 5) {
  if (containerWidth) {
    const colWidth: number = containerWidth / numberOfColumns;
    const masonry: Array<Array<MasonryItemModel>> = [];

    for (let i = 0; i < numberOfColumns; i++) {
      masonry.push([]);
    }

    const insertInMasonry = (item: MasonryItemModel) => {
      const computeColHeight = (col: Array<MasonryItemModel> = []) => col.length > 1
        ? col[col.length - 1].top + col[col.length - 1].height
        : 0;
      const shortesCol = masonry.minBy(col => computeColHeight(col));
      const colIndex = masonry.indexOf(shortesCol);
      const currentLastColItem: MasonryItemModel = shortesCol[shortesCol.length - 1] || {};
      const hasLastColItem = Object.keys(currentLastColItem).length > 0 && currentLastColItem.constructor === Object;

      masonry[colIndex] = [...shortesCol, {
        ...item,
        colIndex,
        top: hasLastColItem ? currentLastColItem.top + currentLastColItem.height : 0,
        left: colIndex * colWidth
      }];
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

    const flattedMasonry = masonry.flat(1);
    const lowestBlock: MasonryItemModel = flattedMasonry.maxBy(item => item.top + item.height);
    const masonryHeight = lowestBlock ? lowestBlock.top + lowestBlock.height : 0;

    return { masonry: flattedMasonry, masonryHeight }
  } else {
    return { masonry: [], masonryHeight: 0 }
  }
}