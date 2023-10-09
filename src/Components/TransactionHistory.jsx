import { useData } from "../Context/UserData";
import './TransactionsHistory.css'

function TransactionHistory(props) {
    const { user } = props;

    return (
        <div>
            <h2 className="table-header">Transaction History</h2>
            {user.transactions.map((item, index) => (
                <p key={index} className={`transactions ${determineNegative(item)}`}>{item}</p>
            ))}
        </div>
    )
}

function determineNegative(item) {
    if (item.includes('(')) {
        return 'debit';
    } else {
        return 'credit'
    }
}

export default TransactionHistory