from typing import Literal
import re
from icecream import ic
def tailwindStrToList(string:str, scrapeQuote:bool = True):
    """
    Convert a string of tailwind classes into a list of classes.
    """

    if(scrapeQuote):
        tailwindStr = string[1:-2]
    else:
        tailwindStr = string

    # Split the string by spaces
    tailwindList = tailwindStr.split(" ")

    # Remove empty strings from the list
    tailwindList = [x for x in tailwindList if x != ""]

    if(scrapeQuote):
        # print("\n")
        print( tailwindList,"," )
        # print("\n")

    return tailwindList

def getCurrentQuote(string:str):

    if( string.find("`") != -1):
        return "`"

    if( string.find("'") != -1):
        return "'"

    if (string.find('"') != -1):
        return'"'

    return None




def scrapeByQuotes(string:str, quote:Literal["'", '"',"auto"] = "auto"):
    """
    Scrape a string by quotes. Returns the contents of the first matching quoted section.
    """

    if(quote == "auto"):
        currentQuote = getCurrentQuote(string)
    else:
        currentQuote = quote
    if(currentQuote is None):
        print("No quotes found in string.")
        return None

    # find the first opening quote
    openingIndex = string.find(currentQuote)
    if(openingIndex == -1):
        return None
    # find the closing quote
    # Reverse the string, find the "first" quote, flip the index, reverse the string back, then give the new "closing" index.
    closingIndex = getLastIndex(string, currentQuote)
    # = string.find(currentQuote, openingIndex + 1)
    if(closingIndex == -1):
        return None
    # return the contents of the quoted section

    tailwindList = tailwindStrToList(string[openingIndex + 1:closingIndex], False)
    print("\n\n\n")
    commaIndex = string.find(",")
    firstLine = f"['{tailwindList[0]}', //\n"
    rest = f"{tailwindList[1:]}"[1:]
    if(commaIndex is not -1):
        print(firstLine + rest+",\n\n\n")

    else:
        print(firstLine + rest+"\n\n\n")

def getLastIndex(string:str, char:str):
    # Reverse the string, find the "first" quote, flip the index, reverse the string back, then give the new "closing" index.
    reversedString = string[::-1]
    reversedIndex = reversedString.find(char)
    if(reversedIndex == -1):
        return -1
    return len(string) - (reversedIndex + 1)


def getBracketContents(string:str, bracket:Literal["[]", "{}", "()"],prefix:str=""):
    """
    Get the contents of a bracketed section of a string. Returns the contents of the first matching bracketed section.
    """
    # get the opening and closing brackets
    if(bracket == "[]"):
        opening = "["
        closing = "]"
    elif(bracket == "{}"):
        opening = "{"
        closing = "}"
    elif(bracket == "()"):
        opening = "("
        closing = ")"
    else:
        raise ValueError("Invalid bracket type. Must be '[]', '{}', or '()'.")

    # find the first opening bracket following the prefix
    openingIndex = string.find(opening, string.find(prefix))
    # openingIndex = string.find(opening)
    finalClose = openingIndex
    if(openingIndex == -1):
        return None
    count = 1
    splicedContents = string[openingIndex+1:]
    while count > 0:
        # find the next opening and closing brackets
        currentOpen = splicedContents.find(opening)
        currentClose = splicedContents.find(closing)

        # if there is no closing bracket, return None
        if(currentClose == -1):
            print(f"openingIndex: {openingIndex}, currentClose: {finalClose}, count: {count}")
            return(string[openingIndex:openingIndex+finalClose])


        # if there is no opening bracket, decrement the count
        if(currentOpen == -1):
            count -= 1
            currentOpen += currentClose + 1
            finalClose += currentClose + 1
            splicedContents = splicedContents[currentClose+1:]
            continue

        # if there is another opening bracket before the closing bracket, increment the count
        if(currentOpen<currentClose and currentOpen != -1):
            count += 1
            currentOpen += currentOpen + 1
            finalClose += currentOpen + 1

        # if there is a closing bracket before the opening bracket, decrement the count
        elif(currentClose<currentOpen and currentClose != -1):
            count -= 1
            currentOpen += currentClose + 1
            finalClose += currentClose + 1
        splicedContents = splicedContents[currentOpen+1:]

    # print(f"openingIndex: {openingIndex}, currentClose: {finalClose}, count: {count}")
    return(string[openingIndex:openingIndex+finalClose])




def listifyFile(fileName:str,braket:Literal["[]", "{}", "()"] = "()"):
    """
    Converts all tawilwind classes used in a file to lists of individual classes. For use with cva from 'class-variance-authority'
    """

    # get cwd and create the absolute path to the file
    path = os.path.join(os.getcwd(), fileName)
    with open(path, "r") as f:
        # Read the file
        file = f.read()
        if(file == ""):
            return
        file = file.replace("\n", "")
        # find contents of cva (possibly across multiple lines)
        cvaContents = getBracketContents(file, braket, "cva")
        return cvaContents
    pass

def mainByQuotes():
    while True:
        scrapeByQuotes(input("Enter tawilwind string:\n\n\n"))
    pass

import os
from icecream import ic
if __name__ == "__main__":
    # print(tailwindStrToList(input("Enter tawilwind string:\n")))
    # ic(listifyFile("precompile/test.ts"))
    mainByQuotes()