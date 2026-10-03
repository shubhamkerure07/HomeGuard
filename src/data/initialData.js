// Initial data for the HomeGuard simulation engine
// All sensor data is simulated — designed to be replaceable with real IoT hardware

export const ROOMS = {
  'living-room': {
    id: 'living-room',
    name: 'Living Room',
    icon: '🛋️',
    devices: [
      { id: 'lr-light', name: 'Main Light', type: 'light', isOn: true, brightness: 80 },
      { id: 'lr-fan', name: 'Ceiling Fan', type: 'fan', isOn: true, speed: 3 },
      { id: 'lr-ac', name: 'Air Conditioner', type: 'ac', isOn: true, temperature: 24, mode: 'cool' },
      { id: 'lr-tv', name: 'Smart TV', type: 'tv', isOn: false },
    ],
    sensors: {
      motion: { id: 'lr-motion', status: 'normal', lastTriggered: null },
      window: { id: 'lr-window', status: 'closed', name: 'Living Room Window' },
    },
    temperature: 27,
    humidity: 62,
  },
  bedroom: {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    devices: [
      { id: 'br-light', name: 'Bedroom Light', type: 'light', isOn: false, brightness: 60 },
      { id: 'br-fan', name: 'Ceiling Fan', type: 'fan', isOn: true, speed: 2 },
      { id: 'br-ac', name: 'Air Conditioner', type: 'ac', isOn: false, temperature: 22, mode: 'cool' },
    ],
    sensors: {
      motion: { id: 'br-motion', status: 'normal', lastTriggered: null },
      window: { id: 'br-window', status: 'closed', name: 'Bedroom Window' },
    },
    temperature: 25,
    humidity: 58,
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    devices: [
      { id: 'kt-light', name: 'Kitchen Light', type: 'light', isOn: true, brightness: 100 },
      { id: 'kt-exhaust', name: 'Exhaust Fan', type: 'fan', isOn: false, speed: 1 },
    ],
    sensors: {
      smoke: { id: 'kt-smoke', status: 'normal', name: 'Gas/Smoke Sensor' },
    },
    temperature: 30,
    humidity: 55,
  },
  office: {
    id: 'office',
    name: 'Office',
    icon: '🖥️',
    devices: [
      { id: 'of-light', name: 'Desk Lamp', type: 'light', isOn: true, brightness: 90 },
      { id: 'of-computer', name: 'Computer', type: 'computer', isOn: true },
    ],
    sensors: {
      motion: { id: 'of-motion', status: 'normal', lastTriggered: null },
    },
    temperature: 26,
    humidity: 50,
  },
};

export const SECURITY_SENSORS = [
  { id: 'front-door', name: 'Front Door', type: 'door', icon: '🚪', status: 'locked', location: 'Hall' },
  { id: 'back-door', name: 'Back Door', type: 'door', icon: '🚪', status: 'locked', location: 'Kitchen' },
  { id: 'lr-window-sec', name: 'Living Room Window', type: 'window', icon: '🪟', status: 'closed', location: 'Living Room' },
  { id: 'br-window-sec', name: 'Bedroom Window', type: 'window', icon: '🪟', status: 'closed', location: 'Bedroom' },
  { id: 'lr-motion-sec', name: 'Living Room Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Living Room' },
  { id: 'hall-motion', name: 'Hallway Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Hall' },
  { id: 'backyard-motion', name: 'Backyard Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Backyard' },
];

export const CAMERAS = [
  { id: 'cam-front', name: 'Front Door', location: 'Entrance', isOnline: true, motionDetected: false },
  { id: 'cam-living', name: 'Living Room', location: 'Living Room', isOnline: true, motionDetected: false },
  { id: 'cam-backyard', name: 'Backyard', location: 'Backyard', isOnline: true, motionDetected: false },
  { id: 'cam-garage', name: 'Garage', location: 'Garage', isOnline: false, motionDetected: false },
];

