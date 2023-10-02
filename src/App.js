import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import LoadUserData from './Components/LoadUserData';
import { useState } from 'react';
import { DataProvider } from './Context/UserData';
import AddUserModal from './Components/Modals/AddUserModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    user.isLoggedIn = false;
    setUser(null);
  }

  return (
    <DataProvider>
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
      {user !== null && user.isAdmin && (<LoadUserData user={user}/>)}
      <AddUserModal user={user}/>
    </DataProvider>
  );
}

export default App;
