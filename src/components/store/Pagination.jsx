import React, {useContext} from 'react';
import {WindowContext} from '../../contexts/WindowContext';

import ProductSort from './pagetools/ProductSort';
import PageNav from './pagetools/PageNav';
import PerPage from './pagetools/PerPage';

function Pagination({filters, setFilters, pageData, pageLimit, setPageLimit, goToPage}) {
    
    const {windowWidth} = useContext(WindowContext);

    return (
        <>
        {windowWidth > 600 &&
        <>
            <ProductSort filters={filters} setFilters={setFilters} />
            <PageNav pageData={pageData} goToPage={goToPage} />
            <PerPage pageLimit={pageLimit} setPageLimit={setPageLimit} />
        </>
        }
        {windowWidth < 600 &&
            <>
            <div className="row-top">
                <ProductSort filters={filters} setFilters={setFilters} />
                <PerPage pageLimit={pageLimit} setPageLimit={setPageLimit} />
            </div>
            <div className="row-bottom">
                <PageNav pageData={pageData} goToPage={goToPage} />
            </div>
            </>
        }
        </>
    )
}

export default Pagination
