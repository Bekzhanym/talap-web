interface ConfigErrorProps {
  error: string;
}

export const ConfigError: React.FC<ConfigErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">
              Configuration Error
            </h3>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-red-700 mb-4">
            {error}
          </p>
          
          <div className="bg-gray-50 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              How to fix:
            </h4>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. Copy <code className="bg-gray-200 px-1 rounded">env.example</code> to <code className="bg-gray-200 px-1 rounded">.env</code></li>
              <li>2. Update the Firebase configuration in your <code className="bg-gray-200 px-1 rounded">.env</code> file</li>
              <li>3. Restart the development server</li>
            </ol>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Make sure your <code className="bg-gray-200 px-1 rounded">.env</code> file contains all required Firebase configuration variables.</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 