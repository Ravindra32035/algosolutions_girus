import React, { useState } from 'react';
import { Play, Code } from 'lucide-react';

interface MiniInterpreterSolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const MiniInterpreterSolver: React.FC<MiniInterpreterSolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [code, setCode] = useState('let x = 10;\nlet y = 20;\nif (x + y == 30) then x * y else 0');

  const handleSolve = () => {
    onSolve({ code });
  };

  const loadSample = (sampleCode: string) => {
    setCode(sampleCode);
  };

  const samples = [
    {
      name: 'Basic Let & If',
      code: 'let x = 10;\nlet y = 20;\nif (x + y == 30) then x * y else 0'
    },
    {
      name: 'Nested Conditions',
      code: 'let a = 5;\nlet b = 3;\nif (a > b) then if (a > 4) then a * 2 else a else b'
    },
    {
      name: 'Boolean Logic',
      code: 'let flag = true;\nif (flag == true) then 100 else 0'
    },
    {
      name: 'Arithmetic',
      code: 'let x = 15;\nlet y = x + 5;\nlet z = y * 2;\nz'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mini Interpreter Input</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code to Evaluate
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm"
            rows={6}
            placeholder="Enter your code here..."
          />
          
          <div className="mt-2 text-xs text-gray-600">
            <p className="mb-1"><strong>Supported syntax:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li><code>let variable = expression</code> - Variable declaration</li>
              <li><code>if (condition) then expr1 else expr2</code> - Conditional</li>
              <li><code>+, -, *, /, ==, !=, &lt;, &gt;, &lt;=, &gt;=</code> - Operations</li>
              <li><code>true, false</code> - Boolean literals</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Sample Programs:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {samples.map((sample, index) => (
              <button
                key={index}
                onClick={() => loadSample(sample.code)}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-left"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading || !code.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Evaluating...' : 'Evaluate Code'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Results</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-2">Final Result:</p>
              <p className="text-lg font-mono text-green-700">
                {typeof result.result === 'string' && result.result.startsWith('Error:') 
                  ? result.result
                  : JSON.stringify(result.result)
                }
              </p>
            </div>

            {result.variables && Object.keys(result.variables).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Variables:</p>
                <div className="space-y-1">
                  {Object.entries(result.variables).map(([name, value]) => (
                    <div key={name} className="flex items-center space-x-2">
                      <code className="text-blue-700 font-mono text-sm bg-blue-100 px-2 py-1 rounded">
                        {name}
                      </code>
                      <span className="text-blue-600">=</span>
                      <span className="text-blue-700 font-mono">
                        {JSON.stringify(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.execution_steps && result.execution_steps.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-800 mb-2">Execution Steps:</p>
                <div className="space-y-1">
                  {result.execution_steps.map((step: string, index: number) => (
                    <div key={index} className="text-sm font-mono text-gray-700 bg-white px-2 py-1 rounded">
                      <span className="text-gray-500 mr-2">{index + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniInterpreterSolver;