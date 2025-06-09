import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface MatrixIslandsSolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const MatrixIslandsSolver: React.FC<MatrixIslandsSolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [matrixSize, setMatrixSize] = useState(6);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(6).fill(null).map(() => Array(6).fill(0))
  );

  const handleCellClick = (row: number, col: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = newMatrix[row][col] === 0 ? 1 : 0;
    setMatrix(newMatrix);
  };

  const clearMatrix = () => {
    setMatrix(Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0)));
  };

  const loadSample = () => {
    const sample = [
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 0],
      [1, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0]
    ];
    setMatrix(sample);
  };

  const changeMatrixSize = (newSize: number) => {
    setMatrixSize(newSize);
    setMatrix(Array(newSize).fill(null).map(() => Array(newSize).fill(0)));
  };

  const handleSolve = () => {
    onSolve({ matrix });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Matrix Islands Input</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matrix Size
          </label>
          <select
            value={matrixSize}
            onChange={(e) => changeMatrixSize(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
          </select>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Click cells to toggle land (dark = land, light = water). Islands include diagonal connections.
          </p>
          <div 
            className="inline-grid gap-1 bg-gray-200 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${matrixSize}, 1fr)` }}
          >
            {matrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded border-2 transition-all duration-200
                    ${cell === 0 
                      ? 'bg-blue-100 border-blue-200 hover:bg-blue-200' 
                      : 'bg-green-600 border-green-700 hover:bg-green-700'
                    }
                  `}
                >
                </button>
              ))
            )}
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-100 rounded border border-blue-200"></div>
              <span>Water (0)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Land (1)</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Load Sample
          </button>
          <button
            onClick={clearMatrix}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Clear</span>
          </button>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Counting Islands...' : 'Count Islands'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Island Results</h3>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
            <p className="font-medium text-green-800">
              🏝️ Found {result.island_count} island{result.island_count !== 1 ? 's' : ''}
            </p>
          </div>

          {result.islands && result.islands.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Island Details:</p>
              <div className="space-y-2">
                {result.islands.map((island: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Island {island.id}:</span> {island.size} cells
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Coordinates: {island.cells.map(([r, c]: [number, number]) => `(${r},${c})`).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.visualization && result.visualization.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Island Visualization:</p>
              <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg">
                {result.visualization.map((row: string, index: number) => (
                  <div key={index} className="leading-relaxed">
                    {row.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className={`inline-block w-6 text-center font-bold ${
                          char === '0' ? 'text-blue-500' :
                          char >= '1' && char <= '9' ? `text-green-600` :
                          'text-gray-400'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                0 = Water, Numbers = Different islands
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatrixIslandsSolver;