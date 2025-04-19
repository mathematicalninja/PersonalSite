import unittest
from computation import A, B, compare, twoSeq, twoCompare, rSub, rSup, divides, mSub, mSup, logGuess

from icecream import ic

class TestComputation(unittest.TestCase):
    # rSub
    def test_rSub_exact(self):
        self.assertEqual(rSub(5,10), 0)

    # rSup
    def test_rSup_exact(self):
        self.assertEqual(rSup(5,10), 5)

    # divides
    def test_divides_error(self):
        self.assertRaises(ValueError, divides, 1, 18)

    def test_divides_exact(self):
        self.assertEqual(divides(2, 18), True)

    def test_divides_false(self):
        self.assertEqual(divides(7, 18), False)

    # A
    def test_A_basic(self):
        self.assertEqual(A(2, 1), 0)
        self.assertEqual(A(2, 2), 1)
        self.assertEqual(A(2, 3), 3)
        self.assertEqual(A(2, 4), 5)
        self.assertEqual(A(2, 12), 33)
        # ...additional tests...

    # B
    def test_B_cases(self):
        # ...existing code...
        self.assertEqual(B(2, 5, 'worst'), 4)
        # ...existing code...

    # compare
    def test_compare(self):
        # ...existing code...
        result = compare(2, 12)
        self.assertIsInstance(result, int)
        # ...existing code...

    # twoSeq
    def test_twoSeq(self):
        # ...existing code...
        self.assertEqual(twoSeq(1), 1)
        # ...existing code...

    # twoCompare
    def test_twoCompare(self):
        # ...existing code...
        out = twoCompare(4)
        self.assertIsInstance(out, int)

if __name__ == '__main__':
    unittest.main()
