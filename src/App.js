
import React, { Component } from 'react';
// import { Navbar, NavbarBrand } from 'reactstrap';
// import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
import Main from './components/MainComponent';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Main />
          </div>
        </Router>
      </Provider>


    );
  }
}

export default App;

