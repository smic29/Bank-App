import './TransactionsModal.css'
import { useData } from '../../Context/UserData'
import { useState } from 'react'

export function DepositForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);
    const [ client, setClient ] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (balance < 0) {
            alert('You cannot deposit negative money lol')
        } else {
            user.balance = Number(user.balance) + Number(balance);
            setBalance(0);
            alert('Your balance will be updated shortly. Thank you')}
    }

    const doesClientExist = () => {
        if (client !== '') {
            const depositUser = data.find((depObj) =>
            depObj.username.toLowerCase() === client.toLowerCase())

            return !!depositUser;
        } else {
            return false
        }
    }

    function ExistHelper() {
        const userExists = doesClientExist();

        if (userExists){
            return <span className='username-accept deposit'>User is active</span>
        } else {
            return <span className='username-error deposit'>This user does not exist</span>
        }
    }

    const getClientObject = () => {
        if (doesClientExist()){
            const depositUser = data.find((depObj) =>
            depObj.username.toLowerCase() === client.toLowerCase())

            return depositUser
        } 
    }

    const handleAdminDeposit = (e) => {
        e.preventDefault();

        const deposituser = getClientObject();
        const depositAmount = Number(balance);
        const userBalance = Number(deposituser.balance);

        deposituser.balance = depositAmount + userBalance;
        setBalance(0);
        alert('Balance will be updated shortly')
    }

    if (user.isAdmin) {
        return (
            <form
                onSubmit={handleAdminDeposit}
                className='deposit-form'
            >
                <h1>Deposit</h1>
                <legend>
                    <div className='deposit-inputbox'>
                        <p>Select account to deposit to: </p>
                    <input
                        type='text'
                        value={client}
                        onChange={(e) => setClient(e.target.value)} 
                    />
                    </div>
                    {client !== '' && <ExistHelper />}
                    <div className='deposit-inputbox'>
                        <label>Amount to Deposit: </label>
                        <input 
                            type='number'
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        ></input>
                    </div>
                    {doesClientExist() &&
                    <span>Current account balance: {getClientObject().balance}</span>
                    }
                </legend>
                <input 
                    type='submit' 
                    className='transfer-submit-button'
                    disabled = {balance <= 0}
                    value= {balance <= 0 ? 'Please enter an amount' : 'Proceed'}
                    ></input>
            </form>
        )
    } else {
        return (
            <form
                onSubmit={handleFormSubmit}
                className='deposit-form'
            >
                <h1>Deposit</h1>
                <legend>
                    <p>Your current balance is: {user.balance} </p>

                    <div className='deposit-inputbox'>
                        <label>Amount to Deposit: </label>
                        <input 
                            type='number'
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        ></input>
                    </div>
                </legend>
                <input 
                    type='submit' 
                    className='transfer-submit-button'
                    disabled = {balance <= 0}
                    value= {balance <= 0 ? 'Please enter an amount' : 'Proceed'}
                    ></input>
            </form>
        )
    }
}

export function WithdrawForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);
    const [ client, setClient ] = useState('');

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

    const doesClientExist = () => {
        if (client !== '')  {
            const withdrawUser = data.find((witObj) =>
            witObj.username.toLowerCase() === client.toLowerCase())

            return !!withdrawUser;
        } else {
            return false
        }
    }

    function ExistHelper() {
        const userExists = doesClientExist();

        if (userExists){
            return <span className='username-accept withdraw'>User is active</span>
        } else {
            return <span className='username-error withdraw'>This user does not exist</span>
        }
    }

    const getClientObject = () => {
        if (doesClientExist()){
            const withdrawUser = data.find((withObj) =>
            withObj.username.toLowerCase() === client.toLowerCase())

            return withdrawUser
        }
    }

    const isLessThanBalance = () => {
        if (doesClientExist()){
            return balance <= getClientObject().balance;
        }
    }

    const handleAdminWithdrawal = (e) => {
        e.preventDefault();

        const withdrawFrom = getClientObject();
        const withdrawAmount = Number(balance);
        const userBalance = Number(withdrawFrom.balance);

        withdrawFrom.balance = userBalance - withdrawAmount;
        setBalance(0);
        alert('Withdrawal Succesful. Balance will be updated shortly')
    }

    if (user.isAdmin){
        return(
            <form
            onSubmit={handleAdminWithdrawal}
            className='withdraw-form'
        >
            <h1>Withdraw</h1>
            <legend>
                <div className='withdraw-inputbox'>
                    <p>Select account to deposit to:</p>
                    <input 
                    type='text'
                    value={client}
                    onChange={(e) => setClient(e.target.value)}/>
                </div>
                {client !== '' && <ExistHelper />}
                <div className='withdraw-inputbox'>
                    <label>Amount to Withdraw: </label>
                    <input
                        type='number'
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                </div>
                {doesClientExist() &&
                <span>Current account balance: {getClientObject().balance}</span>}
            </legend>
            <input 
                type='submit'
                className='transfer-submit-button'
                value={balance <= 0 ? 'Enter an amount' : 'Proceed'}
                disabled = {balance <= 0 || !isLessThanBalance()}/>
        </form>
        )
    } else {
        return(
            <form
                onSubmit={handleFormSubmit}
                className='withdraw-form'
            >
                <h1>Withdraw</h1>
                <legend>
                    <p>Your current balance is: {user.balance}</p>
                    
                    <div className='withdraw-inputbox'>
                        <label>Amount to Withdraw: </label>
                        <input
                            type='number'
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                    </div>
                </legend>
                <input 
                    type='submit'
                    className='transfer-submit-button'
                    value={balance <= 0 ? 'Enter an amount' : 'Proceed'}
                    disabled = {balance <= 0}/>
            </form>
    )}
}

