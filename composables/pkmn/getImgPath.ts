// import * as path from "node:path";

export const usePkmnGetImgPath = (gen: number, dexNum: number) => {
  const pathArray: string[] = [
    "img",
    "pkmn",
    "png",
    "gen" + gen.toString(),
    dexNum.toString() + ".png",
  ];
  const join = (paths: string[]) => {
    return paths.join("/");
  };

  return join(pathArray);
};
