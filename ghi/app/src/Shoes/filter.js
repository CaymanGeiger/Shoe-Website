import {useState} from 'react';


export function NamesArrowToggleButton(names) {
    const [nameIsUp, setNameIsUp] = useState(false);

    const toggleNameArrowDirection = () => {
        setNameIsUp(!nameIsUp);
        names.onToggleNameDirection(!nameIsUp);
    };
    return (
        <button className="btn btn-sm " onClick={toggleNameArrowDirection}>
            {nameIsUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }


export function BrandsArrowToggleButton(brands) {
    const [brandIsUp, setBrandIsUp] = useState(false);
    console.log(brandIsUp)

    const toggleBrandArrowDirection = () => {
        setBrandIsUp(!brandIsUp);
        brands.onToggleBrandDirection(!brandIsUp);
    };
    return (
        <button className="buttons btn btn-sm" onClick={toggleBrandArrowDirection}>
            {brandIsUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }


export function CategoriesArrowToggleButton() {
    const [isUp, setIsUp] = useState(true);

    const toggleArrowDirection = () => {
        setIsUp(!isUp);
    };
    return (
        <button className="btn btn-sm" onClick={toggleArrowDirection}>
            {isUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }

export function ColorsArrowToggleButton() {
    const [isUp, setIsUp] = useState(true);

    const toggleArrowDirection = () => {
        setIsUp(!isUp);
    };
    return (
        <button className="btn btn-sm" onClick={toggleArrowDirection}>
            {isUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }


export function PricesArrowToggleButton(prices) {
    const [priceIsUp, setPriceIsUp] = useState(false);

    const togglePriceArrowDirection = () => {
        setPriceIsUp(!priceIsUp);
        prices.onTogglePriceDirection(!priceIsUp);
    };
    return (
        <button className="btn btn-sm" onClick={togglePriceArrowDirection}>
            {priceIsUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }


export function StoresArrowToggleButton() {
    const [isUp, setIsUp] = useState(true);

    const toggleArrowDirection = () => {
        setIsUp(!isUp);
    };
    return (
        <button className="btn btn-sm" onClick={toggleArrowDirection}>
            {isUp ? (
            <span style={{ color: 'white' }}>&#9650;</span>
            ) : (
            <span style={{ color: 'white' }}>&#9660;</span>
            )}
        </button>
    );
    }
