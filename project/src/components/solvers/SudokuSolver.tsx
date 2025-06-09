import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface SudokuSolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const SudokuSolver: React.FC<SudokuSolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [board, setBoard] = useState<number[][]>(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [customZones, setCustomZones] = useState<string>('');

  const sampleBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const handleCellChange = (row: number, col: number, value: string) => {
    const num = parseInt(value) || 0;
    if (num >= 0 && num <= 9) {
      const newBoard = [...board];
      newBoard[row][col] = num;
      setBoard(newBoard);
    }
  };

  const loadSample = () => {
    setBoard(sampleBoard.map(row => [...row]));
  };

  const clearBoard = () => {
    setBoard(Array(9).fill(null).map(() => Array(9).fill(0)));
  };

  const handleSolve = () => {
    let zones = [];
    if (customZones.trim()) {
      try {
        zones = JSON.parse(customZones);
      } catch (e) {
        alert('Invalid custom zones format. Please use valid JSON.');
        return;
      }
    }

    onSolve({
      board,
      custom_zones: zones
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sudoku Board Input</h3>
        
        <div className="grid grid-cols-9 gap-1 mb-4 bg-gray-200 p-2 rounded-lg">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                min="0"
                max="9"
                value={cell || ''}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`w-8 h-8 text-center text-sm border-2 rounded font-medium
                  ${cell ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-white border-gray-300'}
                  ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'mb-1' : ''}
                  ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'mr-1' : ''}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
              />
            ))
          )}
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Load Sample
          </button>
          <button
            onClick={clearBoard}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Clear</span>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Zones (optional)
          </label>
          <textarea
            value={customZones}
            onChange={(e) => setCustomZones(e.target.value)}
            placeholder='[[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]]'
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            JSON format: array of zones, each zone is array of [row, col] coordinates
          </p>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Validating...' : 'Validate Sudoku'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Results</h3>
          
          <div className={`p-4 rounded-lg mb-4 ${result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${result.valid ? 'text-green-800' : 'text-red-800'}`}>
              {result.valid ? '✅ Valid Sudoku!' : '❌ Invalid Sudoku'}
            </p>
            {result.errors && result.errors.length > 0 && (
              <ul className="mt-2 text-sm text-red-600">
                {result.errors.map((error: string, index: number) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            )}
          </div>

          {result.details && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${result.details.rows.valid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="font-medium text-sm">Rows: {result.details.rows.valid ? '✅' : '❌'}</p>
                </div>
                <div className={`p-3 rounded-lg ${result.details.columns.valid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="font-medium text-sm">Columns: {result.details.columns.valid ? '✅' : '❌'}</p>
                </div>
                <div className={`p-3 rounded-lg ${result.details.boxes.valid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="font-medium text-sm">3x3 Boxes: {result.details.boxes.valid ? '✅' : '❌'}</p>
                </div>
                <div className={`p-3 rounded-lg ${result.details.custom_zones.valid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="font-medium text-sm">Custom Zones: {result.details.custom_zones.valid ? '✅' : '❌'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SudokuSolver;