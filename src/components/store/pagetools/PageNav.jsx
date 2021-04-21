import React from 'react'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

function PageNav({pageData, goToPage}) {
    
    function onPrevClick(){
        const prevPage = pageData.currentPage - 1;
        goToPage(prevPage);
    }

    function onNextClick(){
        const nextPage = pageData.currentPage + 1;
        goToPage(nextPage);
    }
    
    return (
        <div className="pagination-nav">
            <p>Pagina</p>
            <button className="link center" onClick={() => {onPrevClick()}}><BiChevronLeft size="22" /></button> 
            <p className="current-page">{pageData.currentPage}</p>
            <button className="link center" onClick={() => {onNextClick()}}><BiChevronRight size="22" /></button>
            <p className="total-pages">van {pageData.totalPages}</p>
        </div>
    )
}

export default PageNav
