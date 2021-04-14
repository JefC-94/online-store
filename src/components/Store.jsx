import React from 'react';
import ProductFilter from './store/ProductFilter';
import ProductList from './store/ProductList';

function Store() {

    return (
        <>
            <main className="container store-main">
                <div className="store-container">
                    <ProductFilter />
                    <ProductList />
                </div>
            </main>
        </>
    )
}

export default Store
