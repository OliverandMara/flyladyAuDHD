import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/tokens.css';
import { seedDatabase } from '@/lib/seed';

seedDatabase().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
