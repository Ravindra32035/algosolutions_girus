from collections import defaultdict, deque

class AlienDictionary:
    """
    Alien Dictionary Order Finder
    
    Given a sorted list of words from an alien language,
    determines the character order used in that language.
    """
    
    def find_order(self, words):
        """
        Find the order of characters in alien language
        
        Args:
            words: List of words sorted in alien language order
            
        Returns:
            dict: Result containing order, validity, and explanation
        """
        if not words:
            return {
                'order': '',
                'valid': True,
                'explanation': 'Empty word list - no order to determine'
            }
        
        # Build adjacency graph from word comparisons
        graph = defaultdict(set)
        in_degree = defaultdict(int)
        all_chars = set()
        
        # Collect all characters
        for word in words:
            for char in word:
                all_chars.add(char)
                if char not in in_degree:
                    in_degree[char] = 0
        
        # Build graph by comparing adjacent words
        explanation_steps = []
        
        for i in range(len(words) - 1):
            word1, word2 = words[i], words[i + 1]
            min_len = min(len(word1), len(word2))
            
            # Find first differing character
            for j in range(min_len):
                if word1[j] != word2[j]:
                    char1, char2 = word1[j], word2[j]
                    if char2 not in graph[char1]:
                        graph[char1].add(char2)
                        in_degree[char2] += 1
                        explanation_steps.append(f"'{word1}' vs '{word2}': {char1} comes before {char2}")
                    break
            else:
                # If word1 is longer than word2 and word2 is prefix of word1
                if len(word1) > len(word2):
                    return {
                        'order': '',
                        'valid': False,
                        'explanation': f"Invalid order: '{word2}' cannot come after '{word1}' if it's a prefix"
                    }
        
        # Topological sort using Kahn's algorithm
        queue = deque([char for char in all_chars if in_degree[char] == 0])
        result = []
        
        while queue:
            char = queue.popleft()
            result.append(char)
            
            for neighbor in graph[char]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # Check if there's a cycle (invalid ordering)
        if len(result) != len(all_chars):
            return {
                'order': '',
                'valid': False,
                'explanation': 'Cycle detected in character dependencies - invalid word order'
            }
        
        return {
            'order': ''.join(result),
            'valid': True,
            'explanation': f"Analysis steps: {'; '.join(explanation_steps)}"
        }