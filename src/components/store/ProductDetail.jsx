import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {CartContext} from '../../contexts/CartContext';
import {axiosObject} from '../../Constants';

function ProductDetail() {

    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [count, setCount] = useState();
    const {orderId} = useContext(CartContext);

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCount();
        return () => {
            setCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, product]);

    async function getProduct(){
        const request = await axiosObject(`/product/${id}`);
        console.log(request.data);
        setProduct(request.data);
    }

    async function getCount(){
        const request = await axiosObject(`del_order_item?filter=order_id,eq,${orderId}&filter=product_id,eq,${product.id}`);
        const selOrderItem = request.data.records[0];
        if(selOrderItem){
            setCount(selOrderItem.count);
        } else {
            setCount(0);
        }
    }

    return (
        <>
        <Link to="/store">Back to all products</Link>
        {product && 
        <div className="product-list-item" key={product.id} >
            <img src={product.photo_url} alt={product.name} />
            <div className="list-item-info">
                <div className="list-item-content">
                    <p>{product.name}</p>
                    {/* <p className="description">{product.description.substring(0,100)}...</p> */}
                </div>
                <div className="list-item-extra">
                    {count === 0 && <button className="button primary">Add to cart</button>}
                    {count > 0 && <div className="">
                        {count}
                    </div>}
                    
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ProductDetail
