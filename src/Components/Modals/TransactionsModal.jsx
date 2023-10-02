import './TransactionsModal.css'
import { useData } from '../../Context/UserData'
import { useState } from 'react'

export function DepositForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (balance < 0) {
            alert('You cannot deposit negative money lol')
        } else {
            user.balance = Number(user.balance) + Number(balance);
            setBalance(0);
            alert('Your balance will be updated shortly. Thank you')}
    }

    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <h1>Deposit</h1>
            <p>Your current balance is: {user.balance} </p>

            <label>Amount to Deposit: </label>
            <input 
                type='number'
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
            ></input>
            <input type='submit'></input>
        </form>
    )
}

export function WithdrawForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentBalance = Number(user.balance);
        const withdrawAmount = Number(balance);

        if (withdrawAmount < 0){
            alert('might as well go deposit, bro. Negative withdrawal lol')
        } else if (currentBalance < withdrawAmount) {
            alert('Nice try omegalul')
        } else {
            user.balance = currentBalance - withdrawAmount;
            setBalance(0);
            alert('Withdrawal Successful. Your balance will be updated shortly. Thank you')
        }

    }
    return(
        <form
            onSubmit={handleFormSubmit}
        >
            <h1>Withdraw</h1>
            <p>Your current balance is: {user.balance}</p>

            <label>Amount to Withdraw: </label>
            <input
                type='number'
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
            />
            <input type='submit'/>
        </form>
    )
}

export function TransferForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);
    const [ recipient, setRecipient ] = useState(null);
    const [ sendAmount, setSendAmount ] = useState(0);

    const doesUserExist = () => {
        if (recipient !== null && user.username.toLowerCase() !== recipient.toLowerCase()) {
            const receiver = data.find((recObj) =>
            recObj.username.toLowerCase() === recipient.toLowerCase())
            
            return !!receiver;
        } else {
            return false;
        }
    }

    function UserFinder() {
        const userExists = doesUserExist();

        if (userExists) {
            if(recipient.toLowerCase() == user.username.toLowerCase()){
                return <p>What does sending to yourself do?</p>
            } else {
                return <p>User is active</p>
            }
        } else {
            return <p>This user does not exist</p>
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const receiver = data.find((recObj) =>
        recObj.username.toLowerCase() === recipient.toLowerCase())
        const amountSend = Number(sendAmount);
        const receiverBalance = Number(receiver.balance);
        const userBalance = Number(user.balance);
        const userExists = doesUserExist();
        const isSendingtoSelf = recipient.toLowerCase() == user.username.toLowerCase();

        if (userExists && amountSend > 0 && !isSendingtoSelf){
            receiver.balance = amountSend + receiverBalance;
            user.balance = userBalance - amountSend;
            alert(`Transfer completed. Balance will be updated shortly`)
            setSendAmount(0);
            setRecipient(null);
        } else if (userExists && amountSend <= 0 && !isSendingtoSelf) {
            alert(`Yeah, still can do anything with nothing, bro.`)
        } else if (isSendingtoSelf){
            alert(`What does sending to yourself accomplish?`)
        } else if (!userExists) {
            alert(`Can't send to somebody that isn't on this app, bro`)
        }
    }

    return(
        <form
            onSubmit={handleFormSubmit}        
        >
            <h1>Transfer</h1>
            <p>Your current balance is: {user.balance}</p>

            <label>Recipient's Username: </label>
            <input
                type='text'
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
            />
            <br />
            {recipient !== null && recipient !== '' && <UserFinder />}
            
            <label>Amount: </label>
            <input
                type='number'
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                required
            />
            <br />
            {doesUserExist() && <input
                type='submit'
            />}
        </form>
    )
}
