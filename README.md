# 🏠 HomeGuard — Smart Living. Safer Home.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> A modern, premium **Smart Home + Theft Protection** platform built with a minimalist **White UI design system**, multi-page navigation, IoT simulation engine, and integrated **Gemini AI Security Copilot**.

---

## 📸 Platform Preview & Design Language

HomeGuard is crafted with a clean, high-contrast, minimalist **White UI design system**:
* **Surfaces**: Crisp white cards (`#ffffff`) on soft slate backgrounds (`#f8fafc`).
* **Visual Hierarchy**: Refined typography, spacious layouts, thin borders (`border-slate-200/80`), and delicate shadows (`shadow-sm`).
* **Status Discipline**: Colors reserved strictly for system feedback:
  * 🟢 **Safe / Armed**: Normal perimeter and operating appliances.
  * 🟡 **Warning**: Environmental drift or security maintenance.
  * 🔴 **Breach / Alert**: Perimeter intrusions and audible alarm triggers.
  * 🔵 **Information**: Active cameras and network status.

```text
┌──────────────────────┬────────────────────────────────────────────────────────┐
│      HOMEGUARD       │  Good evening, Shubham                                 │
│  Smart Living & Safe │  [ 🔒 Lock Doors ]  [ ✨ Gemini AI ]  [ 🟢 HOME ARMED ] │
├──────────────────────┼────────────────────────────────────────────────────────┤
│                      │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  📊 Overview         │  │ 24°C Temp│ │ 58% Humid│ │ 2.4kW Pwr│ │ 6 Active │   │
│  🛡️ Security         │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  🛋️ Rooms            │  ┌─────────────────────────┐ ┌──────────────────────┐  │
│  📱 Devices          │  │ Perimeter Status Matrix │ │ 24h Energy Trend     │  │
│  📹 Cameras          │  │ • Front Door: LOCKED 🔒 │ │ [Area Chart ~2.4kW]  │  │
│  ⚡ Automation       │  │ • Windows: CLOSED 🪟    │ ├──────────────────────┤  │
│  ⏱️ Events           │  │ • Motion: CLEAR 👤      │ │ 6 Smart Rooms Hub    │  │
│  ⚡ Energy           │  ├─────────────────────────┤ │ • Living Room (24°C) │  │
│  ⚙️ Settings         │  │ 2D Architectural Plan   │ │ • Master Bed (22°C)  │  │
│                      │  │ [SVG Blueprint & Pins]  │ │ • Kitchen Lab (26°C) │  │
│                      │  └─────────────────────────┘ └──────────────────────┘  │
└──────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🧭 Multi-Page Architecture

The platform is organized across **9 dedicated pages**:

| Route | Page | Purpose & Key Features |
| :--- | :--- | :--- |
| `/` | **Overview** | Instant situational awareness, 4 real-time metric cards, perimeter status, 2D architectural SVG floor plan, 24h energy load, and Hardware Simulation Lab. |
| `/security` | **Security Center** | Arming stance selector (`HOME`, `AWAY`, `SLEEP`, `MAINTENANCE`), sensor matrix with filter tabs, SOS alarm overrides, and emergency contact dispatch. |
| `/rooms` | **Rooms** | 6 individual zones (**Living Room**, **Bedroom**, **Kitchen**, **Office**, **Bathroom**, **Garage**) with climate telemetry, light counts, and room management modals. |
| `/devices` | **Devices** | Centralized appliance hub categorized by *Lights*, *Fans*, *AC / Climate*, *TV*, *Appliances*, and *Locks* with continuous brightness, speed, and thermostat sliders. |
| `/cameras` | **Cameras** | 4 simulated RTSP surveillance feeds (**Front Entrance HD**, **Living Room 360°**, **Backyard NightVision**, **Garage Bay**) with running clock, REC overlay, snapshot capture, and fullscreen modal. |
| `/automation` | **Automation** | Conditional smart routines (*Night Lockdown*, *Away Fortress*, *Welcome Home*) with `IF` triggers and `THEN` execution lists, plus a custom Rule Builder. |
| `/events` | **Security Events** | Chronological audit trail and hybrid timeline/table with category filters (*All*, *Security*, *Doors*, *Windows*, *Motion*, *Devices*), search, and CSV export simulation. |
| `/energy` | **Energy Analytics** | Comprehensive power intelligence with 24-hour, weekly, and monthly consumption charts, appliance breakdown percentages, projected billing, and Eco Score. |
| `/settings` | **Settings** | Household profile management, push notification and siren sound toggles, default security stance, and ESP32 IoT hardware bridge configuration. |

---

## ✨ Features & Functionality

### 1. 🤖 Gemini AI Security Copilot
* Integrated directly into the top header via the **`✨ Gemini AI`** button.
* **Context Awareness**: Queries live perimeter state, active alarms, environmental metrics, and room devices.
* **Natural Language Voice/Chat Control**:
  * *"Audit my perimeter security"* ➔ Scans all doors, windows, and PIR motion nodes.
  * *"Lock down home and set to Away mode"* ➔ Executes emergency lockdown sequence in real-time.
  * *"Turn on all lights"* ➔ Illuminates every room to 100% brightness.
  * *"Analyze energy consumption"* ➔ Identifies top energy consumers and suggests savings.

### 2. 🔐 Theft Protection System
* **4 Security Modes**:
  * **Home**: Perimeter doors and windows armed; interior motion disarmed.
  * **Away**: Maximum fortress posture; all internal and external sensors, cameras, and alarms primed.
  * **Sleep**: Night perimeter armed; bedrooms relaxed for free movement.
  * **Maintenance**: Sensors paused for maintenance or guest access.
* **Intrusion Alerts & Alarm Protocol**:
  * Clean breach banner and modal with breach timestamp, sensor ID, and location.
  * One-touch **"View Camera"** and **"Silence Alarm"** controls.
* **Emergency Response**:
  * Instant lockdown for all doors and garage shutters.
  * Immediate illumination of all indoor and outdoor floodlights.
  * Direct emergency contacts for Police (100), Fire (101), Ambulance (102), and Community Guards.

### 3. 💡 Smart Home & Climate Controls
* **Dimmable Lighting**: Smooth brightness sliders (0% – 100%).
* **Speed Fans**: 5-level discrete speed selection.
* **Dual Inverter Climate**: Thermostat range (16°C – 30°C) with `Cool`, `Heat`, and `Auto` modes.
* **2D Architectural Blueprint**: Vector floor plan illustrating Living Room, Bedroom, Foyer, Kitchen, and Office with interactive glowing sensor pins.

### 4. 🧪 Simulation Lab (Hardware Testing Engine)
* **Threat Scenarios**: One-click front door breach and bedroom window intrusion testing.
* **Sensor Overrides**: Manually toggle any magnetic reed switch or PIR sensor between *Locked*, *Unlocked*, *Open*, *Triggered*, or *Offline*.
* **Climate Adjustments**: Live sliders for ambient temperature (16°C – 38°C) and relative humidity (20% – 90%).

---

## 🛠️ Tech Stack & Architecture

* **Framework**: React 18 with Vite 6
* **Styling**: Tailwind CSS with custom White UI theme
* **Routing**: React Router v6 (9 responsive routes + mobile bottom navigation)
* **State Management**: Centralized React Context (`HomeContext`) with `useReducer` action dispatchers
* **Icons**: Lucide React
* **Charts**: Recharts (Area, Bar, responsive tooltips)
* **Font**: Inter (`sans-serif`)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shubhamkerure07/HomeGuard.git

# Navigate into the project directory
cd HomeGuard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🔌 Future IoT Hardware Bridge (ESP32)

HomeGuard is architected to seamlessly interface with physical microcontrollers:

```text
[ Magnetic Reed Switches ] ──┐
[ PIR Motion Sensors    ] ──┼──► [ ESP32 MCU ] ──► [ MQTT / WebSockets ] ──► [ HomeGuard UI ]
[ DHT22 Temp / Humidity ] ──┤
[ 5V Relay Modules       ] ──┘
```

* **MQTT Telemetry Topic**: `/homeguard/telemetry`
* **MQTT Commands Topic**: `/homeguard/actuators`
* **Camera Streaming**: Local RTSP / MJPEG camera streams over local NVR.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for next-generation smart home security.
</p>
