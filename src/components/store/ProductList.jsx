import React, {useState, useContext, useEffect} from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

function ProductList() {

    const [pageLimit, setPageLimit] = useState(() => {
        if(sessionStorage.getItem('pageLimit')){
            return sessionStorage.getItem('pageLimit');
        }
        return 5;
    });

    //Keep the pageData here to sync both paginations together
    const [pageData, setPageData] = useState({
        currentPage: null,
        totalPages: null,
    });

    const {filteredProducts, loading} = useContext(ProductContext);
    const [currentProducts, setCurrentProducts] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('pageLimit', pageLimit);
    }, [pageLimit]);

    useEffect(() => {
        goToPage(1);
        return () => {
            setPageData({currentPage: null, totalPages: null});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredProducts, pageLimit]);

    const goToPage = page => {
        const currentPage = Math.max(1, Math.min(page, pageData.totalPages));
        setPageData({
            currentPage: currentPage, 
            totalPages: Math.ceil((filteredProducts.length / pageLimit))
        });
        //Slice out the right set of products for this page
        const offset = (currentPage - 1) * pageLimit;
        setCurrentProducts(filteredProducts.slice(offset, (+offset) + (+pageLimit)));
    }

    return (
        <div className="products-container">
            {error && 
            <div className="center-message">
                <p className="error">Something went wrong. Please try again later.</p>    
            </div>}
            {!error && 
            <>
            <div className="above-list">
                <Pagination pageData={pageData} pageLimit={pageLimit} setPageLimit={setPageLimit} goToPage={goToPage} />
            </div>
            <div className="product-list">
                {loading && <div className="center-message">Loading...</div>}
                {currentProducts.length > 0 && currentProducts.map(product => {
                    return <ProductItem key={product.id} product={product} />
                })}
                {(!error && !loading && currentProducts.length === 0) && <div className="center-message">
                <p>We hebben geen producten gevonden voor deze filters.</p>
                </div>}
            </div>
            
            {pageLimit > 2 && <div className="below-list">
                <Pagination pageData={pageData} pageLimit={pageLimit} setPageLimit={setPageLimit} goToPage={goToPage} />
            </div>}
            </>
            }
        </div>
    )
}

export default ProductList
