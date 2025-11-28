import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface AppError {
  statusMessage: string;
  statusCode: number;
  data?: any;
}

interface ErrorContextType {
  error: AppError | null;
  throwError: (error: AppError) => void;
  resetError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: React.ComponentType<{ error: AppError | null; resetError: () => void }>;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback: Fallback }) => {
  const [error, setError] = useState<AppError | null>(null);

  const throwError = (err: AppError) => {
    setError(err);
  };

  const resetError = () => {
    setError(null);
  };

  if (error) {
    return <Fallback error={error} resetError={resetError} />;
  }

  return (
    <ErrorContext.Provider value={{ error, throwError, resetError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorHandler = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    // Return a dummy implementation if used outside provider to prevent crash during dev/test if not wrapped
    // But ideally it should throw.
    // For now, let's throw.
    throw new Error('useErrorHandler must be used within an ErrorBoundary');
  }
  return context;
};
