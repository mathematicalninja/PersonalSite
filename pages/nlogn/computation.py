from icecream import ic
from typing import Literal
from random import randint
from math import floor, ceil

def divides(k:int,n:int)->bool:
    ic(k,n)
    if(k<=1):
        raise(ValueError("cannot split into less than 2 piles"))
    return n%k==0

def mSub(k:int,n:int)->int:
    # The size of the smaller piles
    if divides(k,n):
        return n//k
    # return n//k + 1
    return floor(n/k)

def mSup(k:int,n:int)->int:
    # The size of the larger piles
    if divides(k,n):
        return n//k
    return ceil(n/k)

def rSub(k:int,n:int)->int:
    # The count of the smaller piles
    if divides(k,n):
        return 0
    return k*mSup(k,n) - n

def rSup(k:int,n:int)->int:
    # The count of the larger piles
    if divides(k,n):
        return k
    return n-k*mSub(k,n)



def B(k:int,n:int, case:Literal['worst','best','random']='worst')->int:
    ## The error term in the sorting algorithm, leftover ranges between the size of the largest pile an 1, giving remainers between n-1 and n-ceil(n/k)
    match case:
        case 'worst':
            return n-1
        case 'best':
            return n-mSup(k,n)
        case 'random':
            return randint(n-mSup(k,n), n-1)
        case _:
            raise ValueError("Invalid case")
    # the worst case
    return n-1
    # The below is a more correct implementation
    return randint(n-mSup(k,n),n-1)

def A(k:int,n:int,case:Literal['worst','best','random']='worst')->int:
    # Algorithm sorting time, k is the number of piles to split into, n is the number to be split.
    # case: 'worst', 'best', 'random' chooses the way error terms should be estimated
    if n<=k:
        # ic(n,k)
        return n-1

    Asup = A(k,mSup(k,n))
    Asub = A(k,mSub(k,n))
    rsup = rSup(k,n)
    rsub = rSub(k,n)
    Bval = B(k,n,case)

    Vsup = rsup*Asup
    Vsub = rsub*Asub

    returnValue = Vsup + Vsub + Bval

    return returnValue

    # BUG:this seems to be returning the "internal" iteration value.

from math import log
def logGuess(k:int,n:int)->int:
    # n\lceil\log_k n\rceil - k^{\lceil\log_k n\rceil} + 1
    return n*ceil(log(n,k)) - k**ceil(log(n,k)) + 1

def compare(k:int,n:int)->int:
    ic(A(k,n), logGuess(k,n))
    return A(k,n) - logGuess(k,n)

def twoSeq(n:int)->int:
    if n==0:
        return 0
    if n==1:
        return 1
    if n==2:
        return 1

    return twoSeq(floor(n/2)) + twoSeq(ceil(n/2)) + n-1

def twoCompare(n:int)->int:
    ic(twoSeq(n), logGuess(2,n))
    return twoSeq(n) - logGuess(2,n)

if __name__ == "__main__":
    ic(A(2,12))

    ic(A(2,4))
    ic(A(3,100))
    # ic(compare(2,12))
    # ic(compare(2,4))
    # ic(compare(2,15))
    # ic(compare(3,15))
    # ic(twoCompare(12))
    # ic(A(2,1211))

    # ic(mSub(6,98))
    # ic(A(2,10,'best'))
    # ic(A(2,10,'random'))
    # ic(A(2,10,'worst'))

# TODO: make this animated, so it can be embeded. (Manin?)

# Structure of A(2,4) = 5
#       4
#     2 | 2
# 1 | 1 | 1 | 1

#       4
#   2   | 2
#   2+1 | 2+14

#       4
#   2+1 | 2+1

#       4
#       4+3+2

#       4 +5


# Structure of A(2,12) = 33
#                       12
#           6           |           6
#   3       |   3       |   3       |   3
# 1 |   2   | 1 |   2   | 1 |   2   | 1 |   2
# 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1


#                       12
#           6           |           6
#   3       |   3       |   3       |   3
# 1 |   2   | 1 |   2   | 1 |   2   | 1 |   2
#+0 |  +1   |+0 |  +1   |+0 |  +1   |+0 |  +1

#                       12
#           6           |           6
#   3       |   3       |   3       |   3
# 1 |   2+1 | 1 |   2+1 | 1 |   2+1 | 1 |   2+1

#                       12
#           6           |           6
#   3       |   3       |   3       |   3
#  +2+1     |  +2+1     |  +2+1     |  +2+1

#                       12
#           6           |           6
#   3+3     |   3+3     |   3+3     |   3+3

#                       12
#           6+11        |           6 +11

#                       12 + 33


#                       33 ==> exactly logGuess(2,n), but neither A(2,n) nor twoSeq(n)
