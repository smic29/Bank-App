import './Dashboard.css'
import { useData } from '../Context/UserData'

function Dashboard(props) {
    const { user, onLogout, data } = props

    return (
        <div>
            <h1>Welcome to your Dashboard, {user.username}!</h1>
            <LogoutButton onLogout={onLogout}/>
            <ClientList/>
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
                    <strong>Email: </strong>{client.email},
                    <strong> Balance: </strong>{client.balance}
                </li>
            ))}
        </ul>
    )
}

export default Dashboard;