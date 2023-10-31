import {useState} from 'react';


export function FilterBrands({ shoes, onBrandSelected }) {
    const [selectedBrand, setSelectedBrand] = useState("");

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        onBrandSelected(e.target.value);
    };

    let uniqueBrands = new Set();
    shoes.forEach(shoe => uniqueBrands.add(shoe.brand));
    let brandsArray = [...uniqueBrands];

    return (
        <div>
            <select value={selectedBrand} onChange={handleBrandChange} required name="brand" id="brand" className="form-select filterSelects">
                <option className="text-center">Brand</option>
                {brandsArray.map(brand => (
                    <option className="text-center" key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
        </div>
    );
}


export function FilterCategory({ shoes, onCategorySelected }) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onCategorySelected(e.target.value);
    };

    let uniqueCategories = new Set();
    shoes.forEach(shoe => uniqueCategories.add(shoe.category));
    let categoriesArray = [...uniqueCategories];

    return (
        <div>
            <select value={selectedCategory} onChange={handleCategoryChange} required name="category" id="category" className="form-select filterSelects">
                <option className="text-center">Category</option>
                {categoriesArray.map(category => (
                    <option className="text-center" key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}


export function FilterPrice({  onPriceSelected }) {
    const [selectedRange, setSelectedRange] = useState("");

    const priceRanges = [
        { label: '$1 - $50', min: 1, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $150', min: 100, max: 150 },
        { label: '$150 - $200', min: 150, max: 200 }
    ];

    const handlePriceChange = (e) => {
        setSelectedRange(e.target.value);
        onPriceSelected(e.target.value);
    };

    return (
        <div>
            <select value={selectedRange} onChange={handlePriceChange} required name="price" id="price" className="form-select filterSelects">
                <option className="text-center">Price Range</option>
                {priceRanges.map(range => (
                    <option className="text-center" key={range.label} value={range.label}>
                        {range.label}
                    </option>
                ))}
            </select>
        </div>
    );
}


export function FilterSize({  onPriceSelected }) {
    const [selectedRange, setSelectedRange] = useState("");

    const priceRanges = [
        { label: '4 - 6', min: 1, max: 50 },
        { label: '6 - 8', min: 50, max: 100 },
        { label: '8 - 10', min: 100, max: 150 },
        { label: '10 - 12', min: 150, max: 200 }
    ];

    const handlePriceChange = (e) => {
        setSelectedRange(e.target.value);
        onPriceSelected(e.target.value);
    };

    return (
        <div>
            <select value={selectedRange} onChange={handlePriceChange} required name="price" id="price" className="form-select">
                <option className="text-center">Price Range</option>
                {priceRanges.map(range => (
                    <option className="text-center" key={range.label} value={range.label}>
                        {range.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
