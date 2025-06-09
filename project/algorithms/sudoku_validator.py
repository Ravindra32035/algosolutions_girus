class SudokuValidator:
    """
    Sudoku Validator with Custom Zones
    
    Validates a 9x9 Sudoku board including standard rules and custom zones.
    Each custom zone must contain digits 1-9 without repetition.
    """
    
    def __init__(self):
        self.board_size = 9
        self.valid_digits = set(range(1, 10))
    
    def validate_with_custom_zones(self, board, custom_zones):
        """
        Validate Sudoku board with custom zones
        
        Args:
            board: 9x9 matrix with integers 0-9 (0 represents empty cell)
            custom_zones: List of zones, each zone is a list of (row, col) coordinates
            
        Returns:
            dict: Validation result with details
        """
        if not self._validate_board_format(board):
            return {
                'valid': False,
                'errors': ['Invalid board format'],
                'details': 'Board must be 9x9 matrix with integers 0-9'
            }
        
        errors = []
        details = {
            'rows': self._validate_rows(board),
            'columns': self._validate_columns(board),
            'boxes': self._validate_3x3_boxes(board),
            'custom_zones': self._validate_custom_zones(board, custom_zones)
        }
        
        # Collect all errors
        for section, result in details.items():
            if not result['valid']:
                errors.extend(result['errors'])
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'details': details
        }
    
    def _validate_board_format(self, board):
        """Check if board has correct format"""
        if not isinstance(board, list) or len(board) != 9:
            return False
        
        for row in board:
            if not isinstance(row, list) or len(row) != 9:
                return False
            for cell in row:
                if not isinstance(cell, int) or cell < 0 or cell > 9:
                    return False
        
        return True
    
    def _validate_rows(self, board):
        """Validate all rows"""
        errors = []
        
        for i, row in enumerate(board):
            filled_cells = [cell for cell in row if cell != 0]
            if len(filled_cells) != len(set(filled_cells)):
                errors.append(f'Row {i+1} has duplicate values')
        
        return {'valid': len(errors) == 0, 'errors': errors}
    
    def _validate_columns(self, board):
        """Validate all columns"""
        errors = []
        
        for col in range(9):
            column = [board[row][col] for row in range(9)]
            filled_cells = [cell for cell in column if cell != 0]
            if len(filled_cells) != len(set(filled_cells)):
                errors.append(f'Column {col+1} has duplicate values')
        
        return {'valid': len(errors) == 0, 'errors': errors}
    
    def _validate_3x3_boxes(self, board):
        """Validate all 3x3 boxes"""
        errors = []
        
        for box_row in range(3):
            for box_col in range(3):
                box_cells = []
                for r in range(3):
                    for c in range(3):
                        row = box_row * 3 + r
                        col = box_col * 3 + c
                        box_cells.append(board[row][col])
                
                filled_cells = [cell for cell in box_cells if cell != 0]
                if len(filled_cells) != len(set(filled_cells)):
                    errors.append(f'3x3 box at ({box_row+1}, {box_col+1}) has duplicate values')
        
        return {'valid': len(errors) == 0, 'errors': errors}
    
    def _validate_custom_zones(self, board, custom_zones):
        """Validate custom zones"""
        errors = []
        zone_details = []
        
        for i, zone in enumerate(custom_zones):
            if len(zone) != 9:
                errors.append(f'Custom zone {i+1} must have exactly 9 cells')
                continue
            
            zone_values = []
            for row, col in zone:
                if 0 <= row < 9 and 0 <= col < 9:
                    zone_values.append(board[row][col])
                else:
                    errors.append(f'Custom zone {i+1} has invalid coordinates ({row}, {col})')
                    break
            
            filled_cells = [cell for cell in zone_values if cell != 0]
            if len(filled_cells) != len(set(filled_cells)):
                errors.append(f'Custom zone {i+1} has duplicate values')
            
            zone_details.append({
                'zone_index': i + 1,
                'coordinates': zone,
                'values': zone_values,
                'valid': len(filled_cells) == len(set(filled_cells))
            })
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'zones': zone_details
        }