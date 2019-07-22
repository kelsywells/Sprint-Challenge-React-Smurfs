import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

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

addSmurf= newSmurf => {
  axios.post("http://localhost:3333/smurfs", newSmurf)
  .then(res => {console.log('result', res)})
  .catch(err => {console.log('newSmurf post error', err)})
}


  // smurfs get request, add smurf list to page
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then(res => {this.setState({ smurfs: res.data})}) 
    .catch(err => (console.log('CDM .get error', err)))
  }


  render() {
    return (
      <div className="App">
        <SmurfForm addSmurf={this.addSmurf} />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
