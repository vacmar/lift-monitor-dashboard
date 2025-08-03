import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import LiftCard from './components/LiftCard';
import Header from './components/Header';
import { buildings } from './config/buildings';
import { fetchLiftData } from './services/api';
import './App.css';
import './components/TopAlert.css';
import TopAlert from './components/TopAlert';


const App = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('Belly 1');
  const [liftData, setLiftData] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertLift, setAlertLift] = useState(null);
  const [alertBuilding, setAlertBuilding] = useState('');
  const [alerts, setAlerts] = useState([]);
  const handleCloseAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchLiftData();
      
      // Flatten the data for easier processing
      const flattenedData = Object.entries(data).flatMap(([building, lifts]) =>
        lifts.map(lift => ({ ...lift, building }))
      );
      setLiftData(flattenedData);

      const newAlerts = flattenedData
        .filter((lift) => lift.Alarm === "1")
        .map((lift) => ({
          id: lift.ID,
          floor: lift.Fl,
          building: lift.building,
        }));

      setAlerts(prevAlerts => {
        // Avoid duplicate alerts already shown
        const existingKeys = new Set(prevAlerts.map(a => `${a.id}-${a.floor}-${a.building}`));
        const uniqueNewAlerts = newAlerts.filter(
          a => !existingKeys.has(`${a.id}-${a.floor}-${a.building}`)
        );
        return [...prevAlerts, ...uniqueNewAlerts];
      });

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const visibleLifts = liftData.filter((lift) =>
    lift.building === selectedBuilding
  );

  return (
    <div className="app">
      <Header />
      <TopAlert alerts={alerts} onClose={handleCloseAlert} />
      <div className="dashboard">
        <Sidebar selected={selectedBuilding} onSelect={setSelectedBuilding} />
        <div className="main-content">
          {visibleLifts.map((lift) => (
            <LiftCard key={lift.ID} lift={lift} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;