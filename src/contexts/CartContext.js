import React, {createContext, useState, useEffect, useContext} from 'react';
import {UserContext} from './UserContext';
import {axiosObject} from '../Constants';

export const CartContext = createContext();

function CartContextProvider(props) {

    const [orderId, setOrderId] = useState();
    //should be undefined instead of empty array: better for product item count showing
    const [cartItems, setCartItems] = useState([]);

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    const [products, setProducts] = useState();    

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

    useEffect(() => {
        if(theUser){
            getCartItems();
        } else {
            setOrderId()
            //important for the display of item counts
            setCartItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theUser]);

    async function getCartItems(){
        const request = await axiosObject.get(`/del_order?join=del_order_item,product&filter=user_id,eq,${theUser.id}`);
        setOrderId(request.data.records[0].id);
        setCartItems(request.data.records[0].del_order_item);
    }

    async function addCartItem(product_id){
        const request = await axiosObject.post(`/del_order_item`, {
            order_id: orderId,
            product_id: product_id,
            count: 1
        });
        console.log(request.data);
        getCartItems();
    }

    async function plusCartItem(item){
        const request = await axiosObject.put(`/del_order_item/${item.id}`, {count : item.count+1});
        console.log(request.data);
        getCartItems();
    }

    async function minusCartItem(item){
        if(item.count === 1){
            const request = await axiosObject.delete(`del_order_item/${item.id}`);
            console.log(request.data);
        }
        if(item.count > 1){
            const request = await axiosObject.put(`/del_order_item/${item.id}`, {count : item.count-1});
            console.log(request.data);
        }
        getCartItems();
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            products,
            addCartItem,
            plusCartItem,
            minusCartItem,
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
