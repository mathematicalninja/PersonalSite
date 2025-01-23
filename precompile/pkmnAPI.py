from os.path import join

from pkmnDataEncoding import genNumbers_to_pkdx_abrv_hypened as gen_abrv
from pkmnDataTyping import specialDex
from pkmnHardCoded import maxSensaibleGenNum

def getSerebiiPathByGen(dex:int|specialDex)->str:
    if isinstance(dex, int):
        gen_str = gen_abrv(dex)
        return f"https://www.serebii.net/pokedex{gen_str}/"
    else:
        raise ValueError(f"dexType {dex} is not implemented.")

def getFullSerebiiPathByGen(dex:int,dexNum:int) -> str:
    dex_path=getSerebiiPathByGen(dex)
    if isinstance(dex, int):
        if dex <=maxSensaibleGenNum:
            return join(dex_path,f"{dexNum:03d}.shtml")
        else:
            raise ValueError(f"Generation {dex} is not implemented.")
            pkmn_ame = nameLookup(dexNum)
            return join(dex_path,f"{pkmn_ame}.shtml")
    else:
        raise ValueError(f"Dex type {dex} is not implemented.")
        pkmn_ame = nameLookup(dexNum)
        return join(dex_path,f"{pkmn_ame}.shtml")



def pkmnFullArtUrl(dexNum:int) -> str:
    return f"https://serebii.net/art/th/{dexNum}.png"

def pkmnFullArtFolder() -> str:
    path = join("public","img","pkmn","png","fullArt")
    return path

def pkmnFullArtPath(dexNum:int) -> str:
    return join(pkmnFullArtFolder(dexNum),f"{dexNum}.png")

def pathDexDataGen(genNum:int=maxSensaibleGenNum) -> str:
    path = join("public", "data", "pkmn", "dexdata", f"gen{genNum}")
    return path

def getPkmnDexJsonPath(dexNum:int, genNum:int=maxSensaibleGenNum) -> str:
    return join(pathDexDataGen(genNum),f"{dexNum}.json")

def getPkmnDexLocalHtmlPath(dexNum:int, genNum:int=maxSensaibleGenNum) -> str:
    return join(pathDexDataGen(genNum),f"{dexNum}.html")

if __name__ == "__main__":
    from pkmnDataEncoding import fullPkmnIterator
    for dex in fullPkmnIterator(maxSensaibleGenNum):
        dexNum = dex.genNum
        print(getFullSerebiiPathByGen(dexNum,1))
