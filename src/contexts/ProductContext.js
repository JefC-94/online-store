import React, {createContext, useState, useEffect} from 'react';
import {axiosObject} from '../Constants';

export const ProductContext = createContext();

function ProductContextProvider(props) {

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const [filters, setFilters] = useState({
        sorting: "", 
        brands: [], 
        categories: [], 
        name: null,
        in_stock: null,
    });
    
    useEffect(() => {
        getProducts();
        return () => {
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        if(products){
            setFilteredProducts(products);
            //console.log(products);
        }
        return () => {
            setFilteredProducts([]);
        }
    }, [products]);

    useEffect(() => {
        sortAndFilter(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    async function getProducts(){
        const request = await axiosObject('/product?join=del_order_item&join=prod_cat');        
        setProducts(request.data.records);
    }

    function sortAndFilter({sorting, brands, categories, name, in_stock}){
        setFilteredProducts([...products
            .filter(product => {
                if(name){
                    return product.name.toLowerCase().includes(name.toLowerCase());
                } else {
                    return product;
                }
            })
            .filter(product => {
                if(brands.length > 0){
                    const match = brands.filter(brand => +brand === product.brand_id);
                    return match.length > 0 ? product : null;
                } else {
                    return product;
                }
            })
            .filter(product => {
                if(categories.length > 0){
                    //compare two arrays: the categories on which we want to filter and the product categories (array from prod_cat property)
                    const match = categories.filter(category => product.prod_cat.filter(prod_cat => prod_cat.cat_id === +category).length > 0 ? +category : null);
                    return match.length > 0 ? product : null;
                } else {
                    return product;
                }
            })
            .filter(product => {
                if(in_stock){
                    return product.in_stock ? product : null;
                } else {
                    return product;
                }
            })
            .sort((a,b) => {
            if(sorting === "PRICE_ASC"){
                return a.price - b.price;
            }
            if(sorting === "PRICE_DESC"){
                return b.price - a.price;
            }
            if(sorting === "ALPHA_ASC"){
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            }
            if(sorting === "ALPHA_DESC"){
                return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
            }
            return a - b;
        })
        ])
    }

    return (
        <ProductContext.Provider value={{
            products,
            filteredProducts,
            filters,
            setFilters,
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
