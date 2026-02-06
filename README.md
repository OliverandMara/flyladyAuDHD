# Dopamine Rooms

A structured, AuDHD-friendly task management PWA with instant rewards and coaching.

## ✅ Complete MVP Features

**Today Screen:**
- Command-based interface ("Do this now: [task]")
- Daily task list respecting frequency rules
- Daily cap enforcement (3-10 tasks)
- One-tap "Do Next" CTA
- Task cards with room context

**Timer Screen:**
- Full-screen countdown with progress ring
- Coaching lines that evolve with progress (90 lines, 3 tones)
- Pause/resume functionality
- "Finish Early" option (unless No Negotiation Mode enabled)
- Celebration screen on completion
- +1 sticker earned per timer completion

**Rooms Screen:**
- Create/view rooms
- Task count per room
- Room color coding
- Simple emoji-based icons

**Rewards Screen:**
- Sticker count display
- Today's stats (timers completed, tasks done)
- Visual celebration of progress

**Settings Screen:**
- Coaching tone selector (Soft/Firm/Brutal)
- Daily cap stepper (3-10 tasks)
- No Negotiation Mode toggle
- Sound/vibration toggles
- Data export (JSON)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

The app will seed with 3 rooms and 15 example tasks on first load.

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to:
- **Vercel:** `vercel --prod`
- **Netlify:** Drag `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages:** Push `dist` contents to `gh-pages` branch

The PWA will work offline automatically via service worker.

## Architecture

### Data Layer
**IndexedDB** stores everything locally:
- `rooms` - Focus spaces with color/emoji
- `tasks` - Actions with frequency rules (daily/weekly/custom)
- `dailyStates` - Daily progress tracking
- `settings` - User preferences

**Hooks** (`src/hooks/useDB.ts`):
- `useRooms()` - Room CRUD
- `useTasks(roomId?)` - Task management
- `useDailyState()` - Today's completion tracking
- `useSettings()` - Preferences
- `useTimer(minutes, onComplete)` - Countdown logic

### Business Logic
**Today List Generation** (`src/lib/today.ts`):
1. Filter tasks by frequency (daily/weekly mask/custom interval)
2. Remove already-completed tasks
3. Sort by room priority, then creation date
4. Apply daily cap
5. Attach room metadata

**Coaching System** (`src/lib/coaching.ts`):
- 90 lines across 3 tones (30 per tone)
- Lines selected by progress % (0-100)
- Completion lines randomized
- Scottish dialect optional (not yet implemented)

**Frequency Rules:**
- **Daily:** Shows every day
- **Weekly:** Bitmask for days (0b0101010 = Mon/Wed/Fri/Sun)
- **Custom:** Interval in days (e.g., every 3 days)

### UI Components
**Shared** (`src/components/shared/`):
- `Button` - 4 variants, 3 sizes, accessible
- `Card` - Border color coding for rooms
- `Modal` - Bottom sheet, keyboard accessible
- `ProgressRing` - SVG countdown circle
- `TabBar` - Bottom navigation

**Screens** (`src/components/screens/`):
- `TodayScreen` - Command bar + task list
- `TimerScreen` - Countdown + coaching
- `RoomsScreen` - Room management
- `RewardsScreen` - Sticker display
- `SettingsScreen` - Preferences

### Design System
**Color Palette** (WCAG AA compliant):
- **Beige:** `#FAF8F5` to `#7A6B50` (backgrounds, surfaces)
- **Steel Blue:** `#F4F7F9` to `#1F2D3A` (primary, text)
- **Brass:** `#E5D4B8` to `#8A6B3E` (accents, progress)

**Tokens** (`src/styles/tokens.css`):
- Spacing: `--space-xs` to `--space-xl`
- Typography: `--font-size-xs` to `--font-size-3xl`
- Touch targets: `--tap-target-min: 44px`
- Bottom nav: `--bottom-nav-height: 64px`

## File Structure

```
src/
├── components/
│   ├── shared/          # Reusable UI (Button, Card, Modal, etc.)
│   └── screens/         # Page components (Today, Timer, etc.)
├── hooks/              # React hooks (useDB, useTimer)
├── lib/                # Business logic
│   ├── db.ts           # IndexedDB wrapper
│   ├── seed.ts         # Example data
│   ├── coaching.ts     # 90 coaching lines
│   └── today.ts        # Daily list generation
├── types/              # TypeScript definitions
├── styles/             # Global CSS tokens
├── App.tsx             # Router setup
└── main.tsx            # Entry point
```

## Next Steps

### Planned Features
1. **Zone System:**
   - Weekly focus areas within rooms
   - Bonus sticker for completing zone

2. **Sticker Placement:**
   - Drag-and-drop onto room/zone grids
   - Visual progress tracking

3. **Data Import:**
   - JSON file upload
   - Restore from backup

4. **Scottish Dialect:**
   - Oliver's voice in coaching lines
   - Toggle in settings

5. **Task Detail Editor:**
   - Edit frequency, duration, notes
   - Reorder tasks within room

6. **PWA Enhancements:**
   - Custom icons (replace emoji)
   - Install prompt
   - Push notifications

### Development Workflow

```bash
# Type check
npm run type-check

# Dev server with hot reload
npm run dev

# Production build
npm run build
```

## Technical Highlights

- **Offline-first:** All data in IndexedDB, no server required
- **Accessible:** WCAG AA compliant, keyboard navigable, screen reader friendly
- **Mobile-optimized:** 44px touch targets, one-thumb navigation
- **Type-safe:** Full TypeScript coverage
- **Fast:** Vite dev server, optimized production build
- **Clean architecture:** Hooks for data, components for UI, pure functions for logic

## License

MIT

## Credits

Built with:
- React + TypeScript
- Vite
- IndexedDB (via `idb`)
- React Router
- Vite PWA Plugin

Designed for AuDHD brains by someone who gets it.
