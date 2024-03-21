import React, { useState } from 'react'; // Added React import
import { Outlet } from 'react-router-dom'; // Fixed Outlet import
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import MyFooter from './components/MyFooter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <Navbar/> {/* Assuming reactLogo is your site logo */}
      </nav>
      <div className='min-h-screen'> 
        <Outlet />
      </div>
      <MyFooter/>
    </>
  );
}

export default App;
