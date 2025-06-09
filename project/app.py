from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithms.sudoku_validator import SudokuValidator
from algorithms.alien_dictionary import AlienDictionary
from algorithms.knights_portals import KnightsPortals
from algorithms.bitwise_matching import BitwiseMatching
from algorithms.matrix_islands import MatrixIslands
from algorithms.mini_interpreter import MiniInterpreter

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/sudoku/validate', methods=['POST'])
def validate_sudoku():
    """Validate Sudoku board with custom zones"""
    try:
        data = request.get_json()
        board = data.get('board', [])
        custom_zones = data.get('custom_zones', [])
        
        validator = SudokuValidator()
        result = validator.validate_with_custom_zones(board, custom_zones)
        
        return jsonify({
            'success': True,
            'valid': result['valid'],
            'errors': result['errors'],
            'details': result['details']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/alien-dictionary', methods=['POST'])
def alien_dictionary():
    """Determine alien language character order"""
    try:
        data = request.get_json()
        words = data.get('words', [])
        
        alien_dict = AlienDictionary()
        result = alien_dict.find_order(words)
        
        return jsonify({
            'success': True,
            'order': result['order'],
            'valid': result['valid'],
            'explanation': result['explanation']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/knights-portals', methods=['POST'])
def knights_portals():
    """Find shortest path with teleportation option"""
    try:
        data = request.get_json()
        grid = data.get('grid', [])
        
        knights = KnightsPortals()
        result = knights.shortest_path(grid)
        
        return jsonify({
            'success': True,
            'shortest_path': result['path'],
            'distance': result['distance'],
            'used_teleport': result['used_teleport'],
            'path_visualization': result['visualization']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/bitwise-matching', methods=['POST'])
def bitwise_matching():
    """Find next larger integer with same number of 1s"""
    try:
        data = request.get_json()
        n = data.get('number', 0)
        
        bitwise = BitwiseMatching()
        result = bitwise.next_larger_same_bits(n)
        
        return jsonify({
            'success': True,
            'input': n,
            'input_binary': result['input_binary'],
            'result': result['result'],
            'result_binary': result['result_binary'],
            'explanation': result['explanation']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/matrix-islands', methods=['POST'])
def matrix_islands():
    """Count islands including diagonal connections"""
    try:
        data = request.get_json()
        matrix = data.get('matrix', [])
        
        islands = MatrixIslands()
        result = islands.count_islands_with_diagonals(matrix)
        
        return jsonify({
            'success': True,
            'island_count': result['count'],
            'islands': result['islands'],
            'visualization': result['visualization']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/mini-interpreter', methods=['POST'])
def mini_interpreter():
    """Evaluate let declarations and if conditions"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        interpreter = MiniInterpreter()
        result = interpreter.evaluate(code)
        
        return jsonify({
            'success': True,
            'result': result['result'],
            'variables': result['variables'],
            'execution_steps': result['steps']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Algorithmic Solutions API is running'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)