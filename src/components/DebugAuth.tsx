import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugAuth: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Debug Auth</h3>
      <div className="space-y-1">
        <div>Loading: {isLoading ? 'true' : 'false'}</div>
        <div>Authenticated: {isAuthenticated ? 'true' : 'false'}</div>
        <div>User ID: {user?.id || 'null'}</div>
        <div>User Email: {user?.email || 'null'}</div>
        <div>User Role: {user?.roles?.name || 'null'}</div>
        <div>User Active: {user?.is_active ? 'true' : 'false'}</div>
      </div>
    </div>
  );
};

export default DebugAuth;
