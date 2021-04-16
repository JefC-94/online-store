import React, {useContext} from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductItem from './ProductItem';

function ProductList() {

    const {showedProducts} = useContext(ProductContext);

    return (
        <div className="products-container">
        <div className="above-list">
            
            {showedProducts.length > 0 && showedProducts.length + (showedProducts.length === 1 ? " result found" : " results found")} 
        </div>
        <div className="product-list">
            {showedProducts && showedProducts.map(product => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
        <div className="no-results">
        {showedProducts.length === 0 && "we have found no products for these filters."}
        </div>
        </div>
    )
}

export default ProductList
