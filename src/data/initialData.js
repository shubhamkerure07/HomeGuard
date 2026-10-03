// Initial data for the HomeGuard simulation engine
// All sensor data is simulated — designed to be replaceable with real IoT hardware

export const ROOMS = {
  'living-room': {
    id: 'living-room',
    name: 'Living Room',
    icon: '🛋️',
    devices: [
      { id: 'lr-light', name: 'Ambient Ceiling Light', type: 'light', isOn: true, brightness: 80, power: 45 },
      { id: 'lr-fan', name: 'Ceiling Fan', type: 'fan', isOn: true, speed: 3, power: 65 },
      { id: 'lr-ac', name: 'Dual Inverter AC', type: 'ac', isOn: true, temperature: 24, mode: 'cool', power: 1200 },
      { id: 'lr-tv', name: 'OLED 65" TV', type: 'tv', isOn: false, power: 150 },
    ],
    sensors: {
      motion: { id: 'lr-motion-sec', status: 'normal', name: 'Living Room Motion' },
      window: { id: 'lr-window-sec', status: 'closed', name: 'Living Room Window' },
    },
    temperature: 24,
    humidity: 58,
  },
  bedroom: {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    devices: [
      { id: 'br-light', name: 'Bedside Warm Lamp', type: 'light', isOn: false, brightness: 50, power: 15 },
      { id: 'br-fan', name: 'Silent Air Fan', type: 'fan', isOn: true, speed: 2, power: 40 },
      { id: 'br-ac', name: 'Eco Climate AC', type: 'ac', isOn: false, temperature: 22, mode: 'cool', power: 900 },
      { id: 'br-purifier', name: 'HEPA Air Purifier', type: 'appliance', isOn: true, power: 35 },
    ],
    sensors: {
      motion: { id: 'br-motion', status: 'normal', name: 'Bedroom Motion' },
      window: { id: 'br-window-sec', status: 'closed', name: 'Bedroom Window' },
    },
    temperature: 22,
    humidity: 52,
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    devices: [
      { id: 'kt-light', name: 'Counter LED Strip', type: 'light', isOn: true, brightness: 100, power: 30 },
      { id: 'kt-exhaust', name: 'Smart Exhaust Fan', type: 'fan', isOn: false, speed: 1, power: 50 },
      { id: 'kt-fridge', name: 'Inverter Refrigerator', type: 'appliance', isOn: true, power: 180 },
    ],
    sensors: {
      smoke: { id: 'kt-smoke', status: 'normal', name: 'Gas/Smoke Sensor' },
      door: { id: 'back-door', status: 'locked', name: 'Kitchen Back Door' }
    },
    temperature: 26,
    humidity: 55,
  },
  office: {
    id: 'office',
    name: 'Office',
    icon: '🖥️',
    devices: [
      { id: 'of-light', name: 'Minimalist Desk Lamp', type: 'light', isOn: true, brightness: 90, power: 20 },
      { id: 'of-computer', name: 'Workstation Setup', type: 'appliance', isOn: true, power: 320 },
      { id: 'of-fan', name: 'Tower Fan', type: 'fan', isOn: false, speed: 2, power: 45 },
    ],
    sensors: {
      motion: { id: 'of-motion', status: 'normal', name: 'Office Motion Sensor' },
    },
    temperature: 23,
    humidity: 48,
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom',
    icon: '🚿',
    devices: [
      { id: 'ba-light', name: 'Mirror Vanity Light', type: 'light', isOn: false, brightness: 70, power: 25 },
      { id: 'ba-exhaust', name: 'Moisture Exhaust', type: 'fan', isOn: false, speed: 2, power: 40 },
      { id: 'ba-heater', name: 'Smart Water Geyser', type: 'appliance', isOn: false, power: 1500 },
    ],
    sensors: {
      water: { id: 'ba-water', status: 'normal', name: 'Water Leak Sensor' },
    },
    temperature: 25,
    humidity: 68,
  },
  garage: {
    id: 'garage',
    name: 'Garage',
    icon: '🚗',
    devices: [
      { id: 'ga-light', name: 'Overhead Flood Light', type: 'light', isOn: false, brightness: 100, power: 60 },
      { id: 'ga-door', name: 'Motorized Garage Door', type: 'lock', isOn: false, status: 'locked', power: 200 },
      { id: 'ga-charger', name: 'EV Fast Charger', type: 'appliance', isOn: true, power: 3300 },
    ],
    sensors: {
      motion: { id: 'ga-motion', status: 'normal', name: 'Garage Motion Sensor' },
    },
    temperature: 21,
    humidity: 60,
  },
};

