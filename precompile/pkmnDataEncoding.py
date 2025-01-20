
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

