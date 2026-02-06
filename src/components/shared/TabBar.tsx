import { NavLink } from 'react-router-dom';
import './TabBar.css';

export function TabBar() {
  const tabs = [
    { path: '/today', label: 'Today', icon: '📋' },
    { path: '/rooms', label: 'Rooms', icon: '🏠' },
    { path: '/rewards', label: 'Rewards', icon: '⭐' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="tab-bar" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `tab-item ${isActive ? 'tab-item-active' : ''}`}
        >
          <span className="tab-icon" role="img" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}