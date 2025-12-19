import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ComponentExample } from '~/components/component-example';

function App() {
  const [count, setCount] = useState(0);

  return <ComponentExample />;
}

export default App;
