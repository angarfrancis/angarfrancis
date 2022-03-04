import unittest

# This is the class we want to test. So, we need to import it
import Calculator as CalculatorClass

class Test(unittest.TestCase):
    calculator = CalculatorClass.Calculator() # instantiate the Calculator Class
    def test_0_add(self):
        result = self.calculator.add(4,8)
        self.assertEqual(result,12)
    
    def test_0_subtract(self):
        result = self.calculator.subtract(9,5)
        self.assertEqual(result,4)

    def test_0_Multiply(self):
        result = self.calculator.Multiply(2,3)
        self.assertEqual(result,6)

    def test_0_Divide(self):
        result = self.calculator.Divide(6,3)
        self.assertEqual(result,2)

    def test_0_Power(self):
        result = self.calculator.Power(2,2)
        self.assertEqual(result,4)

        if __name__ == '__main__':
    # begin the unittest.main()
         unittest.main()