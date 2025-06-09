import React, { useState } from 'react';
import { Brain, Code, Shield, Zap, Grid3X3, Calculator } from 'lucide-react';
import ProblemSolver from './components/ProblemSolver';
import Header from './components/Header';
import Navigation from './components/Navigation';

interface Problem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const problems: Problem[] = [
  {
    id: 'sudoku',
    title: 'Sudoku Validator',
    description: 'Validate 9x9 Sudoku boards with custom zones',
    icon: <Grid3X3 size={24} />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'alien-dictionary',
    title: 'Alien Dictionary',
    description: 'Determine character order from sorted alien words',
    icon: <Code size={24} />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'knights-portals',
    title: 'Knights & Portals',
    description: 'Find shortest path with teleportation option',
    icon: <Shield size={24} />,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'bitwise-matching',
    title: 'Bitwise Matching',
    description: 'Next larger integer with same number of 1s',
    icon: <Calculator size={24} />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'matrix-islands',
    title: 'Matrix Islands',
    description: 'Count islands with diagonal connections',
    icon: <Grid3X3 size={24} />,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'mini-interpreter',
    title: 'Mini Interpreter',
    description: 'Evaluate let declarations and if conditions',
    icon: <Brain size={24} />,
    color: 'from-pink-500 to-rose-500'
  }
];

function App() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      {!selectedProblem ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Algorithmic Solutions Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore advanced algorithmic solutions with beautiful visualizations and 
              interactive problem solving. Each solution includes detailed explanations 
              and comprehensive test cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(problem.id)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-r ${problem.color} flex items-center justify-center`}>
                    <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                      {problem.icon}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Solve Problem</span>
                      <Zap size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <>
          <Navigation 
            selectedProblem={selectedProblem}
            problems={problems}
            onBack={() => setSelectedProblem(null)}
            onSelect={setSelectedProblem}
          />
          <ProblemSolver 
            problemId={selectedProblem} 
            problemTitle={problems.find(p => p.id === selectedProblem)?.title || ''}
          />
        </>
      )}
    </div>
  );
}

export default App;