import React, {useContext} from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductItem from './ProductItem';

function ProductList() {

    const {showedProducts} = useContext(ProductContext);

    return (
        <div className="products-container">
        <div className="above-list">
            
            {showedProducts.length > 0 && showedProducts.length + (showedProducts.length === 1 ? " resultaat gevonden" : " resultaten gevonden")} 
        </div>
        <div className="product-list">
            {showedProducts && showedProducts.map(product => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
        {showedProducts.length === 0 &&  <div className="no-results">
        We hebben geen producten gevonden voor deze filters.
        </div>}
        </div>
    )
}

export default ProductList
