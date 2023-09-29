import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import LoadUserData from './Components/LoadUserData';
import { useState } from 'react';
import { DataProvider } from './Context/UserData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
  }

  return (
    <DataProvider>
      {isLoggedIn ? (
        <Dashboard user={user} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </DataProvider>
  );
}

export default App;
