from collections import deque
import heapq

class KnightsPortals:
    """
    Knights and Portals Path Finder
    
    Finds the shortest path from top-left to bottom-right in a grid.
    You can teleport between any two empty cells exactly once.
    """
    
    def __init__(self):
        # Knight moves: 8 possible L-shaped moves
        self.knight_moves = [
            (-2, -1), (-2, 1), (-1, -2), (-1, 2),
            (1, -2), (1, 2), (2, -1), (2, 1)
        ]
    
    def shortest_path(self, grid):
        """
        Find shortest path with optional teleportation
        
        Args:
            grid: 2D matrix where 0 = empty, 1 = obstacle
            
        Returns:
            dict: Path information including distance and visualization
        """
        if not grid or not grid[0]:
            return {
                'path': [],
                'distance': -1,
                'used_teleport': False,
                'visualization': []
            }
        
        rows, cols = len(grid), len(grid[0])
        start = (0, 0)
        end = (rows - 1, cols - 1)
        
        # Check if start or end is blocked
        if grid[0][0] == 1 or grid[rows-1][cols-1] == 1:
            return {
                'path': [],
                'distance': -1,
                'used_teleport': False,
                'visualization': []
            }
        
        # Try path without teleportation first
        no_teleport_result = self._find_path_no_teleport(grid, start, end)
        
        # Try path with teleportation
        teleport_result = self._find_path_with_teleport(grid, start, end)
        
        # Return the better result
        if no_teleport_result['distance'] == -1:
            best_result = teleport_result
        elif teleport_result['distance'] == -1:
            best_result = no_teleport_result
        else:
            best_result = no_teleport_result if no_teleport_result['distance'] <= teleport_result['distance'] else teleport_result
        
        # Add visualization
        best_result['visualization'] = self._create_visualization(grid, best_result['path'])
        
        return best_result
    
    def _find_path_no_teleport(self, grid, start, end):
        """Find shortest path using only knight moves"""
        rows, cols = len(grid), len(grid[0])
        visited = set()
        queue = deque([(start[0], start[1], 0, [start])])
        
        while queue:
            row, col, dist, path = queue.popleft()
            
            if (row, col) == end:
                return {
                    'path': path,
                    'distance': dist,
                    'used_teleport': False
                }
            
            if (row, col) in visited:
                continue
            
            visited.add((row, col))
            
            # Try all knight moves
            for dr, dc in self.knight_moves:
                new_row, new_col = row + dr, col + dc
                
                if (0 <= new_row < rows and 0 <= new_col < cols and 
                    grid[new_row][new_col] == 0 and (new_row, new_col) not in visited):
                    queue.append((new_row, new_col, dist + 1, path + [(new_row, new_col)]))
        
        return {'path': [], 'distance': -1, 'used_teleport': False}
    
    def _find_path_with_teleport(self, grid, start, end):
        """Find shortest path with one teleportation allowed"""
        rows, cols = len(grid), len(grid[0])
        
        # State: (row, col, used_teleport, distance, path)
        # Use priority queue for Dijkstra-like approach
        pq = [(0, start[0], start[1], False, [start])]
        visited = set()
        
        while pq:
            dist, row, col, used_teleport, path = heapq.heappop(pq)
            
            if (row, col) == end:
                return {
                    'path': path,
                    'distance': dist,
                    'used_teleport': used_teleport
                }
            
            state = (row, col, used_teleport)
            if state in visited:
                continue
            
            visited.add(state)
            
            # Regular knight moves
            for dr, dc in self.knight_moves:
                new_row, new_col = row + dr, col + dc
                
                if (0 <= new_row < rows and 0 <= new_col < cols and 
                    grid[new_row][new_col] == 0):
                    new_state = (new_row, new_col, used_teleport)
                    if new_state not in visited:
                        heapq.heappush(pq, (dist + 1, new_row, new_col, used_teleport, 
                                          path + [(new_row, new_col)]))
            
            # Teleportation (if not used yet)
            if not used_teleport:
                for tr in range(rows):
                    for tc in range(cols):
                        if grid[tr][tc] == 0 and (tr, tc) != (row, col):
                            new_state = (tr, tc, True)
                            if new_state not in visited:
                                heapq.heappush(pq, (dist + 1, tr, tc, True, 
                                              path + [(tr, tc)]))
        
        return {'path': [], 'distance': -1, 'used_teleport': False}
    
    def _create_visualization(self, grid, path):
        """Create visualization of the path on the grid"""
        if not path:
            return []
        
        rows, cols = len(grid), len(grid[0])
        viz = [['.' if grid[i][j] == 0 else '#' for j in range(cols)] for i in range(rows)]
        
        # Mark path
        for i, (row, col) in enumerate(path):
            if i == 0:
                viz[row][col] = 'S'  # Start
            elif i == len(path) - 1:
                viz[row][col] = 'E'  # End
            else:
                viz[row][col] = str(i % 10)  # Path step
        
        return [''.join(row) for row in viz]