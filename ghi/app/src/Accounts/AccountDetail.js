import {useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/AuthContext';
import "./AccountDetail.css"
import { format } from 'date-fns';

function AccountDetail() {
    const [account, setAccounts] = useState({});
    const { userId } = useAuth();
    const date = new Date(account.date_joined);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });


    

    useEffect(() => {

        async function loadAccount() {
            const response = await fetch(`http://localhost:8070/api/account/${userId}/`);
            const data = await response.json();
            setAccounts(data);
        }
        loadAccount();
    }, []);


return (
    <div className='accountDetailMainDiv'>
        {account.is_active ? "yes" : "no"}
        <div className='accountCardBox'>
                <div className='accountNameImageDiv'>
                        <div className='accountImageDiv'>
                            <img className="accountImage" src={account.profile_picture}/>
                        </div>
                        <div className='accountNameDiv'>
                            <div className='accountNameDateDiv'>
                            <h5 className='accountName'>{account.first_name} {account.last_name}</h5>
                            <h5 className='accountDate'> Wardrobify Member Since: {formattedDate}</h5>
                            </div>
                        </div>
                </div>
                <div className='accountInfo'>
                    <h5 className='accountDetailsHeader'>Account Info:</h5>
                <div className='accountDetails'>
                    <div className='accountDetailsDiv'>
                        <h5 className='accountDetailsHeader'>Username:</h5>
                        <p className='accountDetailData'>{account.username}</p>
                    </div>
                    <div className='accountDetailsDiv'>
                        <h5 className='accountDetailsHeader'>Rank</h5>
                        <p className='accountDetailData'>{account.user_level}</p>
                    </div>
                    <div className='accountDetailsDiv'>
                        <h5 className='accountDetailsHeader'>Email</h5>
                        <p className='accountDetailData'>{account.email}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
export default AccountDetail;
