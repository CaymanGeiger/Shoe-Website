import {useState, useEffect} from 'react';
import { BrandsArrowToggleButton, StoresArrowToggleButton, PricesArrowToggleButton, ColorsArrowToggleButton, CategoriesArrowToggleButton, NamesArrowToggleButton } from './filter';
import { Link } from "react-router-dom"


function ShoeList() {
    const [shoes, setShoes] = useState([]);
    const [bins, setBins] = useState([]);
    const [bin, setBin] = useState("");
    // const [filteredList, setFilteredList] = useState([]);
    const [nameIsUp, setNameIsUp] = useState(false);

    async function loadShoes() {
        const response = await fetch('http://localhost:8080/api/shoes/');
        const data = await response.json();
        setShoes(data.shoes);
    }


    async function loadBins(){
        const response = await fetch ("http://localhost:8100/api/bins/");
        const data = await response.json();
        setBins(data.bins)
    }
    useEffect(() => {
        loadShoes();
        loadBins();
    }, []);


    async function filterShoes() {
        if (bin !== ""){
            const pk = bin
            const response = await fetch(`http://localhost:8080/api/bin/${pk}/shoes/`);
            const data = await response.json();
            setShoes(data.shoes);
        }
    }


    function handleBinChange(e){
        setBin(e.target.value)
    }
    useEffect(() => {
        filterShoes();
    }, [bin]);


    function handleAllShoesClick(){
        loadShoes();
    }


    async function handleOnDelete(e) {
        const pk = e.target.id
        const request = await fetch (`http://localhost:8080/api/shoe/${pk}/`, {
            method: "DELETE"
        });
        const resp = await request.json()
        if (resp.deleted){
            alert("Was Deleted")
            loadShoes()
        } else {
            alert("Not Deleted!")
        }
    }


    // function onToggleNameDirection(){

    // }

    // function onToggleBrandDirection(){

    // }

    const sortedList = shoes.sort((shoeA, shoeB) => {
        if (nameIsUp === true) {
            return shoeA.name.localeCompare(shoeB.name);
        } else if (nameIsUp === false){
            return shoeB.name.localeCompare(shoeA.name);}
    });

return (
    <div className="mainDiv mt-3">
    <div style={{display: "flex", justifyContent: "center" }}>
    <select className="btn-secondary" style={{width: "20vw", backgroundColor: "black"}} value={bin} onChange={handleBinChange} required name="bin" id="bin">
        <option style={{textAlign: "center"}} value="up">Choose a store</option>
        {bins.map(bin => {
            return (
            <option key={bin.id} value={bin.id} >
            {bin.closet_name}
            </option>
            );
        })}
    </select>
    </div>
    <div className='mt-3'>
    <table className="table table-hover listTable">
        <thead className='mt-5'>
        <tr className="listTr">
            <th className=''>Names <NamesArrowToggleButton onToggleNameDirection={setNameIsUp}/></th>
            <th>Brands <BrandsArrowToggleButton/></th>
            <th>Categories<CategoriesArrowToggleButton/></th>
            <th>Prices<PricesArrowToggleButton/></th>
            <th>Sizes<ColorsArrowToggleButton/></th>
            <th>Colors<ColorsArrowToggleButton/></th>
            <th>Stores<StoresArrowToggleButton/></th>
            <th>Sku's<StoresArrowToggleButton/></th>

            <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {sortedList.map(shoe => {
            return (
            <tr key={shoe.id}>
                <td><Link to={`/shoes/${shoe.id}`}>{ shoe.name }</Link></td>
                <td>{ shoe.brand }</td>
                <td>{ shoe.category }</td>
                <td> ${ shoe.price }</td>
                <td>{ shoe.size }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.bin.name }</td>
                <td>{ shoe.sku }</td>
                <td><button onClick={handleOnDelete} id={shoe.id}className="btn btn-danger btn-sm">Delete</button></td>

            </tr>
            );
        })}
        </tbody>
    </table>
</div>
<div style={{display: "flex", justifyContent: "center"}}>
<button className="btn-secondary" style={{width: "15vw", fontSize: "1em", overflow: "hidden", backgroundColor: "black"}}onClick={handleAllShoesClick}>Refresh</button>
</div>

</div>
);
}
export default ShoeList;
