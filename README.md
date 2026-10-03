# 🏠 HomeGuard

**Smart Living. Safer Home.**

A modern, premium smart home security dashboard built with React. Monitor your house, control smart devices, and detect possible intrusions — all from a beautiful dark-themed interface with glassmorphism design.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🏠 Smart Home Controls
- **Room Management** — Control lights, fans, AC, TV, and other appliances per room
- **Device Dashboard** — View and toggle all devices with filtering by type
- **Temperature & Humidity** — Real-time environmental monitoring
- **Energy Tracking** — 24-hour energy consumption chart
- **Automation Rules** — Create IF/THEN rules for smart behavior

### 🔐 Theft Protection System
- **Security Center** — Centralized security monitoring
- **Door/Window Sensors** — Track locked/open status for all entry points
- **Motion Detection** — Monitor motion across living room, hallway, and backyard
- **Security Modes** — HOME, AWAY, SLEEP, and MAINTENANCE modes
- **Intrusion Alerts** — Prominent alert system with alarm simulation
- **Camera Monitoring** — 4 simulated camera feeds with online/offline status
- **Emergency Panel** — One-click alarm, lock all doors, and emergency contacts
- **Security History** — Full event timeline with category filtering

### 🎨 Premium Design
- Dark theme with glassmorphism effects
- Subtle gradients and glow animations
- Responsive layout (mobile + desktop)
- Interactive 2D floor plan with sensor visualization
- Smooth page transitions
- Professional typography with Inter font

---

## 📸 Pages

| Page | Description |
|------|-------------|
| **Dashboard** | Main overview with stats, security status, energy chart, room cards, floor plan |
| **Security Center** | Sensor monitoring, security modes, alerts, emergency controls |
| **Rooms** | Interactive room cards with detailed device controls |
| **Devices** | All devices in one view with filtering and toggles |
| **Cameras** | Simulated camera feeds with motion detection indicators |
| **Automation** | Create and manage IF/THEN automation rules |
| **History** | Event timeline with category filtering |
| **Settings** | Profile, notifications, and system configuration |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/HomeGuard.git
cd HomeGuard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧪 Simulation Engine

Since this is a prototype without physical hardware, HomeGuard includes a **Simulation Panel** (available on the Dashboard) that lets you test all features:

| Action | What Happens |
|--------|-------------|
| **Simulate Intrusion** | Opens front door → Triggers motion sensor → Shows security alert → Activates alarm |
| **Reset All Sensors** | Returns all sensors to normal/locked/closed state |
| **Individual Controls** | Change any sensor status independently |
| **Environment** | Adjust temperature and humidity with sliders |

The dashboard updates in real-time when sensors change state.

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── automation/       # Rule editor
│   ├── cameras/          # Camera feed cards
│   ├── dashboard/        # Status cards, energy chart, room cards, security overview
│   ├── floorplan/        # Interactive 2D SVG floor plan
│   ├── layout/           # Sidebar, Header, Layout wrapper
│   ├── rooms/            # Room detail modal, device controls
│   ├── security/         # Sensor cards, security modes, alerts, emergency
│   ├── simulation/       # Simulation control panel
│   └── ui/               # Reusable: Card, Modal, Toggle, Badge, Button
├── context/
│   └── HomeContext.jsx    # Central state management (React Context + useReducer)
├── data/
│   └── initialData.js     # All simulated data (rooms, sensors, cameras, rules)
├── pages/                 # 8 page components
├── App.jsx                # Router setup
├── main.jsx               # Entry point
└── index.css              # Global styles, glassmorphism, animations
```

### State Management

All state is managed through `HomeContext` using React's `useReducer`. This provides:
- Centralized state for rooms, devices, sensors, cameras, events
- Action creators for all mutations (toggle devices, change modes, trigger alerts)
- Computed values (active device count, all doors locked, etc.)
- Clean separation ready for backend/IoT integration

---

## 🔌 Future IoT Integration

The architecture is designed so simulated data can be **replaced with real hardware**:

### Supported Hardware (Future)

| Component | Hardware | Purpose |
|-----------|----------|---------|
| Microcontroller | **ESP32** | WiFi-connected hub |
| Motion Sensor | **PIR (HC-SR501)** | Detect movement |
| Door/Window | **Magnetic Reed Switch** | Detect open/close |
| Light Sensor | **LDR** | Ambient light detection |
| Temp/Humidity | **DHT11 / DHT22** | Environmental monitoring |
| Relay | **Relay Module** | Control appliances |
| Camera | **ESP32-CAM** | Live video feed |

### Integration Approach

1. **ESP32 Firmware** — Flash ESP32 with firmware that reads sensors and sends data via MQTT or HTTP
2. **Backend API** — Create a Node.js/Python backend that:
   - Receives sensor data from ESP32
   - Stores events in a database
   - Serves data to the React frontend via WebSocket/REST
3. **Replace Context** — Swap `HomeContext`'s `useReducer` with API calls:
   ```js
   // Current (simulated)
   dispatch({ type: 'TOGGLE_DEVICE', payload: { roomId, deviceId } });
   
   // Future (real)
   await fetch('/api/devices/toggle', { method: 'POST', body: JSON.stringify({ roomId, deviceId }) });
   ```
4. **Camera Feeds** — Replace placeholder divs with `<img>` tags streaming from ESP32-CAM MJPEG endpoints

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool
- **Tailwind CSS 3** — Utility-first CSS
- **React Router 6** — Client-side routing
- **Recharts** — Energy consumption charts
- **Lucide React** — Beautiful consistent icons
- **React Context + useReducer** — State management

---

## 📄 License

MIT License — feel free to use this for your portfolio, learning, or as a starting point for a real IoT project.

---

<p align="center">
  <b>🏠 HomeGuard</b><br>
  <i>Smart Living. Safer Home.</i>
</p>
