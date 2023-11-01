import {useState, useEffect} from 'react'

function HatList() {
    const [hats, setHats] = useState([]);

    async function loadHats() {
        const response = await fetch ("http://localhost:8090/api/hats/")
        const data = await response.json();
        setHats(data.hats)
    }

    useEffect(() => {
        loadHats();
    }, []);

    async function deleteOnClick(e) {
        const request = await fetch (`http://localhost:8090/api/hats/${e.target.id}/`, {
            method: "DELETE"
        });
        const response = await request.json();
        if (response.deleted) {
            loadHats()
        } else {
            alert("not deleted")
        }
    }



return (
    <div>
        <table className="table table-striped">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brands</th>
                    <th>Categories</th>
                    <th>Prices</th>
                    <th>Sizes</th>
                    <th>Colors</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {hats.map(hat => {
            return (
            <tr key={hat.id}>
                <td>{ hat.name }</td>
                <td>{ hat.brand }</td>
                <td>{ hat.category }</td>
                <td> ${ hat.price }</td>
                <td>{ hat.size } </td>
                <td>{ hat.color }</td>
                <td><button onClick={deleteOnClick} id={hat.id}className='btn btn-danger btn-sm'>Delete</button></td>
            </tr>
        );
    })}
            </tbody>
        </table>
    </div>
)

}

export default HatList;
