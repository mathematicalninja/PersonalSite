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

def getFullSerebiiPathByGen(dex:int,dexNum:int):
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



def pkmnFullArtUrl(dexNum:int):
    return f"https://serebii.net/art/th/{dexNum}.png"

def pkmnFullArtFolder():
    path = join("public","img","pkmn","png","fullArt")
    return path

def pkmnFullArtPath(dexNum:int):
    return join(pkmnFullArtFolder(dexNum),f"{dexNum}.png")
