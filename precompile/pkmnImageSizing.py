from PIL import Image
import os
from os.path import join
import json

from pkmnAPI import pkmnFullArtFolder
from pkmnDataTyping import pkmnImg
from pkmnDataScrape import nameFromDexNum

from icecream import ic

def getAllImgSizes(root_folder:str) -> list[pkmnImg]:
    img_list:list[pkmnImg] = []
    for root, dirs, files in os.walk(root_folder):
        for file in files:
            img_list.append({})

    for root, dirs, files in os.walk(root_folder):
        for file in files:
            # TODO: add in a "not .json" check
            path = os.path.join(root, file)
            if getExtension(file) not in imageExtensions:
                continue

            with Image.open(path) as img:
                width:int = img.width
                height:int = img.height
            
            dexNum = stripExtension(file)
            if dexNum.isnumeric():
                name = nameFromDexNum(dexNum, genNum = 7)
                num = int(dexNum)
            else:
                name = dexNum
                num = 0
                        
            # if not dexNum.isnumeric():
            #     continue # skip pokeball.png
            #     ##TODO: #69 make this more robust to allow for varients (e.g. shinies)
            
            # name = nameFromDexNum(dexNum,genNum = 7)


            img_list[num]={
                    "name":name, #placeholder as pokeball.png deosn't have an html
                    "width":width,
                    "height":height
                }
    return img_list


def stripExtension(filename:str)->str:
    return ".".join(filename.split(".")[:-1])

def getExtension(filename:str)->str:
    return filename.split(".")[-1]

imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "tiff", "webp"]

def imageSizesIndividual(root_folder:str):
    for root, dirs, files in os.walk(root_folder):
        for file in files:
            # TODO: add in a "not .json" check
            if getExtension(file) not in imageExtensions:
                continue
            img_path = os.path.join(root, file)
            with Image.open(img_path) as img:
                width:int = img.width
                height:int = img.height
            dexNum = stripExtension(file)
            json_path = os.path.join(root, dexNum + ".json")
            ic(dexNum)
            
            if not dexNum.isnumeric():
                continue # skip pokeball.png
                ##TODO: #69 make this more robust to allow for varients (e.g. shinies)
            
            name = nameFromDexNum(dexNum,genNum = 7)
            with open(json_path, "w") as j:
                json.dump({
                    "name": name,
                    "width":width,
                    "height":height
                }, j)
            # input(f"Saved #{dexNum} {name}") ## Used to manually test saves.
            

def saveImgSizesAsJson(root_folder:str):
    img_list = getAllImgSizes(root_folder)
    with open(join(root_folder, "img_data.json"), "w") as f:
        json.dump(img_list, f)


if __name__ == "__main__":
    root_folder = pkmnFullArtFolder()
    # saveImgSizesAsJson(root_folder)
    # s = stripExtension("https://serebii.net/pikachu.png")
    # print(s)
    saveImgSizesAsJson(root_folder)