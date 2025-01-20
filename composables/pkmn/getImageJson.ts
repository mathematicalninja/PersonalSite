export const usePkmnGetImageJson = (genNum:Number, dexNum:Number) => {
  
  return ref()
}

export const usePkmnGetImgPath = (gen: number, dexNum: number) => {
  return [
    "img",
    "pkmn",
    "png",
    "gen" + gen.toString(),
    dexNum.toString() + ".json",
  ].join("/");
};
