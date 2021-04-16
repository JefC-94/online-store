import React, {createContext, useState, useEffect, useContext} from 'react';
import {UserContext} from './UserContext';
import {axiosObject} from '../Constants';

export const CartContext = createContext();

function CartContextProvider(props) {

    const [orderId, setOrderId] = useState();
    //Two options for cart:
    // -> undefined = no cart (no user and no localstorage cart yet)
    // -> array, either empty or filled with cartItems
    const [cart, setCart] = useState();

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    useEffect(() => {
        if(theUser){
            getCartFromUser();
        } else {
            getCartFromLS();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theUser]);

    useEffect(() => {
        if(orderId){
            getCart();
        }
    }, [orderId]);

    async function getCart(){
        const request = await axiosObject.get(`/del_order/${orderId}?join=del_order_item,product`);
        setCart(request.data.del_order_item);
    }

    async function getCartFromUser(){
        const request = await axiosObject.get(`/del_order?join=del_order_item,product&filter=user_id,eq,${theUser.id}`);
        setOrderId(request.data.records[0].id);
    }

    async function getCartFromLS(){
        if(localStorage.getItem('cart_id')){
            const cartId = localStorage.getItem('cart_id');
            const request = await axiosObject.get(`/del_order/${cartId}?join=del_order_item,product`);
            setOrderId(request.data.id);
        } else {
            setOrderId();
            setCart();
        }
    }

    async function addCartItem(product_id){
        const request = await axiosObject.post(`/del_order_item`, {
            order_id: orderId,
            product_id: product_id,
            count: 1
        });
        console.log(request.data);
        getCart();
    }

    async function plusCartItem(item){
        const request = await axiosObject.put(`/del_order_item/${item.id}`, {count : item.count+1});
        console.log(request.data);
        getCart();
    }

    async function minusCartItem(item){
        if(item.count === 1){
            const request = await axiosObject.delete(`/del_order_item/${item.id}`);
            console.log(request.data);
        }
        if(item.count > 1){
            const request = await axiosObject.put(`/del_order_item/${item.id}`, {count : item.count-1});
            console.log(request.data);
        }
        getCart();
    }

  
    async function createCart(product_id){
        console.log("create cart!");
        const timestamp = Math.floor(new Date().getTime() / 1000 );
        const request1 = await axiosObject.post(`/del_order`, {
            user_id: null,
            created_at: timestamp
        });
        const orderId = request1.data;
        const request = await axiosObject.post(`/del_order_item`, {
            order_id: orderId,
            product_id: product_id,
            count: 1
        });
        setOrderId(orderId);
        localStorage.setItem('cart_id', orderId);
    }

    async function deleteCart(){
        //when localstorage cart is empty, delete it
        //no use keeping track of an empty cart?
    }

    return (
        <CartContext.Provider value={{
            cart,
            addCartItem,
            plusCartItem,
            minusCartItem,
            createCart,
            deleteCart,
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
