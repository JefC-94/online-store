import React, {useContext, useState, useEffect, useRef, useLayoutEffect} from 'react'
import {ProductContext} from '../../contexts/ProductContext';
import {axiosObject} from '../../Constants';
import {WindowContext} from '../../contexts/WindowContext';
import {FaTimes} from 'react-icons/fa';

function ProductFilter() {

    const {filteredProducts, filters, setFilters} = useContext(ProductContext);
    const {windowWidth} = useContext(WindowContext);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [inputField, setInputField] = useState('');

    //set showfilters on true for large screen
    const [showFilters, setShowFilters] = useState(() => {
        if(windowWidth < 900){
            return false;
        } else {
            return true;
        }
    });

    const [showAlert, setShowAlert] = useState(false);

    const productFilters = useRef();
    const overlay = useRef();

    useEffect(() => {
        getBrandsAndCats();
    }, []);

    //when window width goes above 900, make sure to show filters by default
    useEffect(() => {
        if(windowWidth > 900){
            setShowFilters(true);
        }
    }, [windowWidth]);

    //When user types in inputfield, we need to filter on name (but wait 400ms)
    useEffect(() => {
        if(inputField){
            setTimeout(() => {
                setFilters(prevVal => ({...prevVal, name: inputField}));
            }, 400);
            setShowAlert(true);
        } else {
            setFilters(prevVal => ({...prevVal, name: null}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputField]);

    useEffect(() => {
        if(showAlert){
            setTimeout(() => {setShowAlert(false)}, 1400);
        }
    }, [showAlert]);

    //User clicks on overlay (out of filters-panel) -> hide filters
    useLayoutEffect(() => {
        const handleWindowClick = (e) => {
            /* console.log(overlay.current);
            console.log(e.target); */
            if(windowWidth < 900){
                if(e.target === overlay.current){
                    setShowFilters(false);
                }
            }
        }
        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Fetch the brands and categories for in filters
    async function getBrandsAndCats(){
        const request1 = await axiosObject.get('/category');
        setCategories(request1.data.records);
        const request2 = await axiosObject.get('/brand');
        setBrands(request2.data.records);
    }

    function onBrandCheck(target){
        if(target.checked){
            setFilters(prevVal => ({...prevVal, brands: [...prevVal.brands, target.value]}))
        } else {
            setFilters(prevVal => ({...prevVal, brands: [...prevVal.brands.filter(brand => brand !== target.value)]}));
        }
        setShowAlert(true);
    }

    function onCategoryCheck(target){
        if(target.checked){
            setFilters(prevVal => ({...prevVal, categories: [...prevVal.categories, target.value]}));
        } else {
            setFilters(prevVal => ({...prevVal, categories: [...prevVal.categories.filter(category => category !== target.value)]}));
        }
        setShowAlert(true);
    }

    function onStockCheck(target){
        if(target.checked){
            setFilters(prevVal => ({...prevVal, in_stock: true}));
        } else {
            setFilters(prevVal => ({...prevVal, in_stock: null}));
        }
        setShowAlert(true);
    }

    function resetAllButSorting(){
        setFilters(prevVal => ({...prevVal,
            brands: [], 
            categories: [], 
            name: null,
            in_stock: null
        })
        );
        setInputField('');
    }

    return (
        <div className="filter-container">
            <div className="results-wrap">
                <p>{filteredProducts.length + (filteredProducts.length === 1 ? " resultaat" : " resultaten")}</p>
                {(filters.brands.length > 0 || filters.categories.length > 0 || filters.name || filters.in_stock) && 
                <button className="link" onClick={() => resetAllButSorting()}><FaTimes size="14" /> Wis filters</button>}
            </div>
            {showFilters &&
            <div ref={overlay} className="overlay"></div>
            }
            {showFilters &&
            <div ref={productFilters} className="product-filters">
                {windowWidth < 900 && <button className="button primary center toggle-filters" onClick={() => setShowFilters(prevVal => !prevVal)}>{showFilters ? "Verberg" : "Toon"} filters</button>}
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
                                <input type="checkbox" id={`brand${brand.id}`} value={brand.id} checked={filters.brands.filter(item => +item === brand.id).length > 0 ? true : false} onChange={(e) => onBrandCheck(e.target)} />
                                <label htmlFor={`brand${brand.id}`} >{brand.name}</label>
                            </div>
                        )
                    })}                
                </div>
                <div className="filter-wrap">
                    <h3>Categorie</h3>
                    {categories && categories.map(category => {
                        return (
                            <div key={category.id} className="filter-control">
                                <input type="checkbox" id={`cat${category.id}`} value={category.id} checked={filters.categories.filter(item => +item === category.id).length > 0 ? true : false} onChange={(e) => onCategoryCheck(e.target)} />
                                <label htmlFor={`cat${category.id}`} >{category.name}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="filter-wrap">
                    <h3>Beschikbaarheid</h3>
                    <div className="filter-control">
                        <input type="checkbox" id="in_stock" value="in_stock" checked={filters.in_stock} onChange={(e) => onStockCheck(e.target)} />
                        <label htmlFor="in_stock" >Op voorraad</label>
                    </div>
                </div>
                {(windowWidth < 900 && showAlert) && <p className="filter-change-alert">Filters geüpdated!</p>}
            </div>
            }
            {windowWidth < 900 &&
            <button className="button primary center toggle-filters" onClick={() => setShowFilters(true)}>{showFilters ? "Verberg" : "Toon"} filters</button>
            }
        </div>
    )
}

export default ProductFilter
