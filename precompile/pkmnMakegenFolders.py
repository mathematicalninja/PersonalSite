import os

from pkmnHardCoded import maxSensaibleGenNum as maxGen

def makeGenfolder(root,genNum):
    gen_str = f"gen{genNum}"
    gen_folder = os.path.join(root,gen_str)
    if not os.path.exists(gen_folder):
        os.makedirs(gen_folder)
    pass

def populateGenFolders(root, maxGen:int=maxGen):
    for genNum in range(1,maxGen+1):
        makeGenfolder(root,genNum)
    pass