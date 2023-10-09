import './LandingPage.css'
import { useData } from '../Context/UserData'
import { useState } from 'react';

function LandingPage({onLogin}){
    const { data, triggerNotif, giveNotif  } = useData();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const user = data.find((userObj) => 
        userObj.username === username &&
        userObj.password === password)

        if (user){
            // alert(`Login successful. Hello ${username}`)
            giveNotif(`Login Succesful. Hello ${user.username}!`)
            triggerNotif();
            user.isLoggedIn = true;
            console.log(user);
            onLogin(user);
        } else {
            // alert(`Login failed. Please check login information`)
            giveNotif(`Login Failed. Check login information`)
            triggerNotif();
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
                autoFocus
            />
            <label>Password : </label>
            <div className='password-input-box'>
                <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span 
                class='material-symbols-outlined'
                onMouseEnter={togglePasswordVisibility}
                onMouseLeave={togglePasswordVisibility}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                </span>
            </div>
            <input 
                className='submit-button'
                type="submit"
                value="Log in"
            />
            
        </form>
    )
}

export default LandingPage