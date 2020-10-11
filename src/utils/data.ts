import { MasonryItemModel } from "../hooks/useMasonry";
import { v4 as uuidv4 } from "uuid";

export const APIItems: Array<MasonryItemModel> = [
  { id: uuidv4(), originalWidth: 200, originalHeight: 400 },
  { id: uuidv4(), originalWidth: 400, originalHeight: 300 },
  { id: uuidv4(), originalWidth: 600, originalHeight: 400 },
  { id: uuidv4(), originalWidth: 200, originalHeight: 300 },
  { id: uuidv4(), originalWidth: 300, originalHeight: 700 },
  { id: uuidv4(), originalWidth: 250, originalHeight: 450 },
  { id: uuidv4(), originalWidth: 400, originalHeight: 400 },
  { id: uuidv4(), originalWidth: 550, originalHeight: 475 },
  { id: uuidv4(), originalWidth: 800, originalHeight: 600 },
  { id: uuidv4(), originalWidth: 1100, originalHeight: 700 },
  { id: uuidv4(), originalWidth: 900, originalHeight: 600 },
  { id: uuidv4(), originalWidth: 575, originalHeight: 700 },
];