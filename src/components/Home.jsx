import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Store from './Store';
import Lobby from './Lobby';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import ProductDetail from './store/ProductDetail';
import Cart from './checkout/Cart';
import {BrowserRouter} from 'react-router-dom';

//Protected directory, cart/checkout is not accessible unless authenticated user
/* function PrivateRoute({component: Component, path, ...rest}){
    const {rootState} = useContext(UserContext);
    const {isAuth} = rootState;
    
    return (  
        <Route path={path} {...rest} render={(props) => (
            isAuth
            ? (<Component {...props} />)
            : (<Redirect to='/lobby' />)
        )} />
    );
}; */

function Home(){
    
    return (
        <>
        <BrowserRouter>
            <Header></Header>
            <Switch>
                {/* <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            <Redirect to="/store" />
                        )
                    }}
                /> */}
                <Route exact path='/' component={Store} />
                <Route path='/lobby' component={Lobby} />
                <Route path='/about' component={About} />
                <Route path='/cart' component={Cart} />
                <Route path='/product/:id' component={ProductDetail} />
            </Switch>
            <Footer></Footer>
        </BrowserRouter>
        </>
    )
}

export default Home;