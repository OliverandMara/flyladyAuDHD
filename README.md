# Dopamine Rooms

A task management PWA designed for people with ADHD who follow the FlyLady methodology. Features structured time tracking, instant rewards, and motivational coaching.

## Features

- **Task & Room Management** - Organize tasks into "rooms" or "zones" following FlyLady philosophy
- **Smart Timer** - Countdown timer with progress visualization and real-time coaching
- **Motivation System** - Earn stickers for completing tasks, with 3 coaching tones (soft, firm, brutal)
- **Daily Summary** - Export your daily progress to share with your AI partner or accountability buddy
- **PWA Support** - Install on any device, works offline
- **ADHD-Friendly** - Dopamine reinforcement through immediate rewards and encouraging messages

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- IndexedDB for local storage (no backend required)
- Progressive Web App (PWA) with offline support
- Responsive, mobile-first design

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Generate PWA icons (run this if you modify public/icon.svg)
npm run generate-icons

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Cloudflare Pages

This app is configured to deploy on Cloudflare Pages:

1. **Connect your repository** to Cloudflare Pages
2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or higher

3. **Environment variables**: None required (all data is client-side in IndexedDB)

The app includes `_headers` and `_redirects` files in the `public` directory for proper PWA and SPA support.

### Manual Deployment

You can deploy the `dist` folder to any static hosting service:

```bash
npm run build
# Upload the dist/ folder to your hosting service
```

## Usage

### Daily Workflow

1. Open the app to see your **Today** screen with tasks for the day
2. Click **Start** on a task to begin the timer
3. Complete the task and earn a sticker (1 sticker per 3 completed tasks)
4. Use the **Copy Daily Summary** button to export your progress

### Managing Tasks

- Go to **Rooms** tab to create and manage task categories
- Add tasks to rooms with estimated durations (5, 10, 15, or 30 minutes)
- Set task frequency: daily, weekly (specific days), or custom intervals

### Settings

- **Daily Cap** - Limit the number of tasks shown per day
- **Coaching Tone** - Choose between soft, firm, or brutal motivation
- **Sound & Vibration** - Toggle feedback options

## PWA Installation

### On Mobile (iOS/Android)

1. Open the app in your browser
2. Tap the share button
3. Select "Add to Home Screen"

### On Desktop

1. Open the app in Chrome, Edge, or Safari
2. Look for the install icon in the address bar
3. Click "Install"

## Icon Customization

To customize the app icon:

1. Edit `public/icon.svg` with your design
2. Run `npm run generate-icons` to regenerate PNG files
3. Rebuild the app with `npm run build`

The icon uses your app's color palette:
- **Background**: Steel Blue (#5F7A8E)
- **Foreground**: Beige (#FAF8F5)
- **Accent**: Brass (#B8935F)

## Data Storage

All data is stored locally in your browser using IndexedDB. No account or cloud sync required. Your data stays on your device.

To backup your data:
- Use your browser's developer tools to export IndexedDB data
- Or use the daily summary feature to keep text records

## License

MIT
