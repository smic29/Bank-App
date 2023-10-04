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
        setActiveModal(modName)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <LoginData.Provider 
        value={
            {data, updateData, mergeData,
            isModalOpen, openModal, closeModal, activeModal, handleActiveModal
            }}>
            {children}
        </LoginData.Provider>
    )
}

export const useData = () => {
    return useContext(LoginData);
}