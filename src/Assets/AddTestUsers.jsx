import { useState } from "react";
import { useData } from "../Context/UserData";
import './AddTestUsers.css'

function AddTestUsers(props) {
    const { onAdd, isAdded } = props;
    const { mergeData, triggerNotif, giveNotif } = useData();

    const addUsers = async () => {
        try {
            const response = await fetch('./testusers.json')
            const userData = await response.json();
            mergeData(userData);
            // alert('Test Users Added to list')
            giveNotif(`Test Users Added to Client List`);
            triggerNotif();
            onAdd();
        } catch (error) {
            alert('Error loading user data')
            console.error('Error: ', error)
        }
    }

    return (
        <>
        <button
            onClick={addUsers}
            disabled = {isAdded}
            className="test-user-button"
        >
        {isAdded ? 'Test Users Added' : 'Add Test Users'}
        </button>
        </>
    )
}

export default AddTestUsers