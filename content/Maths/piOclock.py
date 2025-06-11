import math

def leibniz_term(k:int) -> float:
    """Calculate the k-th term of the Leibniz series."""
    return (-1)**k / (2*k + 1)

def piIsh(n:int):
    """Calculates the first n terms of the Leibniz approximation of pi."""
    pi_approx = 0.0
    for k in range(n):
        pi_approx += leibniz_term(k)
    return pi_approx * 4  # Multiply by 4 to get the approximation of pi

def piApprox(epsilon:float):
    """Calculates the number of terms needed to approximate pi within a given epsilon."""
    n = 0
    pi_approx = 0.0

    while abs(pi_approx - math.pi) > epsilon:
        pi_approx += leibniz_term(n)
        n += 1
        print(n, pi_approx * 4)
    return n, pi_approx * 4  # Return the number of terms and the approximation of pi

def quickApprox():
    print(31415*3600)
    print(3600*3)
    print(11309 - 10800)
    print(509 // 60)
    print(509 % 60)
    print(60*8+29)

if __name__ == "__main__":
    print("the first 1800 terms, i.e. up to ~ 1/3600: ")
    print(piIsh(1800))
    # print("how long do we need to calculate to get 3.1415?")
    # print(piApprox(0.0001))
    # print("how long do we need to calculate to get 1 second accuracy?")
    # print(piApprox(1/3600))
    quickApprox()