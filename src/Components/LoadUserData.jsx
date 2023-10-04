import './LoadUserData.css'
import { useData } from '../Context/UserData';
import AddUserModal from './Modals/AddUserModal';

function LoadUserData(props){
    const { openModal, closeModal, isModalOpen } = useData();
    const { user } = props;

    return (
        <>
        <button
            onClick={() => openModal('adduser')}
            className='load-user-data-button'
        >Add User Data</button>
        {/* <AddUserModal user={user}/> */}
        </>
    )
}

export default LoadUserData