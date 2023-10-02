import './Dashboard.css'
import { useData } from '../Context/UserData'

function Dashboard(props) {
    const { user, onLogout } = props

    return (
        <div>
            <h1>Welcome to your Dashboard, {user.username}!</h1>
            <LogoutButton onLogout={onLogout}/>
            <ClientList />
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
        <ul>
            {data.map((client, index) => (
                <li key={index}>
                    <strong>Username: </strong>{client.username} <br />
                    <strong>Email: </strong>{client.email} <br />
                    <strong> Balance: </strong>{client.balance}
                </li>
            ))}
        </ul>
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