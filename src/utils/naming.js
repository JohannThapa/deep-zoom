const COLUMN = 20;
const ROW = 49;
const TILE_WIDTH = 2448;
const TILE_HEIGHT = 2048;

export const Namer = (arr = [], name = "") => {
  const index = name?.split(".")[0];
  const colPosition = index % COLUMN;
  const rowPosition = Math.floor((index - colPosition) / COLUMN);
  const position = rowPosition + "_" + colPosition;
  return (
    parseInt(index) +
    "-" +
    position +
    "-" +
    arr[0] +
    "_" +
    arr[1] +
    "-" +
    TILE_HEIGHT +
    "x" +
    TILE_WIDTH +
    ".png"
  );
};
