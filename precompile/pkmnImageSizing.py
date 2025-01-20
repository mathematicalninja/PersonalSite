from PIL import Image
import os
from os.path import join
import json
from typing import TypedDict, Optional

from pkmnAPI import pkmnFullArtFolder


from pkmnDataTyping import pkmnImg


def getAllImgSizes(root_folder:str):
    # Todo: remove filepath from json, as this can be infered from API
    img_list:list[pkmnImg] = []

    for root, dirs, files in os.walk(root_folder):
        for file in files:
            # TODO: add in a "not .json" check
            path = os.path.join(root, file)
            with Image.open(path) as img:
                width:int = img.width
                height:int = img.height
            img_list.append({
                    "name":file,
                    "width":width,
                    "height":height
                })
    return img_list

def saveImgSizesAsJson(root_folder:str):
    img_list = getAllImgSizes(root_folder)
    with open(join(root_folder, "img_data.json"), "w") as f:
        json.dump(img_list, f)


if __name__ == "__main__":
    root_folder = pkmnFullArtFolder()
    saveImgSizesAsJson(root_folder)