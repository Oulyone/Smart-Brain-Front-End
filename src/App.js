import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'
import React, { Component } from 'react';

const initialState = { 
  input: '',
  imageUrl: '',
  amount: '',
  boxes: [],
  route: 'signin',
  isSignIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: 'new Date()'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      amount: '',
      boxes: [],
      route: 'signin',
      isSignIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: 'new Date()'
      }
    }
  }

  loadUser = (data) => {
    this.setState({
        user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFace.map(face => {
      return {
        topRow: height * face.top_row,
        leftCol: width * face.left_col,
        bottomRow: height - (height * face.bottom_row),
        rightCol: width - (width * face.right_col)
      }
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
    
    fetch("https://smart-brain-api-qha4.onrender.com/imageurl", {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        if(result) {
          fetch("https://smart-brain-api-qha4.onrender.com/image", {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              if(count !== 'User not found!') {
                this.setState(Object.assign(this.state.user, { entries: count }));
              }  
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
        this.setState({
          amount: result.outputs[0].data.regions.length
        })
      })
      .catch(error => console.log('error', error));
    
  }
  
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }

  

  render() {
    const {isSignIn, imageUrl, route, boxes, amount, user} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignIn} id={user.id}/>
        { 
          route === 'home'  
          ? 
            <div>
              <Logo />
              <Rank entries={user.entries} name={user.name} amount={amount} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin' || route === 'signout' 
            ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
            : (
              route === 'register' 
              ?
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
              : <div></div>
            )
          )
        }      
      </div>
    );
  }
}

export default App;
