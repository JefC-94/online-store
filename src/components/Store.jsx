import React, {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

function Store() {

    const {rootState, logoutUser} = useContext(UserContext);
    const {theUser} = rootState;

    return (
        <>
            <main className="container store-main">
                <div className="store-container">
                    Products products products!
                </div>
            </main>
        </>
    )
}

export default Store
