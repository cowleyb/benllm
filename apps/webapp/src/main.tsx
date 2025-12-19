import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import './index.css';
import App from './App.tsx';

function Test() {
  return <div>Test</div>;
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Test },
      { path: 'about', Component: Test },
      {
        path: 'auth',
        Component: Test,
        children: [
          { path: 'login', Component: Test },
          { path: 'register', Component: Test },
        ],
      },
      {
        path: 'concerts',
        children: [
          { index: true, Component: Test },
          { path: ':city', Component: Test },
          { path: 'trending', Component: Test },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
