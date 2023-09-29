import './AddUserModal.css';

function AddUserModal({ isOpen, onClose}) {
    if (!isOpen) return null;

    return (
        <div className='addUser-modal'>
            <div className='addUser-formBox'>
                <button className='close-button' onClick={onClose}>
                    X
                </button>
                <p>Hello World</p>
            </div>
        </div>
    )
}

export default AddUserModal;