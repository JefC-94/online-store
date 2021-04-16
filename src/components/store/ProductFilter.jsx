import React, {useContext, useState, useEffect} from 'react'
import {ProductContext} from '../../contexts/ProductContext';
import {axiosObject} from '../../Constants';

function ProductFilter() {

    const {sortAndFilter} = useContext(ProductContext);

    const [filters, setFilters] = useState({
        sorting: "", 
        brands: [], 
        categories: [], 
        name: null
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [inputField, setInputField] = useState('');

    useEffect(() => {
        getBrandsAndCats();
    }, []);

    async function getBrandsAndCats(){
        const request1 = await axiosObject.get('/category');
        setCategories(request1.data.records);
        const request2 = await axiosObject.get('/brand');
        setBrands(request2.data.records);
    }

    useEffect(() => {
        sortAndFilter(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    useEffect(() => {
        if(inputField){
            setTimeout(() => {
                setFilters(prevVal => ({...prevVal, name: inputField}));
            }, 400);
        } else {
            setFilters(prevVal => ({...prevVal, name: null}));
        }
    }, [inputField]);

    function onBrandCheck(target){
        if(target.checked){
            setFilters(prevVal => ({...prevVal, brands: [...prevVal.brands, target.value]}))
        } else {
            setFilters(prevVal => ({...prevVal, brands: [...prevVal.brands.filter(brand => brand !== target.value)]}));
        }
    }

    function onCategoryCheck(target){
        if(target.checked){
            setFilters(prevVal => ({...prevVal, categories: [...prevVal.categories, target.value]}));
        } else {
            setFilters(prevVal => ({...prevVal, categories: [...prevVal.categories.filter(category => category !== target.value)]}));
        }
    }

    return (
        <div className="product-filter">
            <div className="filter-wrap">
                <h3>Sortering</h3>
                <div className="filter-control">
                    <select value={filters.sorting} onChange={(e) => setFilters(prevVal => ({...prevVal, sorting: e.target.value}))}>
                        <option value="">Sorteer op</option>
                        <option value="PRICE_ASC">Prijs - laag naar hoog</option>
                        <option value="PRICE_DESC">Prijs - hoog naar laag</option>
                        <option value="ALPHA_ASC">Alfabetisch - A-Z</option>
                        <option value="ALPHA_DESC">Alfabetisch - Z-A</option>
                    </select>
                </div>
            </div>
            <div className="filter-wrap">
                <h3>Zoek op naam</h3>
                <div className="filter-control">
                    <input type="text" value={inputField} onChange={(e) => setInputField(e.target.value)} />
                </div>
            </div>
            <div className="filter-wrap">
                <h3>Merk</h3>
                {brands && brands.map(brand => {
                    return (
                        <div key={brand.id} className="filter-control">
                            <input type="checkbox" value={brand.id} onChange={(e) => onBrandCheck(e.target)} />
                            <label>{brand.name}</label>
                        </div>
                    )
                })}                
            </div>
            <div className="filter-wrap">
                <h3>Categorie</h3>
                {categories && categories.map(category => {
                    return (
                        <div key={category.id} className="filter-control">
                            <input type="checkbox" value={category.id} onChange={(e) => onCategoryCheck(e.target)} />
                            <label>{category.name}</label>
                        </div>
                    )
                })}
            </div>
            {/* {JSON.stringify(filters)} */}
        </div>
    )
}

export default ProductFilter
