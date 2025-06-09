class MatrixIslands:
    """
    Matrix Islands with Diagonals
    
    Counts the number of islands in a matrix of 0s and 1s.
    Islands are formed using horizontal, vertical, or diagonal connections.
    """
    
    def __init__(self):
        # 8 directions: horizontal, vertical, and diagonal
        self.directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]
    
    def count_islands_with_diagonals(self, matrix):
        """
        Count islands including diagonal connections
        
        Args:
            matrix: 2D matrix of 0s and 1s
            
        Returns:
            dict: Island count, details, and visualization
        """
        if not matrix or not matrix[0]:
            return {
                'count': 0,
                'islands': [],
                'visualization': []
            }
        
        rows, cols = len(matrix), len(matrix[0])
        visited = [[False] * cols for _ in range(rows)]
        islands = []
        
        for i in range(rows):
            for j in range(cols):
                if matrix[i][j] == 1 and not visited[i][j]:
                    # Found a new island
                    island_cells = []
                    self._dfs(matrix, i, j, visited, island_cells)
                    islands.append({
                        'id': len(islands) + 1,
                        'cells': island_cells,
                        'size': len(island_cells)
                    })
        
        visualization = self._create_visualization(matrix, islands)
        
        return {
            'count': len(islands),
            'islands': islands,
            'visualization': visualization
        }
    
    def _dfs(self, matrix, row, col, visited, island_cells):
        """
        Depth-first search to explore island
        
        Args:
            matrix: Input matrix
            row, col: Current position
            visited: Visited cells tracker
            island_cells: List to store current island cells
        """
        rows, cols = len(matrix), len(matrix[0])
        
        # Check bounds and conditions
        if (row < 0 or row >= rows or col < 0 or col >= cols or
            visited[row][col] or matrix[row][col] == 0):
            return
        
        # Mark as visited and add to current island
        visited[row][col] = True
        island_cells.append((row, col))
        
        # Explore all 8 directions
        for dr, dc in self.directions:
            self._dfs(matrix, row + dr, col + dc, visited, island_cells)
    
    def _create_visualization(self, matrix, islands):
        """
        Create visualization showing different islands
        
        Args:
            matrix: Original matrix
            islands: List of island information
            
        Returns:
            list: Visualization grid with island IDs
        """
        rows, cols = len(matrix), len(matrix[0])
        viz = [['.' for _ in range(cols)] for _ in range(rows)]
        
        # Mark islands with their IDs
        for island in islands:
            island_id = str(island['id'] % 10)  # Use single digit for display
            for row, col in island['cells']:
                viz[row][col] = island_id
        
        # Mark water as '0'
        for i in range(rows):
            for j in range(cols):
                if matrix[i][j] == 0:
                    viz[i][j] = '0'
        
        return [''.join(row) for row in viz]
    
    def get_island_statistics(self, islands):
        """
        Get statistics about the islands
        
        Args:
            islands: List of island information
            
        Returns:
            dict: Statistics about islands
        """
        if not islands:
            return {
                'total_islands': 0,
                'total_cells': 0,
                'average_size': 0,
                'largest_island': None,
                'smallest_island': None
            }
        
        sizes = [island['size'] for island in islands]
        
        return {
            'total_islands': len(islands),
            'total_cells': sum(sizes),
            'average_size': sum(sizes) / len(sizes),
            'largest_island': max(islands, key=lambda x: x['size']),
            'smallest_island': min(islands, key=lambda x: x['size'])
        }