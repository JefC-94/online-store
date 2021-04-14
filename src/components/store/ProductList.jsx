import React, {useContext} from 'react';
import { CartContext } from '../../contexts/CartContext';
import ProductItem from './ProductItem';

function ProductList() {

    const {products} = useContext(CartContext);

    return (
        <>
        <div className="product-list">
            {products && products.map(product => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
        </>
    )
}

export default ProductList
