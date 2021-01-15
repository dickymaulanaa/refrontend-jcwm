import React, { Component} from 'react';
import NavigationBar from "./component/NavigationBar";
import { Route } from "react-router-dom";
import {Inventory} from "./page";

class App extends Component{
  state ={}
  render (){
    return <div>
      <NavigationBar/>
      <Route path="/" exact component={Inventory} />

    </div>
  }
}
export default App;