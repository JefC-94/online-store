import React, {useContext} from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductItem from './ProductItem';

function ProductList() {

    const {showedProducts} = useContext(ProductContext);

    return (
        <>
        <div className="product-list">
            {showedProducts && showedProducts.map(product => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
        </>
    )
}

export default ProductList
