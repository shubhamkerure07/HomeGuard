import React from 'react';
import Header from '../components/layout/Header';
import StatusCards from '../components/dashboard/StatusCards';
import SecurityOverview from '../components/dashboard/SecurityOverview';
import EnergyChart from '../components/dashboard/EnergyChart';
import RoomCards from '../components/dashboard/RoomCards';
import FloorPlan from '../components/floorplan/FloorPlan';
import SimulationPanel from '../components/simulation/SimulationPanel';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Header title="Dashboard" subtitle="Overview of your smart home & security system" />
      <div className="space-y-6">
        <StatusCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <SecurityOverview />
            <FloorPlan />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <EnergyChart />
            <RoomCards />
          </div>
        </div>

        <SimulationPanel />
      </div>
    </div>
  );
};

export default Dashboard;