export const SECURITY_SENSORS = [
  { id: 'front-door', name: 'Front Entrance Door', type: 'door', icon: '🚪', status: 'locked', location: 'Hallway', battery: 94 },
  { id: 'back-door', name: 'Kitchen Patio Door', type: 'door', icon: '🚪', status: 'locked', location: 'Kitchen', battery: 88 },
  { id: 'lr-window-sec', name: 'Living Room Bay Window', type: 'window', icon: '🪟', status: 'closed', location: 'Living Room', battery: 92 },
  { id: 'br-window-sec', name: 'Master Bedroom Window', type: 'window', icon: '🪟', status: 'closed', location: 'Bedroom', battery: 85 },
  { id: 'lr-motion-sec', name: 'Living Room PIR Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Living Room', battery: 96 },
  { id: 'hall-motion', name: 'Main Hallway Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Hallway', battery: 91 },
  { id: 'backyard-motion', name: 'Backyard Perimeter Motion', type: 'motion', icon: '👤', status: 'normal', location: 'Backyard', battery: 82 },
  { id: 'ga-door-sec', name: 'Garage Rollup Shutter', type: 'door', icon: '🚪', status: 'locked', location: 'Garage', battery: 90 },
];

export const CAMERAS = [
  { id: 'cam-front', name: 'Front Entrance HD', location: 'Entrance', isOnline: true, motionDetected: false, resolution: '2K QHD', fps: 30 },
  { id: 'cam-living', name: 'Living Room 360°', location: 'Living Room', isOnline: true, motionDetected: false, resolution: '1080p', fps: 24 },
  { id: 'cam-backyard', name: 'Backyard NightVision', location: 'Backyard', isOnline: true, motionDetected: false, resolution: '4K UHD', fps: 30 },
  { id: 'cam-garage', name: 'Garage Bay Cam', location: 'Garage', isOnline: false, motionDetected: false, resolution: '1080p', fps: 24 },
];

export const SECURITY_MODES = {
  home: {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    description: 'Perimeter protection active. Interior motion disarmed for free movement.',
    color: 'emerald',
    badge: 'Safe',
    sensors: { doors: true, windows: true, motion: false, cameras: true, alarm: false },
  },
  away: {
    id: 'away',
    name: 'Away',
    icon: '🚪',
    description: 'Maximum fortress mode. All interior & exterior sensors, cameras, and alarms primed.',
    color: 'red',
    badge: 'Maximum',
    sensors: { doors: true, windows: true, motion: true, cameras: true, alarm: true },
  },
  sleep: {
    id: 'sleep',
    name: 'Sleep',
    icon: '🌙',
    description: 'Entrance and ground perimeter armed. Bedroom movement permitted.',
    color: 'blue',
    badge: 'Night',
    sensors: { doors: true, windows: true, motion: false, cameras: true, alarm: true },
  },
  maintenance: {
    id: 'maintenance',
    name: 'Maintenance',
    icon: '🔧',
    description: 'Sensors temporarily paused for service, guest access, or battery replacement.',
    color: 'amber',
    badge: 'Paused',
    sensors: { doors: false, windows: false, motion: false, cameras: false, alarm: false },
  },
};

export const DEFAULT_AUTOMATION_RULES = [
  {
    id: 'rule-1',
    name: 'Night Lockdown Mode',
    enabled: true,
    conditionText: 'Clock reaches 11:00 PM',
    condition: { type: 'time', time: '23:00' },
    actions: [
      { type: 'lock_doors', text: 'Lock all perimeter doors' },
      { type: 'lights_off', text: 'Turn off non-essential lights' },
      { type: 'mode', text: 'Arm security to SLEEP mode' },
      { type: 'ac', text: 'Set bedroom AC to 22°C' },
    ],
  },
  {
    id: 'rule-2',
    name: 'Away Fortress Routine',
    enabled: true,
    conditionText: 'Security mode set to AWAY',
    condition: { type: 'mode_change', mode: 'away' },
    actions: [
      { type: 'lock_doors', text: 'Lock all doors and windows' },
      { type: 'lights_off', text: 'Turn off all lighting & appliances' },
      { type: 'activate_motion', text: 'Prime all PIR motion sensors' },
      { type: 'activate_cameras', text: 'Enable 24/7 AI camera recording' },
    ],
  },
  {
    id: 'rule-3',
    name: 'Welcome Home Greeting',
    enabled: false,
    conditionText: 'Front door unlocked by resident',
    condition: { type: 'door_unlock', target: 'front-door' },
    actions: [
      { type: 'light_on', text: 'Turn on Living Room warm lighting' },
      { type: 'ac_on', text: 'Activate climate control to 24°C' },
      { type: 'disarm', text: 'Switch security mode to HOME' },
    ],
  },
  {
    id: 'rule-4',
    name: 'Emergency Intrusion Flash',
    enabled: true,
    conditionText: 'Intrusion alarm triggered during AWAY mode',
    condition: { type: 'alarm_trigger' },
    actions: [
      { type: 'lights_flash', text: 'Turn on all interior & exterior floodlights' },
      { type: 'record', text: 'Capture snapshot on all 4 cameras' },
      { type: 'notify', text: 'Broadcast emergency notification to phone' },
    ],
  },
];

