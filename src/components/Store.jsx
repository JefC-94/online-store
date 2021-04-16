import React from 'react';
import ProductFilter from './store/ProductFilter';
import ProductList from './store/ProductList';

function Store() {

    return (
        <>
            <main className="container inner store-main"> 
                <ProductFilter />
                <ProductList />
            </main>
        </>
    )
}

export default Store
