import './NotificationModal.css'
import { useData } from '../../Context/UserData';

function NotificationPopup(){
    const { notifMsg } = useData();

    return(
        <div className="notif-pop-up">
            <p className='message'>
                {notifMsg}
            </p>
        </div>
    )
}

export default NotificationPopup