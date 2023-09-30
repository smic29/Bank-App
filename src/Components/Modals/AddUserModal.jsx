import { useState } from 'react';
import { useData } from '../../Context/UserData';
import './AddUserModal.css';

function AddUserModal({ isOpen, onClose}) {
    if (!isOpen) return null;

    return (
        <div className='addUser-modal'>
            <div className='addUser-formBox'>
                <button className='close-button' onClick={onClose}>
                    X
                </button>
                <AddUserForm onSubmit={onClose} />
            </div>
        </div>
    )
}

function AddUserForm({onSubmit}) {
    const { data, updateData } = useData();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ balance, setBalance ] = useState(0);

    const addUser = () => {
        const newUser = {
            username: username,
            password: password,
            email: email,
            isLoggedIn: false,
            balance: balance,
            isAdmin: false
        }

        updateData(newUser);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const usernameCheck = data.find((userObj) => 
        userObj.username.toLowerCase() === username.toLowerCase())

        if (!usernameCheck){
            addUser();
            alert(`New User Added!`);
            onSubmit();
        } else {
            alert('username already exists')
        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <label>Username: </label>
            <input 
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            ></input> <br />
            <label>Password: </label>
            <input 
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input> <br />
            <label>Initial Balance: </label>
            <input 
                type='number'
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
            ></input> <br />
            <label>Email: </label>
            <input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input> <br />
            <input
                type='submit'
            ></input>
        </form>
    )
}

export default AddUserModal;