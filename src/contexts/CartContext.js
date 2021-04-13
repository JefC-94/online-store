import React, {createContext, useState, useEffect, useContext} from 'react';
import {UserContext} from './UserContext';
import {axiosObject} from '../Constants';

export const CartContext = createContext();

function CartContextProvider(props) {

    const [orderId, setOrderId] = useState();
    const [cartItems, setCartItems] = useState([]);

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    useEffect(() => {
        console.log("hello world");
    }, []);

    useEffect(() => {
        if(theUser){
            getCartItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theUser]);

    async function getCartItems(){
        const request = await axiosObject.get(`/del_order?join=del_order_item&filter=user_id,eq,${theUser.id}`);
        console.log(request.data.records[0]);
        setOrderId(request.data.records[0].id);
        setCartItems(request.data.records[0].del_order_item);
    }

    return (
        <CartContext.Provider value={{
            orderId,
            cartItems,
            setCartItems,
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
