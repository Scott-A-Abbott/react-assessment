import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'glamor/reset';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/ItemDetails/:id' component={ItemDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
