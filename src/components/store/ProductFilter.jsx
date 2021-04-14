import React from 'react'

function ProductFilter() {



    return (
        <div className="product-filter">
            <div className="filter-wrap">
                <h3>Search by name</h3>
                <div className="filter-control">
                    <input type="text" />
                </div>
            </div>
            <div className="filter-wrap">
                <h3>Brands</h3>
                <div className="filter-control">
                    <input type="checkbox" />
                    <label>Nike</label>
                </div>
                <div className="filter-control">
                    <input type="checkbox" />
                    <label>JBC</label>
                </div>
                <div className="filter-control">
                    <input type="checkbox" />
                    <label>Kelvin</label>
                </div>
                
            </div>
            <div className="filter-wrap">
                <h3>Category</h3>
                <div className="filter-control">
                    <input type="checkbox" />
                    <label>IT</label>
                </div>
                <div className="filter-control">
                    <input type="checkbox" />
                    <label>Electronica</label>
                </div>
            </div>
        </div>
    )
}

export default ProductFilter
