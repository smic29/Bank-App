import { useData } from "../Context/UserData";
import './TransactionsHistory.css'

function TransactionHistory(props) {
    const { user } = props;
    const { data } = useData();

    return (
        <div>
            <h2>Transaction History</h2>
            {user.transactions.map((item, index) => (
                <p key={index} className="transactions">{item}</p>
            ))}
        </div>
    )
}

export default TransactionHistory