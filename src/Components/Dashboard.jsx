import './Dashboard.css'
import { useData } from '../Context/UserData'
import TransactionHistory from './TransactionHistory';
import { useState } from 'react';
import CurrencyFormatter, { formatCurrency } from '../Assets/CurrencyFormatter';
import AddUserModal from './Modals/AddUserModal';
import { CSSTransition } from 'react-transition-group';


function Dashboard(props) {
    const { user, onLogout } = props;
    const { data, isModalOpen, openModal }  = useData();
    const currentUser = data.find((useObj) =>
    useObj.username.toLowerCase() === user.username.toLowerCase());

    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-welcome'>Welcome to your Dashboard, {user.username}!</h1>
            <LogoutButton onLogout={onLogout} user={user}/>
            {user.isAdmin ? 
            <ClientList /> :
            <>
            <h2>Current Account balance is: <CurrencyFormatter amount={currentUser.balance} /></h2>
            <p>What would you like to do today?</p>
            </>
            }
            <TransactionButtons user={user}/>
            <TransactionHistory user={user}/>
            <CSSTransition
            in={isModalOpen}
            timeout={300}
            classNames="modal"
            >
            <AddUserModal user={user}/>
            </CSSTransition>
            <button className='bA' onClick={()=>openModal('budget')}>Budget-App</button>
        </div>
    )
}

function LogoutButton(props) {
    const { onLogout, user } = props
    const { triggerNotif, giveNotif } = useData();

    return (
        // <button
        //     onClick={() => {
        //         giveNotif(`Good bye ${user.username}`);
        //         triggerNotif();
        //         onLogout();
        //     }}
        //     className="logout-button"
        // >
        //     Logout
        // </button>
        <span class="material-symbols-outlined logout"
        onClick={() => {
                     giveNotif(`Good bye ${user.username}`);
                     triggerNotif();
                     onLogout();
                 }}>
        logout
        </span>
    )
}

function ClientList() {
    const { data } = useData();
    const [ expandedRows, setExpandedRows ] = useState([]);
    
    const toggleRow = (index) => {
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !==index));
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    }

    return (
        <>
        <h2 className='table-header'>Client List</h2>
        <table className='client-table'>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
            {data.map((client, index) => (
                <>
                    <tr key = {index} 
                        onClick={() => client.transactions.length > 0 && toggleRow(index)}
                        className={expandedRows.includes(index) ? 'expanded-row' : ''}>
                        <td>{client.username}</td>
                        <td>{client.email}</td>
                        <td className='client-amount-column'
                        ><CurrencyFormatter amount={client.balance} /></td>
                    </tr>
                    {expandedRows.includes(index) && (
                        <tr className='transactions-row'>
                            <td colSpan="3">
                                {client.transactions.map((transaction, tIndex) => (
                                    <div key={tIndex}>
                                        Transaction: {transaction}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    )}
                </>
            ))}
            </tbody>
        </table>
        </>
    )
}

function TransactionButtons() {
    const { openModal } = useData();

    return (
        <div className='transaction-buttons-box'>
            <button
                onClick={() => openModal('deposit')}
            >Deposit</button>
            <button
                onClick={() => openModal('withdraw')}
            >Withdraw</button>
            <button
                onClick={() => openModal('transfer')}
            >Transfer</button>
        </div>
    )
}

export default Dashboard;