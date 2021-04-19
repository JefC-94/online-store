import React, {useState, useEffect} from 'react';

import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

function Pagination({pageData, pageLimit, setPageLimit, filteredProducts, goToPage}) {
    
    function onPrevClick(){
        const prevPage = pageData.currentPage - 1;
        goToPage(prevPage);
    }

    function onNextClick(){
        const nextPage = pageData.currentPage + 1;
        goToPage(nextPage);
    }
   
    return (
        <>
        <div className="results">
            <p>{filteredProducts.length > 0 && filteredProducts.length + (filteredProducts.length === 1 ? " resultaat gevonden" : " resultaten gevonden")}</p>
        </div>
        <div className="pagination-info">
            <p>Pagina</p>
            <button className="link center" onClick={() => {onPrevClick()}}><BiChevronLeft size="22" /></button> 
            <p className="current-page">{pageData.currentPage}</p>
            <button className="link center" onClick={() => {onNextClick()}}><BiChevronRight size="22" /></button>
            <p className="total-pages">van {pageData.totalPages}</p>
        </div>       
        <div className="pagination-perpage">
            <label>Per pagina:</label>
            <select value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
            </select>
        </div>
        </>
    )
}

export default Pagination
