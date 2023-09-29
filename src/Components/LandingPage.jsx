import './LandingPage.css'
import { useData } from '../Context/UserData'
import { useState } from 'react';
import Dashboard from './Dashboard';

function LandingPage({onLogin}){
    const { data, updateData } = useData();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const user = data.find((userObj) => 
        userObj.username === username &&
        userObj.password === password)

        if (user){
            alert(`Login successful. Hello ${username}`)
            user.isLoggedIn = true;
            console.log(user);
            onLogin(user);
        } else {
            alert(`Login failed. Please check login information`)
        }
    }

    return (
        <form 
            className="login-form"
            onSubmit={handleFormSubmit}    
        >
            <label>Username : </label>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password : </label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                className='submit-button'
                type="submit"
            />
        </form>
    )
}

export default LandingPage