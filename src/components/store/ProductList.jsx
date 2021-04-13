import React, { useEffect, useState, useContext } from 'react';
import {axiosObject} from '../../Constants';
import ProductItem from './ProductItem';

function ProductList() {

    const [products, setProducts] = useState([]);    

    useEffect(() => {
        getProducts();
        return () => {
            setProducts([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getProducts(){
        const request = await axiosObject('/product?join=del_order_item');        
        setProducts(request.data.records);
    }

    return (
        <div className="product-list">
            {products && products.map(product => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
    )
}

export default ProductList
