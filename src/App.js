import './scss/style.scss';
import React, {Component} from 'react';
import CartContextProvider from './contexts/CartContext';
import Home from './components/Home';
import { connect } from 'react-redux';

class App extends Component{
  
  componentDidMount() {
    //this.props.loadData();
}

  render(){
    return (
      <CartContextProvider>
        <button onClick={this.props.loadData}>Get Products</button>
        <div>
          This is a test for the redux store.
          {JSON.stringify(this.props.state)}
        </div>
      </CartContextProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch({type: "LOAD_DATA"}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
