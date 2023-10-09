import './LoadUserData.css'
import { useData } from '../Context/UserData';

function LoadUserData(){
    const { isModalOpen, openModal } = useData();

    const isDisabled = isModalOpen;

    return (
        <div className='add-user-box'>
        <span 
        class={`material-symbols-outlined ${isDisabled ? 'disabled':''}`}
        onClick={() => !isDisabled && openModal('adduser')}>
        account_circle
        </span>
        <button
            onClick={() => !isDisabled && openModal('adduser')}
            className='load-user-data-button'
        >Add User Data</button>
        </div>
    )
}

export default LoadUserData