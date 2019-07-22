import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { NavLink} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.


  // smurfs get request, add smurf list to page
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then(res => {this.setState({ smurfs: res.data})}) 
    .catch(err => (console.log('CDM .get error', err)))
  }

  addSmurf = newSmurf => {
    axios.post("http://localhost:3333/smurfs", newSmurf)
    .then(res => {console.log('result', res)})
    .catch(err => {console.log('newSmurf post error', err)})
  }


//Route paths, Link to, NavLink (beautified only one, sorry)
  render() {
    return (
      <div className="App">
        <Route path = "/smurf-form" render= {(props) => {
          return(
          <SmurfForm {...props} addSmurf={this.addSmurf}/> )}}/>

        <Route exact path = "/" render = {(props) => {
          return (
          <Smurfs {...props} smurfs={this.state.smurfs} /> )}} />

        <nav>
          <Link className="NavData" to={'/'}>
          Data 
          </Link>

          <Link className= "NavForm" to ={'/smurf-form'}>
          Form  
          </Link>

        </nav>


        <NavLink to = {'/smurf-form'}>
          Form
        </NavLink>

        <NavLink to ={'/'}>
          Data
        </NavLink>
        
        
      </div>
    );
  }
}

export default App;
