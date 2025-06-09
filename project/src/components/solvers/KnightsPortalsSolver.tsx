import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface KnightsPortalsSolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const KnightsPortalsSolver: React.FC<KnightsPortalsSolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<number[][]>(
    Array(5).fill(null).map(() => Array(5).fill(0))
  );

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(Array(gridSize).fill(null).map(() => Array(gridSize).fill(0)));
  };

  const loadSample = () => {
    const sample = [
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ];
    setGrid(sample);
  };

  const changeGridSize = (newSize: number) => {
    setGridSize(newSize);
    setGrid(Array(newSize).fill(null).map(() => Array(newSize).fill(0)));
  };

  const handleSolve = () => {
    onSolve({ grid });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Knights & Portals Grid</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grid Size
          </label>
          <select
            value={gridSize}
            onChange={(e) => changeGridSize(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
          </select>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Click cells to toggle obstacles (dark = obstacle, light = empty)
          </p>
          <div 
            className="inline-grid gap-1 bg-gray-200 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded border-2 transition-all duration-200 font-bold text-xs
                    ${cell === 0 
                      ? 'bg-white border-gray-300 hover:bg-gray-50' 
                      : 'bg-gray-800 border-gray-600 text-white'
                    }
                    ${rowIndex === 0 && colIndex === 0 ? 'ring-2 ring-green-400' : ''}
                    ${rowIndex === gridSize - 1 && colIndex === gridSize - 1 ? 'ring-2 ring-red-400' : ''}
                  `}
                >
                  {rowIndex === 0 && colIndex === 0 ? 'S' : 
                   rowIndex === gridSize - 1 && colIndex === gridSize - 1 ? 'E' : 
                   cell === 1 ? '■' : ''}
                </button>
              ))
            )}
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-400 rounded ring-1 ring-green-400"></div>
              <span>Start</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded ring-1 ring-red-400"></div>
              <span>End</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-800 rounded"></div>
              <span>Obstacle</span>
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
            onClick={clearGrid}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Clear</span>
          </button>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Finding Path...' : 'Find Shortest Path'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Results</h3>
          
          <div className={`p-4 rounded-lg mb-4 ${result.distance >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${result.distance >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              {result.distance >= 0 ? `✅ Path Found! Distance: ${result.distance}` : '❌ No Path Available'}
            </p>
            {result.used_teleport && (
              <p className="text-sm text-blue-600 mt-1">🌟 Used teleportation</p>
            )}
          </div>

          {result.path_visualization && result.path_visualization.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Path Visualization:</p>
              <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg">
                {result.path_visualization.map((row: string, index: number) => (
                  <div key={index} className="leading-relaxed">
                    {row.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className={`inline-block w-6 text-center ${
                          char === 'S' ? 'text-green-600 font-bold' :
                          char === 'E' ? 'text-red-600 font-bold' :
                          char === '#' ? 'text-gray-800' :
                          char >= '0' && char <= '9' ? 'text-blue-600 font-bold' :
                          'text-gray-400'
                        }`}
                      >
                        {char === '.' ? '·' : char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                S = Start, E = End, # = Obstacle, Numbers = Path steps, · = Empty
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KnightsPortalsSolver;