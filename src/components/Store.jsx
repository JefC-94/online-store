import React, {useContext, useState, useEffect} from 'react';
import {ProductContext} from '../contexts/ProductContext';
import ProductFilter from './store/ProductFilter';
import ProductList from './store/ProductList';

function Store() {

    const {sortAndFilter} = useContext(ProductContext);

    const [filters, setFilters] = useState({
        sorting: "", 
        brands: [], 
        categories: [], 
        name: null,
        in_stock: null,
    });

    useEffect(() => {
        sortAndFilter(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <>
            <main className="container inner store-main"> 
                <ProductFilter filters={filters} setFilters={setFilters} />
                <ProductList filters={filters} setFilters={setFilters} />
            </main>
        </>
    )
}

export default Store
