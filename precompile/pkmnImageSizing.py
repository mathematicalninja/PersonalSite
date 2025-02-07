from PIL import Image
import os
from os.path import join
import json

from pkmnAPI import pkmnFullArtFolder
from pkmnDataTyping import pkmnImg


def getAllImgSizes(root_folder:str) -> list[pkmnImg]:
    img_list:list[pkmnImg] = []

    for root, dirs, files in os.walk(root_folder):
        for file in files:
            # TODO: add in a "not .json" check
            path = os.path.join(root, file)
            with Image.open(path) as img:
                width:int = img.width
                height:int = img.height
            img_list.append({
                    "name":file, # TODO: change to name
                    # "name": getName(stripExtension(file)),
                    "width":width,
                    "height":height
                })
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
            json_path = os.path.join(root, stripExtension(file) + ".json")
            with open(json_path, "w") as j:
                json.dump({
                    "name":file,
                    "width":width,
                    "height":height
                }, j)
            

def saveImgSizesAsJson(root_folder:str):
    img_list = getAllImgSizes(root_folder)
    with open(join(root_folder, "img_data.json"), "w") as f:
        json.dump(img_list, f)


if __name__ == "__main__":
    root_folder = pkmnFullArtFolder()
    # saveImgSizesAsJson(root_folder)
    # s = stripExtension("https://serebii.net/pikachu.png")
    # print(s)
    imageSizesIndividual(root_folder)