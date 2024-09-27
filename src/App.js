import React, { useEffect } from 'react';
import RoutingParent from './components/RoutingParent';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './hookx/use-Auth';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: false, // Animation will occur only once when scrolling down
    });
  }, []);
  return (
    <>
    <AuthProvider>
    <DarkModeProvider>
   <RoutingParent />
    </DarkModeProvider>
    </AuthProvider>    
    </>
  );
}

export default App;
