import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { EvoErrorBoundary } from './components/common/EvoErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EvoErrorBoundary>
      <App />
    </EvoErrorBoundary>
  </StrictMode>,
);

