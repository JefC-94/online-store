import { axiosObject } from "../Constants";

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const sortByPrice = payload => ({
   type: SORT_BY_PRICE,
   payload
});
export const filterByPrice = payload => ({
   type: FILTER_BY_PRICE,
   payload
});
export const sortByAlphabet = payload => ({
   type: SORT_BY_ALPHABET,
   payload
});
export const loadData = (payload) => ({
   type: LOAD_DATA,
   payload
});

const initialState = {
    products : [
        {id:1},{id:2}
    ]
};

async function fetchProducts(){
    let request = await axiosObject.get('product');
    return request.data.records;
}

const filterStore = (state = initialState, action) => {
    const newState = {...state};
   switch (action.type) {
       case SORT_BY_ALPHABET:
           //sort alphabetically
           return newState;
       case SORT_BY_PRICE:
           //sort by price
           return newState;
       case FILTER_BY_PRICE:
           //filter by price
           return newState;
       case LOAD_DATA:
           //load data
            const products = fetchProducts();
            return {...newState,
                products
            }
       default:
           return newState;
   }
};
export default filterStore;