import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface NavigationProps {
  selectedProblem: string;
  problems: Problem[];
  onBack: () => void;
  onSelect: (problemId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  selectedProblem, 
  problems, 
  onBack, 
  onSelect 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const currentProblem = problems.find(p => p.id === selectedProblem);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Problems</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            {currentProblem && (
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-md bg-gradient-to-r ${currentProblem.color}`}>
                  <div className="text-white" style={{ fontSize: '16px' }}>
                    {currentProblem.icon}
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  {currentProblem.title}
                </span>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>Switch Problem</span>
              <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => {
                      onSelect(problem.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      problem.id === selectedProblem ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-md bg-gradient-to-r ${problem.color}`}>
                        <div className="text-white" style={{ fontSize: '14px' }}>
                          {problem.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {problem.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {problem.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;