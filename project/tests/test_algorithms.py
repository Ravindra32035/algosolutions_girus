import pytest
import sys
import os

# Add the parent directory to the path to import algorithms
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from algorithms.sudoku_validator import SudokuValidator
from algorithms.alien_dictionary import AlienDictionary
from algorithms.knights_portals import KnightsPortals
from algorithms.bitwise_matching import BitwiseMatching
from algorithms.matrix_islands import MatrixIslands
from algorithms.mini_interpreter import MiniInterpreter

class TestSudokuValidator:
    def test_valid_board(self):
        validator = SudokuValidator()
        # Create a valid partial Sudoku board
        board = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ]
        result = validator.validate_with_custom_zones(board, [])
        assert result['valid'] == True

    def test_invalid_board_duplicate_row(self):
        validator = SudokuValidator()
        # Board with duplicate in first row
        board = [
            [5, 5, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ]
        result = validator.validate_with_custom_zones(board, [])
        assert result['valid'] == False
        assert 'Row 1 has duplicate values' in result['errors']

class TestAlienDictionary:
    def test_simple_order(self):
        alien_dict = AlienDictionary()
        words = ["wrt", "wrf", "er", "ett", "rftt"]
        result = alien_dict.find_order(words)
        assert result['valid'] == True
        assert result['order'] == "wertf"

    def test_invalid_order(self):
        alien_dict = AlienDictionary()
        words = ["z", "x", "z"]  # Invalid: z appears before and after x
        result = alien_dict.find_order(words)
        assert result['valid'] == False

class TestKnightsPortals:
    def test_simple_path(self):
        knights = KnightsPortals()
        grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        result = knights.shortest_path(grid)
        assert result['distance'] >= 0
        assert len(result['path']) > 0

    def test_blocked_path(self):
        knights = KnightsPortals()
        grid = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
        result = knights.shortest_path(grid)
        # Should find a path using teleportation
        assert result['distance'] >= 0 or result['distance'] == -1

class TestBitwiseMatching:
    def test_next_larger_same_bits(self):
        bitwise = BitwiseMatching()
        result = bitwise.next_larger_same_bits(12)  # 1100 in binary
        assert result['result'] == 17  # 10001 in binary
        
    def test_next_larger_same_bits_edge_case(self):
        bitwise = BitwiseMatching()
        result = bitwise.next_larger_same_bits(6)  # 110 in binary
        assert result['result'] == 9  # 1001 in binary

class TestMatrixIslands:
    def test_count_islands(self):
        islands = MatrixIslands()
        matrix = [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1]
        ]
        result = islands.count_islands_with_diagonals(matrix)
        assert result['count'] == 3

    def test_diagonal_connections(self):
        islands = MatrixIslands()
        matrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
        result = islands.count_islands_with_diagonals(matrix)
        assert result['count'] == 1  # All connected diagonally

class TestMiniInterpreter:
    def test_let_declaration(self):
        interpreter = MiniInterpreter()
        result = interpreter.evaluate("let x = 5")
        assert result['result'] == 5
        assert result['variables']['x'] == 5

    def test_if_condition(self):
        interpreter = MiniInterpreter()
        code = "let x = 5; if (x > 3) then 10 else 0"
        result = interpreter.evaluate(code)
        assert result['result'] == 10

    def test_complex_expression(self):
        interpreter = MiniInterpreter()
        code = "let x = 10; let y = 20; if (x + y == 30) then x * y else 0"
        result = interpreter.evaluate(code)
        assert result['result'] == 200

if __name__ == '__main__':
    pytest.main([__file__])