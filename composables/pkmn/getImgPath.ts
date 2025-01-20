// import * as path from "node:path";

export const usePkmnGetImgPath = (gen: number, dexNum: number) => {
  return [
    "img",
    "pkmn",
    "png",
    "gen" + gen.toString(),
    dexNum.toString() + ".png",
  ].join("/");
};
