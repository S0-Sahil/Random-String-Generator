import React, { useState, useCallback, useEffect } from 'react';

const RandomStringGenerator = () => {
  // State hooks for managing the application
  const [generatedString, setGeneratedString] = useState('');
  const [stringLength, setStringLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [history, setHistory] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // useCallback hook to memoize the generate function
  const generateRandomString = useCallback(() => {
    let charset = '';
    
    // Build character set based on selected options
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    // Return if no character type selected
    if (charset === '') {
      setGeneratedString('Please select at least one character type');
      return;
    }

    // Generate random string
    let result = '';
    for (let i = 0; i < stringLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedString(result);
    
    // Add to history (keep last 5)
    setHistory(prev => [result, ...prev.slice(0, 4)]);
  }, [stringLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // useEffect hook to generate initial string on component mount
  useEffect(() => {
    generateRandomString();
  }, []); // Empty dependency array means this runs once on mount

  // useEffect hook to reset copy success message
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const copyToClipboard = useCallback(() => {
    if (generatedString && generatedString !== 'Please select at least one character type') {
      navigator.clipboard.writeText(generatedString);
      setCopySuccess(true);
    }
  }, [generatedString]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Random String Generator
          </h1>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-600">Generated String</label>
              {copySuccess && (
                <span className="text-sm text-green-600 font-medium animate-pulse">
                  Copied!
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={generatedString}
                readOnly
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Copy
              </button>
            </div>
          </div>

          
          <div className="space-y-6 mb-6">
           
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span>String Length</span>
                <span className="text-blue-600 font-bold">{stringLength}</span>
              </label>
              <input
                type="range"
                min="4"
                max="50"
                value={stringLength}
                onChange={(e) => setStringLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Character Types
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Lowercase (a-z)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Numbers (0-9)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Symbols (!@#$...)</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={generateRandomString}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate New String
          </button>

          {/* History Section */}
          {history.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Recent History</h2>
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-2">
                {history.map((str, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-gray-50 rounded-lg font-mono text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {str}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-800 text-center">
            This generator uses React Hooks: useState for state management, 
            useCallback for optimized functions, and useEffect for side effects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
