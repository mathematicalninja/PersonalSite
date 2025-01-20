import bs4

from pkmnAPI import getPkmnDexLocalHtmlPath

def localTestSoup():
    path = getPkmnDexLocalHtmlPath(421,5)
    with open(path, 'r', encoding="utf-8") as f:
        soup = bs4.BeautifulSoup(f.read(), "html.parser")
    return soup


if __name__ == "__main__":
    s = localTestSoup()