import React, { useState } from 'react';
import { Play, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import SudokuSolver from './solvers/SudokuSolver';
import AlienDictionarySolver from './solvers/AlienDictionarySolver';
import KnightsPortalsSolver from './solvers/KnightsPortalsSolver';
import BitwiseMatchingSolver from './solvers/BitwiseMatchingSolver';
import MatrixIslandsSolver from './solvers/MatrixIslandsSolver';
import MiniInterpreterSolver from './solvers/MiniInterpreterSolver';

interface ProblemSolverProps {
  problemId: string;
  problemTitle: string;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ problemId, problemTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async (data: any) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/${problemId}${problemId === 'sudoku' ? '/validate' : ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setResult(responseData);
      } else {
        setError(responseData.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the backend server. Please make sure the Flask server is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSolver = () => {
    const solverProps = { onSolve: handleSolve, isLoading, result, error };

    switch (problemId) {
      case 'sudoku':
        return <SudokuSolver {...solverProps} />;
      case 'alien-dictionary':
        return <AlienDictionarySolver {...solverProps} />;
      case 'knights-portals':
        return <KnightsPortalsSolver {...solverProps} />;
      case 'bitwise-matching':
        return <BitwiseMatchingSolver {...solverProps} />;
      case 'matrix-islands':
        return <MatrixIslandsSolver {...solverProps} />;
      case 'mini-interpreter':
        return <MiniInterpreterSolver {...solverProps} />;
      default:
        return <div>Solver not found</div>;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{problemTitle}</h2>
        <p className="text-gray-600">Interactive problem solver with real-time visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {renderSolver()}
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Solution Status</h3>
            
            {isLoading && (
              <div className="flex items-center space-x-3 text-blue-600">
                <RefreshCw size={20} className="animate-spin" />
                <span>Processing...</span>
              </div>
            )}

            {error && (
              <div className="flex items-start space-x-3 text-red-600">
                <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
              </div>
            )}

            {result && !error && (
              <div className="flex items-start space-x-3 text-green-600">
                <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Solution Found</p>
                  <p className="text-sm text-green-500 mt-1">Check the results below</p>
                </div>
              </div>
            )}

            {!isLoading && !result && !error && (
              <p className="text-gray-500 italic">Ready to solve - enter your input and click solve</p>
            )}
          </div>

          {/* Results Card */}
          {result && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-4">
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProblemSolver;