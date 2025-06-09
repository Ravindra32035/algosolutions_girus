class BitwiseMatching:
    """
    Bitwise Matching Pattern
    
    Given an integer n, returns the next larger integer 
    with the same number of binary 1s as n.
    """
    
    def next_larger_same_bits(self, n):
        """
        Find next larger integer with same number of 1s
        
        Args:
            n: Input integer
            
        Returns:
            dict: Result with binary representations and explanation
        """
        if n <= 0:
            return {
                'result': -1,
                'input_binary': bin(n),
                'result_binary': 'N/A',
                'explanation': 'No solution for non-positive integers'
            }
        
        original_n = n
        
        # Count trailing zeros
        c0 = 0  # Count of trailing zeros
        c1 = 0  # Count of ones to the right of trailing zeros
        
        # Count trailing zeros
        temp = n
        while temp & 1 == 0 and temp != 0:
            c0 += 1
            temp >>= 1
        
        # Count ones after trailing zeros
        while temp & 1 == 1:
            c1 += 1
            temp >>= 1
        
        # If c0 + c1 == 31 or c0 + c1 == 0, then there's no bigger number with same 1s
        if c0 + c1 == 31 or c0 + c1 == 0:
            return {
                'result': -1,
                'input_binary': bin(original_n),
                'result_binary': 'N/A',
                'explanation': 'No larger number exists with same number of 1s'
            }
        
        # Position of rightmost non-trailing zero
        pos = c0 + c1
        
        # Flip the rightmost non-trailing zero
        n |= (1 << pos)
        
        # Clear all bits to the right of pos
        n &= ~((1 << pos) - 1)
        
        # Insert (c1-1) ones on the right
        n |= (1 << (c1 - 1)) - 1
        
        explanation_steps = [
            f"Original number: {original_n} ({bin(original_n)})",
            f"Trailing zeros: {c0}, Ones after trailing zeros: {c1}",
            f"Rightmost non-trailing zero position: {pos}",
            f"Result: {n} ({bin(n)})"
        ]
        
        return {
            'result': n,
            'input_binary': bin(original_n),
            'result_binary': bin(n),
            'explanation': ' | '.join(explanation_steps)
        }
    
    def count_set_bits(self, n):
        """Helper method to count number of 1s in binary representation"""
        count = 0
        while n:
            count += n & 1
            n >>= 1
        return count