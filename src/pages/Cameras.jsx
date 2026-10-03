import React from 'react';
import Header from '../components/layout/Header';
import CameraFeed from '../components/cameras/CameraFeed';
import { useHome } from '../context/HomeContext';

const Cameras = () => {
  const { cameras } = useHome();
  const total = cameras.length;
  const online = cameras.filter(c => c.isOnline ?? (c.status === 'online')).length;

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      <Header title="Cameras" />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-dark-800/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div>
              <h2 className="text-xl font-bold">Camera System</h2>
              <p className="text-dark-300 font-light mt-1">Monitor your property in real-time</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-light text-dark-300">Total Cameras</div>
              <div className="text-2xl font-semibold">{total} <span className="text-sm text-cyan-500 ml-1">({online} Online)</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cameras.map(camera => (
              <CameraFeed key={camera.id} camera={camera} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cameras;
