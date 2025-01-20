import requests

from pkmnHardCoded import maxSensaibleGenNum as maxGen
from pkmnAPI import pkmnFullArtUrl
from pkmnAPI import pkmnFullArtPath


def get_img_data(url:str):
    img_data = requests.get(url).content
    return img_data

def save_img(img_data:bytes, img_path:str):
    with open(img_path, 'wb') as handler:
        handler.write(img_data)

def scrape_Full_img(dex_num):
    img_data = get_img_data(pkmnFullArtUrl(dex_num))
    save_img(img_data, pkmnFullArtPath(dex_num))

def scrape_range_full_art(min_num:int, max_num:int):
    # TODO: refactor to use pkdex iterator
    for dex_num in range(min_num, max_num+1):
        scrape_Full_img(dex_num)
        print(f"Scraped {dex_num}")
    return

if __name__ == "__main__":
    scrape_range_full_art(int(input("Enter min dex number: ")), int(input("Enter max dex number: ")))