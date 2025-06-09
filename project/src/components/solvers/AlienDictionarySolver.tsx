import React, { useState } from 'react';
import { Play, Plus, Trash2 } from 'lucide-react';

interface AlienDictionarySolverProps {
  onSolve: (data: any) => void;
  isLoading: boolean;
  result: any;
  error: string | null;
}

const AlienDictionarySolver: React.FC<AlienDictionarySolverProps> = ({ onSolve, isLoading, result, error }) => {
  const [words, setWords] = useState<string[]>(['wrt', 'wrf', 'er', 'ett', 'rftt']);
  const [newWord, setNewWord] = useState('');

  const addWord = () => {
    if (newWord.trim() && !words.includes(newWord.trim())) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  };

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSolve = () => {
    onSolve({ words });
  };

  const loadSample = () => {
    setWords(['wrt', 'wrf', 'er', 'ett', 'rftt']);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alien Dictionary Input</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sorted Words from Alien Language
          </label>
          
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWord()}
              placeholder="Enter a word"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={addWord}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2 max-h-32 overflow-y-auto">
            {words.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
              >
                <span className="font-mono text-purple-700">{word}</span>
                <button
                  onClick={() => removeWord(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {words.length === 0 && (
            <p className="text-gray-500 text-sm italic">No words added yet</p>
          )}
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Load Sample
          </button>
        </div>

        <button
          onClick={handleSolve}
          disabled={isLoading || words.length === 0}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          <span>{isLoading ? 'Finding Order...' : 'Find Character Order'}</span>
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Order Results</h3>
          
          <div className={`p-4 rounded-lg mb-4 ${result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-medium ${result.valid ? 'text-green-800' : 'text-red-800'}`}>
              {result.valid ? '✅ Valid Order Found!' : '❌ Invalid Word Sequence'}
            </p>
            
            {result.valid && result.order && (
              <div className="mt-3">
                <p className="text-sm text-green-700 mb-2">Character Order:</p>
                <div className="flex space-x-2">
                  {result.order.split('').map((char: string, index: number) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-mono font-bold"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {result.explanation && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Explanation:</p>
              <p className="text-sm text-blue-700">{result.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlienDictionarySolver;