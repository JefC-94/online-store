import React from 'react';
import ProductList from './store/ProductList';

function Store() {

    return (
        <>
            <main className="container store-main">
                <div className="store-container">
                    <ProductList />
                </div>
            </main>
        </>
    )
}

export default Store
