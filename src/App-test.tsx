import { FC } from 'react';

const AppTest: FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          MasterCom Test
        </h1>
        <p className="text-gray-600">
          Si vous voyez ce message, React fonctionne correctement.
        </p>
      </div>
    </div>
  );
};

export default AppTest;
