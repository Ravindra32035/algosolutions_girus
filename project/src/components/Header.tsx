import React from 'react';
import { Cpu, Github, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Cpu size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AlgoSolutions
              </h1>
              <p className="text-xs text-gray-500">
                Advanced Problem Solving
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span>Production Ready</span>
            </div>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;