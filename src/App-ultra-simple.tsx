import { FC } from 'react';

const App: FC = () => {
  console.log('🚀 App MasterCom - Version ultra-simple');
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          MasterCom
        </h1>
        <p className="text-gray-600 mb-8">
          Si vous voyez ce message, React fonctionne correctement.
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Application fonctionnelle
        </div>
      </div>
    </div>
  );
};

export default App;
