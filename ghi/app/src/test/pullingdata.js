import Header from "./data"
import {useState, useEffect} from 'react';

export default function Pullingdata() {
    const [data1, setData1] = useState('');

    function handleClick() {
        setData1("123")
    }

    return (
        <div>
            <button onClick={handleClick}>
                press
            </button>
        <Header dataID={data1} />
        </div>
    )
}
