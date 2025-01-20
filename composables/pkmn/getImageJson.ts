// import { readFile } from "fs/promises";
import data from "~/public/img/pkmn/png/fullArt/img_data.json"
import { FullArtFolderPath } from "~/constants/pkmn";
type PkmnImageJson = {
  height:number,
  width:number,
  name:string
}

export const usePkmnGetFullArtJson = (genNum:Number, dexNum:Number) => {

  const p= [
    FullArtFolderPath,
    dexNum.toString() + ".json",
  ].join("/");
};
