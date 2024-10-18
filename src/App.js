import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey=process.env.REACT_APP_API_KEY
  state = {
    progress : 0
  }
  setProgress = (progress) => {
    this.setState({progress : this.progress})
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
            height = '5'
      />
          <Navbar />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apikey={this.apikey} key='general' pageSize={6} country='in' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} apikey={this.apikey} key='business' pageSize={6} country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.apikey} key='entertainment' pageSize={6} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} apikey={this.apikey} key='health' pageSize={6} country='in' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress} apikey={this.apikey} key='science' pageSize={6} country='in' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apikey={this.apikey} key='sports' pageSize={6} country='in' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apikey={this.apikey} key='technology' pageSize={6} country='in' category='technology' />}></Route>
            <Route path='/world' element={<News setProgress={this.setProgress} apikey={this.apikey} key='world' pageSize={6} country='in' category='world' />}></Route>
             <Route path='/nation' element={<News setProgress={this.setProgress} apikey={this.apikey} key='nation' pageSize={6} country='in' category='nation' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
