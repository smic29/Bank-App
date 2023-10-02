import { useContext, createContext } from "react"
import { useState } from "react";

const LoginData = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([
        {
        username: 'Dan',
        password: 'theman',
        email: 'dantheman@gmail.com',
        isLoggedIn: false,
        balance: 100,
        isAdmin: true
        }
    ]);

    const updateData = (newData) => {
        setData((prevData) => [...prevData, newData]);
    }

    // console.log('Data in DataProvider:', data);

    const [ activeModal, setActiveModal ] = useState('');
    const [ isModalOpen, setIsModalOpen ] = useState(false);


    const handleActiveModal = (modalName) => {
        setActiveModal(modalName);
    }

    const openModal = (modName) => {
        setActiveModal(modName)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <LoginData.Provider 
        value={{data, updateData, isModalOpen, openModal, closeModal, activeModal, handleActiveModal}}>
            {children}
        </LoginData.Provider>
    )
}

export const useData = () => {
    return useContext(LoginData);
}