import './Dashboard.css'
import { useData } from '../Context/UserData'
import TransactionHistory from './TransactionHistory';
import { useRef, useState } from 'react';
import CurrencyFormatter, { formatCurrency } from '../Assets/CurrencyFormatter';
import AddUserModal from './Modals/AddUserModal';
import { CSSTransition } from 'react-transition-group';
import BudgetAppModal from './Modals/BudgetAppModal';


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
            <div className='ba-box'>
                <span class={`material-symbols-outlined ba-icon ${isModalOpen ? 'disabled' : ''}`}
                onClick={()=>openModal('budget')}>
                demography
                </span>
                <button className='bA-button'>Budget-App</button>
            </div>
        </div>
    )
}

function LogoutButton(props) {
    const { onLogout, user } = props
    const { triggerNotif, giveNotif } = useData();

    return (
        <div className='logout-box'>
        <span class="material-symbols-outlined logout"
        onClick={() => {
                     giveNotif(`Good bye ${user.username}`);
                     triggerNotif();
                     onLogout();
                 }}>
        logout
        </span>
        <button className='logout-button'>
            Logout
        </button>
        </div>
    )
}

function ClientList() {
    const { data } = useData();
    const [ expandedRows, setExpandedRows ] = useState([]);
    const [ sortColumn, setSortColumn ] = useState(null);
    const [ sortOrder, setSortOrder ] = useState('asc');
    const [ forceRerender, setForceRerender ] = useState(0);

    const sortData = (column, order) => {
        data.sort((a,b) => {
            if(column === 'balance') {
                const aValue = parseFloat(a[column])
                const bValue = parseFloat(b[column])

                return order === 'asc' ? aValue - bValue : bValue - aValue
            } else {
                const aValue = a[column]
                const bValue = b[column]

                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        })
        setForceRerender(Math.random())
    }

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }

        sortData(column, sortOrder)
    }

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
                    <th onClick={() => handleSort('username')}>
                    Username {sortColumn === 'username' && sortOrder === 'asc' && '▲'} {sortColumn === 'username' && sortOrder === 'desc' && '▼'}
                    </th>
                    <th onClick={() => handleSort('email')}>
                    Email {sortColumn === 'email' && sortOrder === 'asc' && '▲'} {sortColumn === 'email' && sortOrder === 'desc' && '▼'}
                    </th>
                    <th onClick={() => handleSort('balance')}>
                    Balance {sortColumn === 'balance' && sortOrder === 'asc' && '▲'} {sortColumn === 'balance' && sortOrder === 'desc' && '▼'}
                    </th>
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