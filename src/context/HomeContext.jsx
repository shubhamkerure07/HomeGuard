import { createContext, useContext, useReducer, useCallback } from 'react';
import {
  ROOMS,
  SECURITY_SENSORS,
  CAMERAS,
  DEFAULT_AUTOMATION_RULES,
  INITIAL_EVENTS,
  ENERGY_DATA,
} from '../data/initialData';

const HomeContext = createContext(null);

const initialState = {
  // Rooms with devices and sensors
  rooms: JSON.parse(JSON.stringify(ROOMS)),

  // Security
  securityMode: 'home', // home | away | sleep | maintenance
  securitySensors: JSON.parse(JSON.stringify(SECURITY_SENSORS)),
  alarmActive: false,
  activeAlert: null, // { message, location, timestamp, sensorId }

  // Cameras
  cameras: JSON.parse(JSON.stringify(CAMERAS)),

  // Automation
  automationRules: JSON.parse(JSON.stringify(DEFAULT_AUTOMATION_RULES)),

  // History
  events: JSON.parse(JSON.stringify(INITIAL_EVENTS)),

  // Environment
  temperature: 27,
  humidity: 62,
  energyUsage: 2.4,
  energyData: [...ENERGY_DATA],

  // Settings
  notifications: true,
  soundAlerts: true,
  userName: 'Shubham',
  homeName: 'My Home',
};

