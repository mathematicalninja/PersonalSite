from pkmnDataTyping import specialDex, growthRate
from pkmnHardCoded import maxSensaibleGenNum

def genNumbers_to_pkdx_abrv(num:int)->str:
    """
    Convverts a generation number to a 2-letter Pokedex abbreviation.
    Note swsh as an exception for Sword and Shield.
    """
    match num:
        case 1:
            return "rb"
        case 2:
            return "gs"
        case 3:
            return "rs"
        case 4:
            return "dp"
        case 5:
            return "bw"
        case 6:
            return "xy"
        case 7:
            return "sm"
        case 8:
            return "swsh"
        case 9:
            return "sv"
        case _:
            return ""  

def genNumbers_to_pkdx_abrv_hypened(num:int)->str:
    """
    Converts a generation number to a Pokedex abbreviation with leading hypen, as used in pokedex-gs.
    """
    if num == 1:
        return ""
    else:
        return "-" + genNumbers_to_pkdx_abrv(num)

genCaps:dict[int,int] = {
    1:151,
    2:251,
    3:386,
    4:493,
    5:649,
    6:721,
    7:809,
    8:905,
    9:1025
}


growthRateNumbers:dict[growthRate:int] = {
    # https://www.serebii.net/games/exp.shtml
    "Erratic":600000,
    "Fast":800000,
    "Medium-Fast":1000000,
    "Medium-Slow":1059860,
    "Slow":125000,
    "Fluctuating":1640000
    
}

class pokedexIterator:
    """
    An iterator class for iterating over a Pokedex.

    Args:
        genNum (int|specialDex): The generation number or special Dex name.

    Attributes:
        dexType (str): The type of Pokedex ("special" or "national").
        dexName (str): The name of the Pokedex.
        genCap (int): The generation cap for the  Pokedex.
        num (int): The current number in the Pokedex.

    Raises:
        StopIteration: Raised when the iteration is complete.

    """

    def __init__ (self, genNum:int|specialDex):
        if isinstance(genNum, specialDex):
            self.dexType = "special"
            self.dexName = genNum
        if (not isinstance(genNum, specialDex)) and (genNum>0 and genNum<9):
            self.genCap = genCaps[genNum]
            self.dexType = "national"
            self.genNum = genNum
        else:
            self.dexName = f"Generation {genNum}"

    def __iter__(self):
        self.num = 0
        return self
    
    def __next__(self):
        if self.dexType == "national":
            if self.num >= self.genCap:
                raise StopIteration
            self.num += 1
            return self.num
        if self.dexType == "specail":
            raise (f"{self.dexName} - not implemented")
            print(f"{self.dexName} - not implemented")
            raise StopIteration
        
class fullPkmnIterator:
    """
    An iterator that iterates over all generations of Pokemon data.

    Args:
        maxGen (int): The maximum generation number to iterate up to. Defaults to 8.

    Attributes:
        genNum (int): The current generation number.
        maxGen (int): The maximum generation number.

    Returns:
        pokedexIterator: An iterator that iterates over the Pokedex numbers for each generation.

    Raises:
        StopIteration: When the maximum generation number is reached.

    """
    
    def __init__(self, maxGen: int = maxSensaibleGenNum):
        self.genNum = 0
        self.maxGen = maxGen

    def __iter__(self):
        return self

    def __next__(self):
        if self.genNum is self.maxGen:
            raise StopIteration
        if self.genNum is not self.maxGen:
            self.genNum += 1
        return pokedexIterator(self.genNum)