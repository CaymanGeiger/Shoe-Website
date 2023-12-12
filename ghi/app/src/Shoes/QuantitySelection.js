import "./QuantitySelection.css"
import { useState } from 'react';

export default function QuantitySelection({ onQuantityChange, closeSelection, HandleAddToCartClick }) {
    const [selectionAmount, setSelectionAmount] = useState(0)

    return (
        <div className="quantitySelectionDiv">
            <h1 className="quantitySelectionHeader">
                How Many?
            </h1>
            <div
            className="quantitySelectionInputDiv"
            style={{
                display: "flex",
            }}
            >
                <label htmlFor="selectionAmount">Quantity</label>
                <select
                    placeholder="Quantity..."
                    className="text-center form-control selectElement"
                    onChange={(e) => {
                        setSelectionAmount(e.target.value)
                        onQuantityChange(e.target.value)
                    }}
                    value={selectionAmount}
                    required
                    type="number"
                    name="Quantity"
                    id="Quantity">
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <button
            className="quantitySelectionButton"
                onClick={() => {
                    HandleAddToCartClick()
                    closeSelection()
                }}
            >
                Confirm
            </button>
        </div>
    )
}
