import './LoadUserData.css'
import { useData } from '../Context/UserData';
import AddUserModal from './Modals/AddUserModal';

function LoadUserData({ isOpen, onClose, openModal}){
    // const { updateData } = useData();

    // const addUser = () => {
    //     const newUser = {
    //         username: 'test',
    //         password: 'test',
    //         email: 'test@test.com',
    //         isLoggedIn: false,
    //         balance: 250
    //         };
        
    //     updateData(newUser);
    //     alert(`username test with password test added`);
    // }

    return (
        <>
        <button
            onClick={openModal}
            className='load-user-data-button'
        >Add User Data</button>
        <AddUserModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default LoadUserData