export const SECURITY_MODES = {
  home: {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    description: 'Normal protection — perimeter sensors active',
    color: 'green',
    sensors: { doors: true, windows: true, motion: false, cameras: true, alarm: false },
  },
  away: {
    id: 'away',
    name: 'Away',
    icon: '🚪',
    description: 'Maximum protection — all sensors and alarms active',
    color: 'red',
    sensors: { doors: true, windows: true, motion: true, cameras: true, alarm: true },
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep',
    icon: '🌙',
    description: 'Perimeter + selected areas protected, bedrooms relaxed',
    color: 'purple',
    sensors: { doors: true, windows: true, motion: false, cameras: true, alarm: true },
  },
  maintenance: {
    id: 'maintenance',
    name: 'Maintenance',
    icon: '🔧',
    description: 'Sensors temporarily disabled for maintenance',
    color: 'amber',
    sensors: { doors: false, windows: false, motion: false, cameras: false, alarm: false },
  },
};

export const DEFAULT_AUTOMATION_RULES = [
  {
    id: 'rule-1',
    name: 'Night Motion Alert',
    enabled: true,
    condition: { type: 'motion_after', time: '23:00' },
    conditionText: 'Motion detected after 11:00 PM',
    actions: [
      { type: 'light_on', target: 'hall', text: 'Turn on hallway lights' },
      { type: 'alert', text: 'Send security alert' },
      { type: 'alarm', text: 'Activate alarm' },
    ],
  },
  {
    id: 'rule-2',
    name: 'Away Mode Setup',
    enabled: true,
    condition: { type: 'mode_change', mode: 'away' },
    conditionText: 'Security mode changed to AWAY',
    actions: [
      { type: 'lock_doors', text: 'Lock all doors' },
      { type: 'lights_off', text: 'Turn off all lights' },
      { type: 'activate_motion', text: 'Activate motion sensors' },
      { type: 'activate_cameras', text: 'Activate cameras' },
    ],
  },
  {
    id: 'rule-3',
    name: 'Welcome Home',
    enabled: false,
    condition: { type: 'door_unlock', target: 'front-door' },
    conditionText: 'Front door unlocked',
    actions: [
      { type: 'light_on', target: 'living-room', text: 'Turn on living room lights' },
      { type: 'ac_on', target: 'living-room', text: 'Turn on AC to 24°C' },
    ],
  },
];

export const INITIAL_EVENTS = [
  { id: 'evt-1', type: 'mode', message: 'Security mode changed to HOME', location: 'System', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), icon: '🏠', category: 'security' },
  { id: 'evt-2', type: 'window', message: 'Bedroom window closed', location: 'Bedroom', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), icon: '🪟', category: 'windows' },
  { id: 'evt-3', type: 'door', message: 'Front door locked', location: 'Hall', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), icon: '🔒', category: 'doors' },
  { id: 'evt-4', type: 'device', message: 'Living room AC turned on', location: 'Living Room', timestamp: new Date(Date.now() - 3600000).toISOString(), icon: '❄️', category: 'devices' },
  { id: 'evt-5', type: 'motion', message: 'Motion detected', location: 'Backyard', timestamp: new Date(Date.now() - 1800000).toISOString(), icon: '👤', category: 'motion' },
  { id: 'evt-6', type: 'door', message: 'Back door locked', location: 'Kitchen', timestamp: new Date(Date.now() - 900000).toISOString(), icon: '🔒', category: 'doors' },
];

export const ENERGY_DATA = [
  { time: '00:00', usage: 1.2 },
  { time: '02:00', usage: 0.8 },
  { time: '04:00', usage: 0.6 },
  { time: '06:00', usage: 1.1 },
  { time: '08:00', usage: 2.3 },
  { time: '10:00', usage: 2.8 },
  { time: '12:00', usage: 3.1 },
  { time: '14:00', usage: 2.9 },
  { time: '16:00', usage: 2.5 },
  { time: '18:00', usage: 3.4 },
  { time: '20:00', usage: 2.7 },
  { time: '22:00', usage: 2.1 },
];

export const EMERGENCY_CONTACTS = [
  { id: 'ec-1', name: 'Police', number: '100', icon: '🚔' },
  { id: 'ec-2', name: 'Fire Department', number: '101', icon: '🚒' },
  { id: 'ec-3', name: 'Ambulance', number: '102', icon: '🚑' },
  { id: 'ec-4', name: 'Home Owner', number: '+91 98765 43210', icon: '👤' },
  { id: 'ec-5', name: 'Neighbor', number: '+91 91234 56789', icon: '🏘️' },
];
