import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Store from './Store';
import Lobby from './Lobby';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import ProductDetail from './store/ProductDetail';

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
        
            <Header></Header>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            <Redirect to="/store" />
                        )
                    }}
                />
                <Route path='/lobby' component={Lobby} />
                <Route path='/about' component={About} />
                <Route path='/store' component={Store} />
                <Route path='/product/:id' component={ProductDetail} />
            </Switch>
            <Footer></Footer>
        
        </>
    )
}

export default Home;