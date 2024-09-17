import React from 'react';
import RoutingParent from './components/RoutingParent';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './hookx/use-Auth';

function App() {
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
