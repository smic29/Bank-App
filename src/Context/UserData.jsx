import { useContext, createContext } from "react"
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import NotificationPopup from "../Components/Modals/NotificationModal";

const LoginData = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([
        {
        username: 'Dan',
        password: 'theman',
        email: 'dantheman@gmail.com',
        isLoggedIn: false,
        balance: 100,
        isAdmin: true,
        transactions: []
        }
    ]);

    const updateData = (newData) => {
        setData((prevData) => [...prevData, newData]);
    }

    const mergeData = (buttondata) => {
        const mergedData = [...data, ...buttondata];
        setData(mergedData);
    }

    // console.log('Data in DataProvider:', data);

    const [ activeModal, setActiveModal ] = useState('');
    const [ isModalOpen, setIsModalOpen ] = useState(false);


    const handleActiveModal = (modalName) => {
        setActiveModal(modalName);
    }

    const openModal = (modName) => {
        setIsModalOpen(true)
        setActiveModal(modName)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const [ notifTrigger, setNotifTrigger ] = useState(false);
    const [ notifMsg, setNotifMsg ] = useState('');

    const triggerNotif = () => {
        setNotifTrigger(true);
        setTimeout(() => {setNotifTrigger(false)},3000)
    }

    const giveNotif = (msg) => {
        setNotifMsg(msg)
    }

    return (
        <LoginData.Provider 
        value={
            {data, updateData, mergeData,
            isModalOpen, openModal, closeModal, activeModal, handleActiveModal,
            notifTrigger, triggerNotif, notifMsg, giveNotif
            }}>
            {children}
            <CSSTransition
            in={notifTrigger}
            timeout={300}
            classNames="notif"
            >
            <>
            {notifTrigger && <NotificationPopup/>}
            </>
            </CSSTransition>
        </LoginData.Provider>
    )
}

export const useData = () => {
    return useContext(LoginData);
}