export function TransferForm(props) {
    const { data, updateData } = useData();
    const { user } = props;
    const [ balance, setBalance ] = useState(0);
    const [ recipient, setRecipient ] = useState(null);
    const [ sendAmount, setSendAmount ] = useState(0);
    const [ sender, setSender ] = useState(null);

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
                return <p className='username-error'>What does sending to yourself do?</p>
            } else {
                return <p className='username-accept'>User is active</p>
            }
        } else {
            return <p className='username-error'>This user does not exist</p>
        }
    }

    const doesSenderExist = () => {
        if (sender !== null) {
            const sendUser = data.find((senObj) =>
            senObj.username.toLowerCase() === sender.toLowerCase())

            return !!sendUser;
        } else {
            return false;
        }
    }

    function SenderFinder() {
        const userExists = doesSenderExist();

        if (userExists) {
            return <p className='username-accept'>User is active</p>
        } else {
            return <p className='username-error'>This user does not exist</p>
        }
    }

    const giveRecipientBalance = () => {
        if (doesUserExist()) {
            const receiver = data.find((recObj) =>
            recObj.username.toLowerCase() === recipient.toLowerCase())

            return receiver.balance
        } else {
            return null
        }
    }

    const giveSenderBalance = () => {
        if (doesSenderExist()) {
            const senderBoi = data.find((senObj) =>
            senObj.username.toLowerCase() === sender.toLowerCase())

            return senderBoi.balance
        } else {
            return null
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
            setRecipient('');
        } else if (userExists && amountSend <= 0 && !isSendingtoSelf) {
            alert(`Yeah, still can do anything with nothing, bro.`)
        } else if (isSendingtoSelf){
            alert(`What does sending to yourself accomplish?`)
        } else if (!userExists) {
            alert(`Can't send to somebody that isn't on this app, bro`)
        }
    }

    const handleAdminTransfer = (e) => {
        e.preventDefault();

        const senduser = data.find((userObj) => userObj.username.toLowerCase() === sender.toLowerCase());
        const receiver = data.find((recObj) => recObj.username.toLowerCase() === recipient.toLowerCase())
        const amountSend = Number(sendAmount)
        const receiveBalance = Number(receiver.balance)
        const senderBalance = Number(senduser.balance)
        const receiverExists = doesUserExist();
        const senderExists = doesSenderExist();
        const isBalanceEnough = senderBalance >= amountSend;
        const isNotSamePerson = senduser.username.toLowerCase() !== receiver.username.toLowerCase()

        if (
            receiverExists && 
            senderExists && 
            amountSend > 0 && 
            isBalanceEnough &&
            isNotSamePerson
            ) {
            receiver.balance = amountSend + receiveBalance;
            senduser.balance = senderBalance - amountSend;
            alert(`Transfer Completed`);
            setRecipient(receiver.username)
            setSender(senduser.username)
            setSendAmount(0);
        } else {
            alert(`Please review transfer details`)
        }
    }
    
    if (user.isAdmin) {

        return(
            <form
                onSubmit={handleAdminTransfer} 
                className='transfer-form'       
            >
                <h1 className='transfer-header'>Transfer</h1>
                <div className='transfer-form-admin'>
                    <div className='sender-box box'>
                        <h2>Sender</h2>
                        <p>Current balance is: {giveSenderBalance()}</p>

                        <label>Sender's Username:</label>
                        <input 
                            type='text'
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            required
                        />
                        {sender !== null && sender !== '' && <SenderFinder />}
                        <label>Amount :</label>
                        <input
                            type='number' 
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className='receiver-box box'>
                        <h2>Receiver</h2>
                        <p>Current balance is: {giveRecipientBalance()}</p>

                        <label>Recipient's Username: </label>
                        <input
                            type='text'
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                        {recipient !== null && recipient !== '' && <UserFinder />}
                        
                        {/* <label>Amount: </label>
                        <input
                            type='number'
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            required
                        /> */}
                        <br />
                    </div>
                </div>
                {/* {doesUserExist() && <input
                    type='submit'
                    className='transfer-submit-button'
                    value='Send'
                />} */}
                <input
                    type='submit'
                    className='transfer-submit-button'
                    value='Send'
                    disabled = {!doesUserExist() || sendAmount <= 0 || !doesSenderExist()}
                />
            </form>
    )
    } else {
        return (
            <form
                onSubmit={handleFormSubmit}
                className='transfer-form'        
            >
                <h1 className='transfer-header'>Transfer</h1>
                <div className='box'>
                <p>Your current balance is: {user.balance}</p>

                <label>Recipient's Username: </label>
                <input
                    type='text'
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                {recipient !== null && recipient !== '' && <UserFinder />}
                
                <label>Amount: </label>
                <input
                    type='number'
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    required
                />
                <br />
                </div>
                <input
                    type='submit'
                    className='transfer-submit-button'
                    value='Send'
                    disabled = {!doesUserExist || sendAmount <= 0}
                />
            </form>
        )
    }
}
