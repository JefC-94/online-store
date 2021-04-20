import React from 'react';

import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

function Pagination({filters, setFilters, pageData, pageLimit, setPageLimit, goToPage}) {
    
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
