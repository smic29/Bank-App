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
        }
    ]);

    const updateData = (newData) => {
        setData((prevData) => [...prevData, newData]);
    }

    console.log('Data in DataProvider:', data);

    return (
        <LoginData.Provider value={{data, updateData}}>
            {children}
        </LoginData.Provider>
    )
}

export const useData = () => {
    return useContext(LoginData);
}