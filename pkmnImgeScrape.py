import requests

def dex_num_to_url(dex_num:int):
    url = f"https://serebii.net/art/th/{dex_num}.png"
    return url

def dex_num_to_img_path(dex_num:int):
    img_name = f"public/img/pkmn/png/gen1/{dex_num}.png"
    return img_name

def get_img_data(url:str):
    img_data = requests.get(url).content
    return img_data

def save_img(img_data:bytes, img_path:str):
    with open(img_path, 'wb') as handler:
        handler.write(img_data)

def scrape_img(dex_num):
    img_data = get_img_data(dex_num_to_url(dex_num))
    save_img(img_data, dex_num_to_img_path(dex_num))

def main():
    max_num: int = 300
    for dex_num in range(1, max_num+1):
        scrape_img(dex_num)
        print(f"Scraped {dex_num}")
    return

if __name__ == "__main__":
    main()