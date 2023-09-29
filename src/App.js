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
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);

  const handleLogin = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    user.isLoggedIn = false;
  }

  const openModalAddUser = () => {
    setIsModalOpenAddUser(true);
  }

  const closeModalAddUser = () => {
    setIsModalOpenAddUser(false);
  }

  return (
    <DataProvider>
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
      <LoadUserData 
        isOpen={isModalOpenAddUser} 
        onClose={closeModalAddUser}
        openModal={openModalAddUser}
      />
    </DataProvider>
  );
}

export default App;
