from typing import TypedDict, Optional, Literal
from typing import TypedDict, Optional

class pkmnImg(TypedDict):
    name:str
    width:Optional[int]
    height:Optional[int]

class statsDic(TypedDict):
    hp:int
    atk:int
    def_:int
    sp_atk:int
    sp_def:int
    spd:int

class growthRate:Literal[
    "Erratic",
    "Fast",
    "Medium-Fast",
    "Medium-Slow",
    "Slow",
    "Fluctuating"
]

class genderRatio(TypedDict):
    male:float
    female:float

    
class characteristicsDicts(TypedDict):
    height_m:float
    weight_kg:float
    height_f:str
    weight_lb:float

class pkmnData(TypedDict):
    name:str
    dex_num:int
    classification:str

    type1:str
    type2:Optional[str]
    abilities:list[str]

    stats:statsDic
    gender_ratio:genderRatio

    characteristics:characteristicsDicts
    growth_rate:growthRate

    capture_rate:int
    base_egg_steps:int
    egg_groups:list[str]

# Note that Box Images, Sprites and Images are needed


class specialDex: Literal[
    # TODO: Add special dexes
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Hisui",
    "Vivace"
]