export const INITIAL_EVENTS = [
  { id: 'evt-1', type: 'mode', message: 'Security mode set to HOME', location: 'System Console', timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString(), icon: '🏠', category: 'security', severity: 'info' },
  { id: 'evt-2', type: 'door', message: 'Front Entrance Door securely locked', location: 'Hallway', timestamp: new Date(Date.now() - 3600000 * 2.8).toISOString(), icon: '🔒', category: 'doors', severity: 'info' },
  { id: 'evt-3', type: 'window', message: 'Master Bedroom Window closed', location: 'Bedroom', timestamp: new Date(Date.now() - 3600000 * 2.1).toISOString(), icon: '🪟', category: 'windows', severity: 'info' },
  { id: 'evt-4', type: 'device', message: 'Living Room Dual Inverter AC turned on (24°C)', location: 'Living Room', timestamp: new Date(Date.now() - 3600000 * 1.2).toISOString(), icon: '❄️', category: 'devices', severity: 'info' },
  { id: 'evt-5', type: 'motion', message: 'Minor perimeter movement detected & cleared', location: 'Backyard', timestamp: new Date(Date.now() - 1800000).toISOString(), icon: '👤', category: 'motion', severity: 'warning' },
  { id: 'evt-6', type: 'door', message: 'Kitchen Patio Door locked', location: 'Kitchen', timestamp: new Date(Date.now() - 900000).toISOString(), icon: '🔒', category: 'doors', severity: 'info' },
];

export const ENERGY_DATA_DAILY = [
  { time: '00:00', usage: 1.1, cost: 0.13 },
  { time: '02:00', usage: 0.8, cost: 0.09 },
  { time: '04:00', usage: 0.6, cost: 0.07 },
  { time: '06:00', usage: 1.2, cost: 0.14 },
  { time: '08:00', usage: 2.3, cost: 0.28 },
  { time: '10:00', usage: 2.7, cost: 0.32 },
  { time: '12:00', usage: 3.1, cost: 0.37 },
  { time: '14:00', usage: 2.9, cost: 0.35 },
  { time: '16:00', usage: 2.5, cost: 0.30 },
  { time: '18:00', usage: 3.4, cost: 0.41 },
  { time: '20:00', usage: 2.8, cost: 0.34 },
  { time: '22:00', usage: 2.0, cost: 0.24 },
];

export const ENERGY_DATA_WEEKLY = [
  { day: 'Mon', usage: 24.2, cost: 2.90 },
  { day: 'Tue', usage: 21.8, cost: 2.61 },
  { day: 'Wed', usage: 26.5, cost: 3.18 },
  { day: 'Thu', usage: 23.4, cost: 2.80 },
  { day: 'Fri', usage: 28.1, cost: 3.37 },
  { day: 'Sat', usage: 32.6, cost: 3.91 },
  { day: 'Sun', usage: 30.2, cost: 3.62 },
];

export const ENERGY_DATA_MONTHLY = [
  { month: 'Jan', usage: 680, cost: 81.6 },
  { month: 'Feb', usage: 610, cost: 73.2 },
  { month: 'Mar', usage: 590, cost: 70.8 },
  { month: 'Apr', usage: 720, cost: 86.4 },
  { month: 'May', usage: 850, cost: 102.0 },
  { month: 'Jun', usage: 920, cost: 110.4 },
];

export const DEVICE_CONSUMPTION = [
  { name: 'Air Conditioning', usage: 48, kwh: '14.2 kWh', color: '#3b82f6' },
  { name: 'EV Charger', usage: 24, kwh: '7.1 kWh', color: '#10b981' },
  { name: 'Kitchen & Fridge', usage: 14, kwh: '4.2 kWh', color: '#f59e0b' },
  { name: 'Lighting & Fans', usage: 8, kwh: '2.4 kWh', color: '#8b5cf6' },
  { name: 'Workstation & TV', usage: 6, kwh: '1.8 kWh', color: '#06b6d4' },
];

export const EMERGENCY_CONTACTS = [
  { id: 'ec-1', name: 'Emergency Police Dispatch', number: '100', role: 'Law Enforcement', icon: '🚔', status: '24/7 Available' },
  { id: 'ec-2', name: 'Fire & Rescue Service', number: '101', role: 'Fire Safety', icon: '🚒', status: '24/7 Available' },
  { id: 'ec-3', name: 'Emergency Medical Service', number: '102', role: 'Ambulance', icon: '🚑', status: '24/7 Available' },
  { id: 'ec-4', name: 'Primary Resident (Shubham)', number: '+91 98765 43210', role: 'Home Owner', icon: '👤', status: 'Primary Admin' },
  { id: 'ec-5', name: 'Community Security Gate', number: '+91 91234 56789', role: 'Local Security', icon: '🛡️', status: 'Guard Post' },
];
