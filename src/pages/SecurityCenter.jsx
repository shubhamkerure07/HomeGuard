import React from 'react';
import Header from '../components/layout/Header';
import { useHome } from '../context/HomeContext';
import SecurityModes from '../components/security/SecurityModes';
import SensorCard from '../components/security/SensorCard';
import EmergencyPanel from '../components/security/EmergencyPanel';
import SecurityAlert from '../components/security/SecurityAlert';

export default function SecurityCenter() {
  const { activeAlert, securitySensors: sensors = [] } = useHome();

  return (
    <div className="flex flex-col gap-6 p-6">
      <Header title="Security Center" subtitle="Monitor and manage home security" />
      
      {activeAlert && <SecurityAlert />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SecurityModes />
          
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Sensors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sensors.map(sensor => (
                <SensorCard key={sensor.id} sensor={sensor} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <EmergencyPanel />
        </div>
      </div>
    </div>
  );
}
