import './LoadUserData.css'
import { useData } from '../Context/UserData';

function LoadUserData(){
    const { updateData } = useData();

    const addUser = () => {
        const newUser = {
            username: 'test',
            password: 'test',
            email: 'test@test.com',
            isLoggedIn: false,
            };
        
        updateData(newUser);
        alert(`username test with password test added`);
    }

    return (
        <button
            onClick={addUser}
        >Add User Data</button>
    )
}

export default LoadUserData