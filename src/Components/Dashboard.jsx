import './Dashboard.css'
import { useData } from '../Context/UserData'

function Dashboard(props) {
    const { user, onLogout } = props;
    const { data }  = useData();
    const currentUser = data.find((useObj) =>
    useObj.username.toLowerCase() === user.username.toLowerCase());

    return (
        <div>
            <h1>Welcome to your Dashboard, {user.username}!</h1>
            <LogoutButton onLogout={onLogout}/>
            {user.isAdmin ? 
            <ClientList /> :
            <>
            <h2>Current Account balance is: {currentUser.balance}</h2>
            <p>What would you like to do today?</p>
            </>
            }
            <TransactionButtons user={user}/>
        </div>
    )
}

function LogoutButton(props) {
    const { onLogout } = props

    return (
        <button
            onClick={onLogout}
            className="logout-button"
        >
            Logout
        </button>
    )
}

function ClientList() {
    const { data } = useData();

    // const clogdata = () => {
    //     console.log(data);
    // }

    return (
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
                <tr key={index}>
                    <td>{client.username}</td>
                    <td>{client.email}</td>
                    <td>{client.balance}</td>
                </tr>
            ))}
            </tbody>
        </table>
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