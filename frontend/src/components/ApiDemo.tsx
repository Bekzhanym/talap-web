import { useState } from 'react';
import { apiService } from '../services/api';

export const ApiDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleGetUserInfo = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await apiService.getUserInfo();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await apiService.saveProgress({
        progress: {
          completedLessons: 5,
          currentLesson: 'Lesson 6',
          score: 85
        },
        timestamp: new Date().toISOString()
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTest = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await apiService.generateTest({
        topic: 'JavaScript',
        difficulty: 'intermediate',
        question_count: 5
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          API Demo
        </h2>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={handleGetUserInfo}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Get User Info
            </button>
            
            <button
              onClick={handleSaveProgress}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Save Progress
            </button>
            
            <button
              onClick={handleGenerateTest}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Generate Test
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-sm text-gray-600">Loading...</span>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {result && (
            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">API Response:</h3>
              <pre className="text-sm text-gray-600 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 