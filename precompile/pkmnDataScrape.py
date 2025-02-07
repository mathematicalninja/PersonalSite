import requests
import bs4

from pkmnDataTyping import *
from pkmnDataEncoding import genNumbers_to_pkdx_abrv_hypened as gen_abrv
from pkmnDataEncoding import fullPkmnIterator
from pkmnHardCoded import maxSensaibleGenNum as maxGen
from pkmnAPI import getFullSerebiiPathByGen as serebiiPath
from pkmnAPI import getPkmnDexLocalHtmlPath


def soupByNumber(dexNum:int, genNum:int=maxGen) -> bs4.BeautifulSoup:
    print(f"Scraping {dexNum} from gen {genNum}")
    gen_str = gen_abrv(genNum)
    path = serebiiPath(dex=genNum,dexNum=dexNum)
    with requests.get(path) as r:
        r.raise_for_status()
        soup = bs4.BeautifulSoup(r.text, "html.parser")
    return soup

def localSoupByNumber(dexNum:int, genNum:int=maxGen) -> bs4.BeautifulSoup:
    path = getPkmnDexLocalHtmlPath(dexNum,genNum)
    with open(path, 'r', encoding="utf-8") as f:
        soup = bs4.BeautifulSoup(f.read(), "html.parser")
    return soup


def saveSoup(dexNum:int,genNum:int=maxGen):
    s = soupByNumber(dexNum,genNum).prettify()
    path = getPkmnDexLocalHtmlPath(dexNum,genNum)
    with open(path, 'w', encoding="utf-8") as f:
        f.write(s)


def saveAllSoup(maxGen:int=maxGen):
    for gen in fullPkmnIterator(maxGen):
        genNum = gen.genNum
        for num in gen:
            print(f"Generation {genNum}: Number {num}")
            saveSoup(num,genNum)
    return

if __name__ == "__main__":
    pass