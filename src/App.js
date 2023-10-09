import './App.css';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import LoadUserData from './Components/LoadUserData';
import { useState } from 'react';
import { DataProvider } from './Context/UserData';
import AddTestUsers from './Assets/AddTestUsers';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ areTestUsersAdded, setAreTestUsersAdded ] = useState(false);

  const handleLogin = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    user.isLoggedIn = false;
    setUser(null);
  }

  const handleAddedTestUsers = () => {
    areTestUsersAdded ? setAreTestUsersAdded(false) : setAreTestUsersAdded(true);
  }

  return (
    <DataProvider>
      <CSSTransition
      in={isLoggedIn}
      timeout={300}
      classNames="fade">
        {isLoggedIn ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </CSSTransition>
      {user !== null && user.isAdmin && (<LoadUserData user={user}/>)}
      {/* <AddUserModal user={user}/> */}
      {user !== null && user.isAdmin && <AddTestUsers isAdded= {areTestUsersAdded} onAdd={handleAddedTestUsers} />}
    </DataProvider>
  );
}

export default App;