function homeReducer(state, action) {
  switch (action.type) {
    // ─── Device Controls ───
    case 'TOGGLE_DEVICE': {
      const { roomId, deviceId } = action.payload;
      const rooms = { ...state.rooms };
      const room = { ...rooms[roomId] };
      room.devices = room.devices.map((d) =>
        d.id === deviceId ? { ...d, isOn: !d.isOn } : d
      );
      rooms[roomId] = room;
      const device = room.devices.find((d) => d.id === deviceId);
      const newEvent = createEvent(
        'device',
        `${device.name} turned ${device.isOn ? 'on' : 'off'}`,
        room.name,
        device.isOn ? '✅' : '⬜',
        'devices'
      );
      return { ...state, rooms, events: [newEvent, ...state.events] };
    }

    case 'SET_DEVICE_PROPERTY': {
      const { roomId, deviceId, property, value } = action.payload;
      const rooms = { ...state.rooms };
      const room = { ...rooms[roomId] };
      room.devices = room.devices.map((d) =>
        d.id === deviceId ? { ...d, [property]: value } : d
      );
      rooms[roomId] = room;
      return { ...state, rooms };
    }

    // ─── Security Mode ───
    case 'SET_SECURITY_MODE': {
      const mode = action.payload;
      const newEvent = createEvent(
        'mode',
        `Security mode changed to ${mode.toUpperCase()}`,
        'System',
        mode === 'away' ? '🚪' : mode === 'sleep' ? '🌙' : mode === 'maintenance' ? '🔧' : '🏠',
        'security'
      );
      return {
        ...state,
        securityMode: mode,
        alarmActive: false,
        activeAlert: null,
        events: [newEvent, ...state.events],
      };
    }

    // ─── Security Sensors ───
    case 'UPDATE_SENSOR': {
      const { sensorId, status } = action.payload;
      const sensors = state.securitySensors.map((s) =>
        s.id === sensorId ? { ...s, status } : s
      );
      const sensor = sensors.find((s) => s.id === sensorId);
      let category = 'security';
      let icon = '📡';
      if (sensor.type === 'door') { category = 'doors'; icon = status === 'locked' ? '🔒' : '🚪'; }
      if (sensor.type === 'window') { category = 'windows'; icon = status === 'closed' ? '🪟' : '⚠️'; }
      if (sensor.type === 'motion') { category = 'motion'; icon = status === 'triggered' ? '🚨' : '👤'; }

      const newEvent = createEvent(
        sensor.type,
        `${sensor.name} — ${status.toUpperCase()}`,
        sensor.location,
        icon,
        category
      );

      return { ...state, securitySensors: sensors, events: [newEvent, ...state.events] };
    }

    // ─── Alert ───
    case 'TRIGGER_ALERT': {
      const { message, location, sensorId } = action.payload;
      const alert = {
        message,
        location,
        sensorId,
        timestamp: new Date().toISOString(),
      };
      const newEvent = createEvent('alert', message, location, '🚨', 'security');
      return {
        ...state,
        activeAlert: alert,
        alarmActive: true,
        events: [newEvent, ...state.events],
      };
    }

    case 'DISMISS_ALERT':
      return { ...state, activeAlert: null, alarmActive: false };

    case 'SILENCE_ALARM':
      return { ...state, alarmActive: false };

    // ─── Cameras ───
    case 'TOGGLE_CAMERA': {
      const camId = action.payload;
      const cameras = state.cameras.map((c) =>
        c.id === camId ? { ...c, isOnline: !c.isOnline } : c
      );
      const cam = cameras.find((c) => c.id === camId);
      const newEvent = createEvent(
        'camera',
        `${cam.name} camera ${cam.isOnline ? 'online' : 'offline'}`,
        cam.location,
        cam.isOnline ? '📹' : '⬜',
        'devices'
      );
      return { ...state, cameras, events: [newEvent, ...state.events] };
    }

    case 'SET_CAMERA_MOTION': {
      const { cameraId, motionDetected } = action.payload;
      const cameras = state.cameras.map((c) =>
        c.id === cameraId ? { ...c, motionDetected } : c
      );
      return { ...state, cameras };
    }

    // ─── Automation ───
    case 'TOGGLE_RULE': {
      const ruleId = action.payload;
      const rules = state.automationRules.map((r) =>
        r.id === ruleId ? { ...r, enabled: !r.enabled } : r
      );
      return { ...state, automationRules: rules };
    }

    case 'ADD_RULE': {
      return { ...state, automationRules: [...state.automationRules, action.payload] };
    }

    case 'DELETE_RULE': {
      const rules = state.automationRules.filter((r) => r.id !== action.payload);
      return { ...state, automationRules: rules };
    }

    // ─── Environment ───
    case 'SET_TEMPERATURE':
      return { ...state, temperature: action.payload };

    case 'SET_HUMIDITY':
      return { ...state, humidity: action.payload };

    case 'SET_ENERGY':
      return { ...state, energyUsage: action.payload };

    // ─── Emergency ───
    case 'LOCK_ALL_DOORS': {
      const sensors = state.securitySensors.map((s) =>
        s.type === 'door' ? { ...s, status: 'locked' } : s
      );
      const newEvent = createEvent('door', 'All doors locked (emergency)', 'System', '🔒', 'doors');
      return { ...state, securitySensors: sensors, events: [newEvent, ...state.events] };
    }

    case 'ALL_LIGHTS_ON': {
      const rooms = { ...state.rooms };
      Object.keys(rooms).forEach((key) => {
        rooms[key] = {
          ...rooms[key],
          devices: rooms[key].devices.map((d) =>
            d.type === 'light' ? { ...d, isOn: true, brightness: 100 } : d
          ),
        };
      });
      const newEvent = createEvent('device', 'All lights turned on (emergency)', 'System', '💡', 'devices');
      return { ...state, rooms, events: [newEvent, ...state.events] };
    }

    // ─── Simulation ───
    case 'SIMULATE_INTRUSION': {
      const { doorId, motionSensorId, cameraId } = action.payload;
      const sensors = state.securitySensors.map((s) => {
        if (s.id === doorId) return { ...s, status: 'open' };
        if (s.id === motionSensorId) return { ...s, status: 'triggered' };
        return s;
      });
      const cameras = state.cameras.map((c) =>
        c.id === cameraId ? { ...c, motionDetected: true } : c
      );
      const doorSensor = sensors.find((s) => s.id === doorId);
      const motionSensor = sensors.find((s) => s.id === motionSensorId);
      const evt1 = createEvent('door', `${doorSensor?.name || 'Door'} OPENED`, doorSensor?.location || 'Unknown', '🚪', 'doors');
      const evt2 = createEvent('motion', `Motion detected — ${motionSensor?.name || 'Sensor'}`, motionSensor?.location || 'Unknown', '🚨', 'motion');
      const alert = {
        message: `Motion detected in ${motionSensor?.location || 'Unknown'}`,
        location: motionSensor?.location || 'Unknown',
        sensorId: motionSensorId,
        timestamp: new Date().toISOString(),
      };
      const evt3 = createEvent('alert', `SECURITY ALERT — ${alert.message}`, alert.location, '🚨', 'security');
      return {
        ...state,
        securitySensors: sensors,
        cameras,
        activeAlert: alert,
        alarmActive: true,
        events: [evt3, evt2, evt1, ...state.events],
      };
    }

    case 'RESET_SIMULATION': {
      const sensors = state.securitySensors.map((s) => {
        if (s.type === 'door') return { ...s, status: 'locked' };
        if (s.type === 'window') return { ...s, status: 'closed' };
        if (s.type === 'motion') return { ...s, status: 'normal' };
        return s;
      });
      const cameras = state.cameras.map((c) => ({ ...c, motionDetected: false }));
      const newEvent = createEvent('mode', 'Simulation reset — all sensors normal', 'System', '🔄', 'security');
      return {
        ...state,
        securitySensors: sensors,
        cameras,
        activeAlert: null,
        alarmActive: false,
        events: [newEvent, ...state.events],
      };
    }

    // ─── Settings ───
    case 'UPDATE_SETTINGS':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

function createEvent(type, message, location, icon, category) {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type,
    message,
    location,
    timestamp: new Date().toISOString(),
    icon,
    category,
  };
}

export function HomeProvider({ children }) {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  // Convenience action creators
  const toggleDevice = useCallback((roomId, deviceId) => {
    dispatch({ type: 'TOGGLE_DEVICE', payload: { roomId, deviceId } });
  }, []);

  const setDeviceProperty = useCallback((roomId, deviceId, property, value) => {
    dispatch({ type: 'SET_DEVICE_PROPERTY', payload: { roomId, deviceId, property, value } });
  }, []);

  const setSecurityMode = useCallback((mode) => {
    dispatch({ type: 'SET_SECURITY_MODE', payload: mode });
  }, []);

  const updateSensor = useCallback((sensorId, status) => {
    dispatch({ type: 'UPDATE_SENSOR', payload: { sensorId, status } });
  }, []);

  const triggerAlert = useCallback((message, location, sensorId) => {
    dispatch({ type: 'TRIGGER_ALERT', payload: { message, location, sensorId } });
  }, []);

  const dismissAlert = useCallback(() => {
    dispatch({ type: 'DISMISS_ALERT' });
  }, []);

  const silenceAlarm = useCallback(() => {
    dispatch({ type: 'SILENCE_ALARM' });
  }, []);

  const toggleCamera = useCallback((cameraId) => {
    dispatch({ type: 'TOGGLE_CAMERA', payload: cameraId });
  }, []);

  const toggleRule = useCallback((ruleId) => {
    dispatch({ type: 'TOGGLE_RULE', payload: ruleId });
  }, []);

  const addRule = useCallback((rule) => {
    dispatch({ type: 'ADD_RULE', payload: rule });
  }, []);

  const deleteRule = useCallback((ruleId) => {
    dispatch({ type: 'DELETE_RULE', payload: ruleId });
  }, []);

  const lockAllDoors = useCallback(() => {
    dispatch({ type: 'LOCK_ALL_DOORS' });
  }, []);

  const allLightsOn = useCallback(() => {
    dispatch({ type: 'ALL_LIGHTS_ON' });
  }, []);

  const simulateIntrusion = useCallback((doorId, motionSensorId, cameraId) => {
    dispatch({ type: 'SIMULATE_INTRUSION', payload: { doorId, motionSensorId, cameraId } });
  }, []);

  const resetSimulation = useCallback(() => {
    dispatch({ type: 'RESET_SIMULATION' });
  }, []);

  const updateSettings = useCallback((settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const setCameraMotion = useCallback((cameraId, motionDetected) => {
    dispatch({ type: 'SET_CAMERA_MOTION', payload: { cameraId, motionDetected } });
  }, []);

  const setTemperature = useCallback((temp) => {
    dispatch({ type: 'SET_TEMPERATURE', payload: temp });
  }, []);

  const setHumidity = useCallback((hum) => {
    dispatch({ type: 'SET_HUMIDITY', payload: hum });
  }, []);

  const setEnergy = useCallback((energy) => {
    dispatch({ type: 'SET_ENERGY', payload: energy });
  }, []);

  // Computed values
  const activeDeviceCount = Object.values(state.rooms).reduce(
    (count, room) => count + room.devices.filter((d) => d.isOn).length,
    0
  );

  const allDoorsLocked = state.securitySensors
    .filter((s) => s.type === 'door')
    .every((s) => s.status === 'locked');

  const allWindowsClosed = state.securitySensors
    .filter((s) => s.type === 'window')
    .every((s) => s.status === 'closed');

  const motionClear = state.securitySensors
    .filter((s) => s.type === 'motion')
    .every((s) => s.status === 'normal');

  const camerasOnline = state.cameras.filter((c) => c.isOnline).length;

  const value = {
    ...state,
    dispatch,
    // Actions
    toggleDevice,
    setDeviceProperty,
    setSecurityMode,
    updateSensor,
    triggerAlert,
    dismissAlert,
    silenceAlarm,
    toggleCamera,
    setCameraMotion,
    toggleRule,
    addRule,
    deleteRule,
    lockAllDoors,
    allLightsOn,
    simulateIntrusion,
    resetSimulation,
    updateSettings,
    setTemperature,
    setHumidity,
    setEnergy,
    // Computed
    activeDeviceCount,
    allDoorsLocked,
    allWindowsClosed,
    motionClear,
    camerasOnline,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
}

export default HomeContext;
