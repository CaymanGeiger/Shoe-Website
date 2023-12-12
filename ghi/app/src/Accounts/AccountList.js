import {useState, useEffect} from 'react';

function AccountList() {
    const [accounts, setAccounts] = useState([]);

    async function loadAccounts() {
        const response = await fetch('http://localhost:8000/api/accounts/');
        const data = await response.json();
        setAccounts(data.accounts);
    }

    useEffect(() => {
        loadAccounts();
    }, []);


return (
    <div className="mt-3">
        <h1>Accounts</h1>
    <table className="table table-striped">
        <thead className='mt-5'>
        <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Joined</th>
        </tr>
        </thead>
        <tbody>
        {accounts.map(account => {
            return (
            <tr key={account.id}>
                <td>{ account.username }</td>
                <td>{ account.first_name }</td>
                <td>{ account.last_name }</td>
                <td>{ new Date(account.date_joined).toLocaleDateString('en-US') }</td>
            </tr>
            );
        })}
        </tbody>
    </table>
</div>
);
}
export default AccountList;
