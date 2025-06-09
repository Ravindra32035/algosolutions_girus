import React, { useState } from 'react';
import { Play, Info } from 'lucide-react';

interface BitwiseMatchingSolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const BitwiseMatchingSolver: React.FC<BitwiseMatchingSolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [number, setNumber] = useState<number>(12);

  const handleSolve = () => {
    onSolve({ number });
  };

  const loadSample = (n: number) => {
    setNumber(n);
  };

  const countBits = (n: number) => {
    return n.toString(2).split('1').length - 1;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bitwise Matching Input</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Number
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          {number > 0 && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Binary:</span> {number.toString(2)}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Number of 1s:</span> {countBits(number)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <div className="flex items-start space-x-2">
            <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Problem:</p>
              <p>Find the next larger integer that has the same number of binary 1s as the input number.</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => loadSample(12)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Sample: 12
          </button>
          <button
            onClick={() => loadSample(6)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Sample: 6
          </button>
          <button
            onClick={() => loadSample(78)}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Sample: 78
          </button>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading || number <= 0}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Computing...' : 'Find Next Larger Number'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bitwise Results</h3>
          
          <div className={`p-4 rounded-lg mb-4 ${result.result >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${result.result >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              {result.result >= 0 ? `✅ Next Number Found: ${result.result}` : '❌ No Solution Available'}
            </p>
          </div>

          {result.result >= 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Input Number</p>
                  <p className="text-lg font-mono text-blue-700">{result.input}</p>
                  <p className="text-sm font-mono text-blue-600">{result.input_binary}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {countBits(result.input)} ones
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Result Number</p>
                  <p className="text-lg font-mono text-green-700">{result.result}</p>
                  <p className="text-sm font-mono text-green-600">{result.result_binary}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {countBits(result.result)} ones
                  </p>
                </div>
              </div>

              {result.explanation && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Algorithm Steps:</p>
                  <p className="text-sm text-blue-700">{result.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BitwiseMatchingSolver;