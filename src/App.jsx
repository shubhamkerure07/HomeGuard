import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeProvider } from './context/HomeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SecurityCenter from './pages/SecurityCenter';
import Rooms from './pages/Rooms';
import Devices from './pages/Devices';
import Cameras from './pages/Cameras';
import Automation from './pages/Automation';
import History from './pages/History';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <HomeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HomeProvider>
  );
}
