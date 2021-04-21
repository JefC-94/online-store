import React, {useContext} from 'react'
import {ProductContext} from '../../../contexts/ProductContext';

function ProductSort() {

    const {filters, setFilters} = useContext(ProductContext);

    return (
        <div className="items-sorting">
            <div className="filter-control">
                <select value={filters.sorting} onChange={(e) => setFilters(prevVal => ({...prevVal, sorting: e.target.value}))}>
                    <option value="">Sorteer op</option>
                    <option value="PRICE_ASC">Prijs laag - hoog</option>
                    <option value="PRICE_DESC">Prijs hoog - laag</option>
                    <option value="ALPHA_ASC">Alfabetisch - A-Z</option>
                    <option value="ALPHA_DESC">Alfabetisch - Z-A</option>
                </select>
            </div>
        </div>
    )
}

export default ProductSort
